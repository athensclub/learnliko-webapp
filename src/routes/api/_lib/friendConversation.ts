import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { chat } from './conversation';

export const isGoalComplete = async function (goal: string, message: string) {
	const prompt: ChatMessage[] = [];
	prompt.push({
		role: 'user',
		content: `In the conversation between A and B, A is given the goal to "${goal}". I will provide the A's message, and you will have to reply only boolean value, true if A has achieve its goal else false.`
	});
	prompt.push({
		role: 'user',
		content: 'What is you favorite color'
	});
	prompt.push({
		role: 'assistant',
		content: 'false'
	});
	prompt.push({
		role: 'user',
		content: message
	});

	const response = await chat(prompt);
	let data = response === 'true';

	return data;
};
