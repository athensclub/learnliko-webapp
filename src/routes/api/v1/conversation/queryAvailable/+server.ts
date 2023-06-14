import { queryConversations } from '$lib/server/conversation';
import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { Mode } from '$lib/types/mode';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const mode = url.searchParams.get("mode");
	if (!mode)
		throw new Error("Please provide mode when requesting conversation data.");
		
	const result = await queryConversations(mode as Mode);
	return json(result);
};
