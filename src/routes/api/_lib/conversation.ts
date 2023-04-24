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
