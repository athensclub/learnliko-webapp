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

export const getConversations = async () => {
	const result = await fetch('/api/v1/conversation/queryAvailable', { method: 'GET' });
	const val: ConversationCarouselItem[] = await result.json();
	return val;
}
