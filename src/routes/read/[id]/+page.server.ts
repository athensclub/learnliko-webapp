import type { PageServerLoad } from './$types';
import { queryReadingItemById } from '$lib/server/reading';

export const load: PageServerLoad = async ({ params }) => {
    const item = await queryReadingItemById(params.id);
    if(!item)
        throw new Error("No reading item with id: " + params.id);

    return {
        item,
    };
};
