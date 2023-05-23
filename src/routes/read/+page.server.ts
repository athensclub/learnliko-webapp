import type { PageServerLoad } from './$types';
import { queryReadingTopics } from '$lib/server/reading';

export const load: PageServerLoad = async ({}) => {
	const topics = await queryReadingTopics();

	return {
        topics
	};
};
