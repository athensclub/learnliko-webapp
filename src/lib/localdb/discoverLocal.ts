import { getReadingItems } from "$api/reading";
import type { DiscoverItem } from "$lib/types/discover"
import { shuffle } from "$lib/utils/array";
import { queryConversationsLocal } from "./conversationLocal"

export const queryDiscoverItemsLocal = async () => {
    const result: DiscoverItem[] = [
        ...(await queryConversationsLocal()).map(item => ({ conversation: item, reading: null })),
        ...(await getReadingItems('All')).map(item => ({ conversation: null, reading: item }))];
    shuffle(result);
    return result;
}