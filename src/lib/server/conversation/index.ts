import type { ConversationCarouselItem } from '$lib/types/conversationData';

export const queryConversations = async function () {
	const data = await import('$lib/server/db/conversations.json');
	return data.results.map((item) => item as ConversationCarouselItem);
};
