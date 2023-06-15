import type { PageServerLoad } from './$types';
import { queryReadingItemById } from '$lib/server/reading';
import { currentMode } from '$lib/global/mode';
import { get } from 'svelte/store';

export const load: PageServerLoad = async ({ params }) => {
    const item = await queryReadingItemById(params.id, get(currentMode));
    if(!item)
        throw new Error("No reading item with id: " + params.id);

    return {
        item,
    };
};
