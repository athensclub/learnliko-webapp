import { queryConversations } from '$lib/server/conversation';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	await queryConversations();
	return new Response(
		JSON.stringify({
			message: 'Hello world!'
		}),
		{ status: 200 }
	);
};
