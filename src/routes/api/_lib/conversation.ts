import type { RecapHistory } from '$lib/global/chatbox';
import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';

export const chat = async function (messages: ChatMessage[]) {
	const response = await fetch('/api/v1/conversation/chat', {
		method: 'POST',
		body: JSON.stringify({ messages })
	});
	const { message } = await response.json();
	if (!message) throw new Error('No response from chat bot');

	return String(message);
};

export const assistantChat =  async function (messages: ChatMessage[]) {
	const response = await fetch('/api/v1/conversation/assistant', {
		method: 'POST',
		body: JSON.stringify({ messages })
	});
	const val = await response.json();
	if (!val) throw new Error('No response from chat bot');

	return String(val.message);
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

export const getVocabsFromConversation = async (history: RecapHistory) => {
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
		content: history.map(
			item => `A: ${item.assistant.transcription}\nB: ${item.user?.transcription}`
		).join("\n")
	})
	const response = await chat(prompt);
	return response.replace(".", "").split(",").map(s => s.trim().toLowerCase());
}

export const getConversations = async () => {
	const result = await fetch('/api/v1/conversation/queryAvailable', { method: 'GET' });
	const val: ConversationCarouselItem[] = await result.json();
	return val;
}
