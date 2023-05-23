import type { PageServerLoad } from './$types';
import { queryReadingItemById } from '$lib/server/reading';

export const load: PageServerLoad = async ({ params }) => {
    const item = await queryReadingItemById(params.id);

    return {
        item,
    };
};
