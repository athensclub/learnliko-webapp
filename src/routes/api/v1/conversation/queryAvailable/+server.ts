import { queryConversations } from '$lib/server/conversation';
import type { ConversationCarouselItem } from '$lib/types/conversationData';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const result = await queryConversations();
	return json(result);
};
