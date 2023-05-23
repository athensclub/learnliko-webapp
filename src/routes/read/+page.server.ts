import type { PageServerLoad } from './$types';
import { queryReadingTopics } from '$lib/server/reading';

export const load: PageServerLoad = async ({ }) => {
	const topics = await queryReadingTopics();
	// const initialItems = await queryReadingItems(topics[0]);

	return {
		topics,
		// initialItems
	};
};
