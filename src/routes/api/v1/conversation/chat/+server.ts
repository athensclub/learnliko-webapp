import { chatCompletion } from '$lib/server/openai';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();
	if (!messages) throw error(400, `Error: No messages provided`);
	try {
		const chatGPTMessage = await chatCompletion(messages);
		return json({ message: chatGPTMessage });
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
