import type { PageServerLoad } from './$types';
import { queryReadingTopics } from '$lib/server/reading';
import { currentMode } from '$lib/global/mode';
import { get } from 'svelte/store';

export const load: PageServerLoad = async ({ }) => {
	const topics = await queryReadingTopics(get(currentMode));

	return {
		topics,
	};
};
