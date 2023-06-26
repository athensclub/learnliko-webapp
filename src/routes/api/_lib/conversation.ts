import type { RecapResult } from '$lib/global/chatbox';
import type { RecapHistory, DialogueScore } from '$lib/global/chatbox';
import { currentMode } from '$lib/global/mode';
import type { CEFRLevel } from '$lib/types/CEFRLevel';
import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { Mode } from '$lib/types/mode';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { round } from '$lib/utils/math';
import { get } from 'svelte/store';

export const chat = async function (messages: ChatMessage[]) {
	const response = await fetch('/api/v1/conversation/chat', {
		method: 'POST',
		body: JSON.stringify({ messages })
	});
	const { message } = await response.json();
	if (!message) throw new Error('No response from chat bot');

	return String(message);
};

/**
 * The output is a stream. It finishes when this function finishes (await assistantChat(...) is finished).
 *
 * @param messages the message history to query assistant.
 * @param callback the function that is called each time it receives token through stream.
 * @see https://stackoverflow.com/a/74336207
 */
export const assistantChat = async function (
	messages: ChatMessage[],
	callback: (token: string) => void
) {
	// modified from https://stackoverflow.com/a/74336207
	const response = await fetch('/api/v1/conversation/assistant', {
		method: 'POST',
		body: JSON.stringify({ messages })
	});
	if (!response.body) throw new Error('No response from chat bot');

	const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
	while (true) {
		const { value, done } = await reader.read();
		if (done) break;
		callback(value);
	}
};

export const analyzeDialog = async function (assistant: string, user: string) {
	const prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `Your are English professor, you are great at communication.You will always trying to provide helpful/useful tip and suggestion to the people who ask you.
		I want you to analyze the provided dialog.
		You have to analyze ME's response, then you will have to reply you analytics in the following JSON schema
		{
		// able to express clearly and coherently(scale 0-100)
		"clarity": number,
		// grammar correctness(scale 0-100)
		"grammar": number,
		// ability to comprehend spoken English and respond appropriately(scale 0-100)
		"appropriateness": number,
		// briefly overall suggestion and tip that I could improve, include the example
		"suggestion": strings
		}
		`
	});
	prompt.push({
		role: 'user',
		content: `A: “What is your name?”
		ME: “My name is Lucy”`
	});
	prompt.push({
		role: 'assistant',
		content: `{"clarity": 100,"grammar": 100,"appropriateness": 100,"suggestion": ""}`
	});
	prompt.push({
		role: 'user',
		content: `A: “${assistant}”
		ME: “${user}”`
	});

	let data:
		| { clarity: number; grammar: number; appropriateness: number; suggestion: string }
		| undefined;

	let attempt = 0;
	while (true) {
		try {
			const response = await chat(prompt);

			// gpt will response in JSON format, parse it to object
			data = JSON.parse(response);
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			console.error('error: parsing dialog analytic, retring...');
		}
	}

	if (!data) throw new Error('Error: failed analyze dialog');

	return { ...data, overallScore: (data.clarity + data.grammar + data.appropriateness) / 300 };
};

export const getVocabsFromConversation = async (recap: RecapResult) => {
	const prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `You are English professor. I want you to analyze the provided dialog and give me all the useful vocabularies that you think the student would not have known in that said dialog. Answer the each word separated by comma and do not provide any other explanation or information. Do not use any punctuation other than comma.`
	});
	prompt.push({
		role: 'user',
		content: `A: Welcome to the shop how can I help you?
		B: Want to buy some pens, please.
		A: Sure, we have pens available. Our pens are 5฿ each. How many pens would you like to purchase?
		B: One.
		A: Great! We have one pen left in stock. Would you like to purchase it?
		B: Yes.`
	});
	prompt.push({
		role: 'assistant',
		content: `Welcome, shop, purchase, stock`
	});
	prompt.push({
		role: 'user',
		content: recap.history
			.map((item) => `A: ${item.assistant.transcription}\nB: ${item.user?.transcription}`)
			.join('\n')
	});
	const response = await chat(prompt);
	return response
		.replace('.', '')
		.split(',')
		.map((s) => s.trim().toLowerCase());
};

export const getConversations = async () => {
	const result = await fetch(
		'/api/v1/conversation/queryAvailable?' + new URLSearchParams({ mode: get(currentMode) }),
		{ method: 'GET' }
	);
	const val: ConversationCarouselItem[] = await result.json();
	return val;
};

export const checkGoalProgress = async function (dialogue: string, goal: string) {
	const response = await fetch('/api/v1/conversation/utils/goalProgress', {
		method: 'POST',
		body: JSON.stringify({ dialogue, goal })
	});

	const { result } = await response.json();
	return result;
};

export const analyzeDialogueScore = async function (
	assistant: string,
	user: { message: string; CEFRLevel: CEFRLevel },
	context: string
) {
	const response = await fetch('/api/v1/conversation/utils/analyzeDialogue', {
		method: 'POST',
		body: JSON.stringify({ assistant, user, context })
	});

	const data = (await response.json()) as DialogueScore;
	data.advancement.score *= 10;
	data.grammar.score *= 10;
	return data;
};

export const analyzeGoalScore = async function (
	hintUsed: boolean,
	CEFRLevel: CEFRLevel,
	context: string,
	dialogues: { user: string; assistant: string }[]
) {
	const result = { overall: 0, coins: 0, scores: Array<DialogueScore>() };

	if (hintUsed) {
		result.coins = 40;
		return result;
	}

	const promises: Promise<any>[] = [];
	for (let index = 0; index < dialogues.length; index++) {
		const item = dialogues[index];
		const _promise = analyzeDialogueScore(
			item.assistant,
			{ message: item.user, CEFRLevel },
			context
		).then((data) => {
			result.scores[index] = data;
		});
		promises.push(_promise);
	}
	await Promise.all(promises);

	result.overall =
		result.scores
			.map((e) => (e.appropriateness ? 50 + e.advancement.score * 0.3 + e.grammar.score * 0.2 : 0))
			.reduce((x, y) => x + y, 0) / result.scores.length;
	result.overall = round(result.overall, 2);

	result.coins =
		result.scores
			.map((e) => (e.appropriateness ? 50 + e.advancement.score * 0.3 + e.grammar.score * 0.2 : 40))
			.reduce((x, y) => x + y, 0) / result.scores.length;
	result.coins = round(result.coins, 0);

	return result;
};
