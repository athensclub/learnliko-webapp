import { analyzeDialog, chat, checkGoalProgress } from '$api/conversation';
import { transcribe } from '$api/transcription';
import { synthesize } from '$api/tts';
import { BotEmotionValues, type ChatBotMessage, type ConversationHistoryItem } from '$lib/types/conversationData';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { get, writable } from 'svelte/store';
import { chatContext, recapHistory, type RecapHistory } from './chatbox';
import { blobToBase64 } from '$lib/utils/io';
import { round } from '$lib/utils/math';
import { completeConversationLocal } from '$lib/localdb/conversationLocal';
import { audioRecording } from './recording';
import { textAdaptor } from '$api/textProcessor';
import type { CEFRLevel } from '$lib/types/CEFRLevel';

/**
 * Chat history in conversation page (/conversation/play). Used for display. Only one field in each items will be non-null/undefined
 */
export const conversationHistory = writable<ConversationHistoryItem[]>([]);

/** chat's history, used for recap calculations*/
export const history = writable<
	{
		role: 'user' | 'assistant';
		audioURL: string;
		transcription: string | null;
	}[]
>([]);

export const waitingForAIResponse = writable(false);

export const initializedConversation = writable(false);

export const transcribing = writable(false);

export const conversationFinished = writable(false);

/**
 * The recording that is shown to user before being sent or rerecord again.
 */
export const currentRecording = writable<{ data: Blob; url: string } | null>(null);
audioRecording.subscribe(currentRecording.set);

/**
 * If set to false, conversations will not be checked for goal completion. Used in pretest.
 */
export const isCheckConversationGoal = writable(true);

/**
 * If set to false, recap will not be calculated and the conversation will not be saved in user's diary. Used in pretest.
 */
export const saveCurrentConversation = writable(true);

/**
 * If the number of dialogue (pair of ai/user chat) exceed this amount,
 */
export const maxDialogueCount = writable(1000000);

/**
 * The index of the current goal that the user need to achieve.
 */
export const currentGoal = writable(0);

let finishedTime: Date;

/** an array of chatGPT's history in raw data, used for chat completion */
let gptHistory: ChatMessage[] = [];

export const resetConversationData = () => {
	currentGoal.set(0);
	transcribing.set(false);
	conversationFinished.set(false);
	initializedConversation.set(false);
	waitingForAIResponse.set(false);
	history.set([]);
	conversationHistory.set([])
	gptHistory = [];
};

export const initializeConversationBot = async function () {
	const ct = get(chatContext);
	gptHistory.push({ role: 'user', content: ct!.conversation.details.bot.prompt });
	gptHistory.push({
		role: 'assistant',
		content: `{"message":"${ct!.conversation.details.intro}","status":"NORMAL","emotion":"neutral"}`
	});

	await botReply(ct!.conversation.details.intro);

	// finish initialization
	initializedConversation.set(true);
	console.log('Finish init bot');
};

/**
 * Call bot to reply base on chat history
 * @param message ignore chat history if [message] is provided
 * @param targetLevel target CEFR level of bot's message
 */
const botReply = async function (message?: string, targetLevel: CEFRLevel = 'A1') {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');

	waitingForAIResponse.set(true);
	const hasMessage = !!message;

	// if no message provide, get response from chatGPT
	if (!message) {
		let data: ChatBotMessage | undefined;
		let attempt = 0;
		while (true) {
			try {
				const botResponse = await chat(gptHistory);

				// gpt will response in JSON format, parse it to object
				data = JSON.parse(botResponse);

				// ensure `data` is available and emotion is provided correctly
				if (!data) continue;
				if (!data.emotion || !BotEmotionValues.includes(data.emotion)) data.emotion = 'neutral';

				data.message = await textAdaptor(data.message, targetLevel);

				chatContext.set({ ...ct, bot: { ...ct.bot, emotion: data.emotion } });
				gptHistory.push({ role: 'assistant', content: botResponse });
				console.log(data);
				break;
			} catch (error) {
				// max attempt at 5
				if (attempt++ >= 5) break;

				gptHistory.push({ role: 'user', content: 'Reply with provided JSON scheme' });
				console.error("error: parsing bot's message, retring...");
			}
		}

		if (!data) throw new Error('Error: Bot failed to reply');
		message = data.message;
	}

	const audio = await synthesize(
		message,
		ct.conversation.details.bot.accent,
		ct.conversation.details.bot.gender
	);

	history.set([
		...get(history),
		{
			role: 'assistant',
			audioURL: await blobToBase64(audio),
			transcription: message
		}
	]);

	// prevent checking for the first time (user has not chat yet, only assistant)
	if (!hasMessage && get(isCheckConversationGoal)) {
		const passed = await checkGoalProgress(
			get(history)
				.map(
					(item) =>
						`${item.role === 'user' ? 'User' : ct.conversation.avatar.name}: ${item.transcription}`
				)
				.join('\n'),
			ct.conversation.details.learner.goal[get(currentGoal)]
		);
		console.log(passed);
		if (passed) {
			conversationHistory.set([
				...get(conversationHistory),
				{ endOfGoal: get(currentGoal) + 1 }
			])
			currentGoal.set(get(currentGoal) + 1);
		}
	}

	conversationHistory.set([...get(conversationHistory),
	{
		chat: {
			role: 'assistant',
			audioURL: await blobToBase64(audio),
			transcription: message
		}
	}])

	// behavior regarding bot's message status
	if ((get(isCheckConversationGoal) && get(currentGoal) >= ct.conversation.details.learner.goal.length) || get(history).length >= 2 * get(maxDialogueCount)) {
		conversationFinished.set(true);
		if (get(saveCurrentConversation)) {
			finishedTime = new Date();
			computeRecap();
		}
	}
	// switch (data.status) {
	// 	case 'NORMAL':
	// 		break;
	// 	case 'INAPPROPRIATE':
	// 		break;
	// 	case 'END-OF-CONVERSATION':
	// 		conversationFinished.set(true);
	// 		if (get(saveCurrentConversation)) {
	// 			finishedTime = new Date();
	// 			computeRecap();
	// 		}
	// 		break;
	// 	default:
	// 		break;
	// }

	waitingForAIResponse.set(false);
};

export const submitUserReply = async function (audioRecording: { data: Blob; url: string } | null) {
	if (audioRecording !== null) {
		transcribing.set(true);


		conversationHistory.set([...get(conversationHistory), {
			chat: {
				role: 'user',
				audioURL: audioRecording.url,
				transcription: null
			}
		}])

		const targetIndex = get(conversationHistory).length - 1;
		const transcription = await transcribe(audioRecording.data);
		conversationHistory.set(
			get(conversationHistory).map((v, i) => (i === targetIndex ? { ...v, chat: { ...v.chat!, transcription: transcription } } : v))
		);
		history.set([
			...get(history),
			{
				role: 'user',
				audioURL: audioRecording.url,
				transcription: transcription
			}
		]);
		gptHistory.push({ role: 'user', content: transcription });

		transcribing.set(false);

		botReply();
	}
};

const computeRecap = async () => {
	recapHistory.set(null);
	const result: RecapHistory = [];
	const promises: Promise<unknown>[] = [];

	// history store does not contain system prompt so we can start from index 0.
	for (let i = 0; i < get(history).length; i += 2) {
		// the last dialog will have no user's response
		if (i + 1 >= get(history).length) break;

		promises.push(
			analyzeDialog(get(history)[i].transcription!, get(history)[i + 1].transcription!).then(
				(recap) => {
					result[i / 2] = {
						assistant: {
							...get(history)[i],
							role: 'assistant',
							transcription: get(history)[i].transcription!
						},
						user: {
							...get(history)[i + 1],
							role: 'user',
							transcription: get(history)[i + 1].transcription!
						},

						score: recap.overallScore,
						suggestion: recap.suggestion
					};
				}
			)
		);
	}
	await Promise.all(promises);

	recapHistory.set(result);

	const totalScore = result ? result.map((x) => x.score).reduce((x, y) => x + y, 0) : 0;
	round((totalScore / result.length) * 100, 2);

	const ct = get(chatContext);
	// TODO: find a better approach to promote/demote user's CEFR level
	// if (totalScore > 90) setCurrentCEFRLevel(ct!.conversation.CEFRlevel);

	// TODO: use actual db (cloud).
	completeConversationLocal({
		recap: result,
		finishedTime,
		conversationID: ct!.conversation.id
	});
};
