import { analyzeDialog, chat } from '$api/conversation';
import { transcribe } from '$api/transcription';
import { synthesize } from '$api/tts';
import { BotEmotionValues, type ChatBotMessage } from '$lib/types/conversationData';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { get, writable } from 'svelte/store';
import { chatContext, recapHistory, type RecapHistory } from './chatbox';
import { blobToBase64 } from '$lib/utils/io';
import { round } from '$lib/utils/math';
import { setCurrentCEFRLevel } from '$lib/localdb/profileLocal';
import { completeConversationLocal } from '$lib/localdb/conversationLocal';
import { audioRecording } from './recording';

/** chat's history, used for display only */
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

export const currentRecording = writable<{ data: Blob; url: string } | null>(null);
audioRecording.subscribe(currentRecording.set);

/**
 * If set to false, recap will not be calculated and the conversation will not be saved in user's diary. Used in pretest.
 */
export const saveCurrentConversation = writable(true);

/**
 * If the number of dialogue (pair of ai/user chat) exceed this amount, 
 */
export const maxDialogueCount = writable(1000000)

let finishedTime: Date;

/** an array of chatGPT's history in raw data, used for chat completion */
let gptHistory: ChatMessage[] = [];

export const resetConversationData = () => {
	transcribing.set(false);
	conversationFinished.set(false);
	initializedConversation.set(false);
	waitingForAIResponse.set(false);
	history.set([]);
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
 */
const botReply = async function (message?: string) {
	const ct = get(chatContext);
	if (!ct) throw new Error('required chatbox context');

	waitingForAIResponse.set(true);

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

		// behavior regarding bot's message status
		if (data.status === 'END-OF-CONVERSATION' || get(history).length >= 2 * get(maxDialogueCount)) {
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

	waitingForAIResponse.set(false);
};

export const submitUserReply = async function (audioRecording: { data: Blob; url: string } | null) {
	if (audioRecording !== null) {
		transcribing.set(true);
		history.set([
			...get(history),
			{
				role: 'user',
				audioURL: audioRecording.url,
				transcription: null
			}
		]);

		const targetIndex = get(history).length - 1;
		const transcription = await transcribe(audioRecording.data);
		history.set(
			get(history).map((v, i) => (i === targetIndex ? { ...v, transcription: transcription } : v))
		);
		gptHistory.push({ role: 'user', content: transcription });

		transcribing.set(false);
		botReply();
	}
};

const computeRecap = async () => {
	recapHistory.set(null);
	const result: RecapHistory = [];
	const promises: Promise<any>[] = [];

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
