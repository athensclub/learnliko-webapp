import type { PageServerLoad } from './$types';
import { queryConversations } from '$lib/server/conversation';

export const load: PageServerLoad = async ({}) => {
	// TODO: probably return back to using ssr query when we switch back to cloud db.
	// const data = await queryConversations();

	return {
		// conversationCorouselItems: data
	};
};
