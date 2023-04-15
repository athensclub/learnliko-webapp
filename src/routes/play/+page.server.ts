import type { PageServerLoad } from './$types';
import { queryConversations } from '$lib/server/conversation';

export const load: PageServerLoad = async ({}) => {
	const data = await queryConversations();

	return {
		conversationCorouselItems: data
	};
};
