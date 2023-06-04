import { assistantChatCompletion } from '$lib/server/openai/langchain';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const { messages } = await request.json();
    if (!messages) throw error(400, `Error: No messages provided`);
    try {
        const chatGPTMessage = await assistantChatCompletion(messages);
        return json({ message: chatGPTMessage });
    } catch (e) {
        throw error(500, `Error: ${e}`);
    }
};
