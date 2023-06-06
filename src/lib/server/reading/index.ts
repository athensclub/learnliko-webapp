import type { ReadingItem } from '$lib/types/reading';

export const queryReadingTopics = async () => {
    const data = await import('$lib/server/db/reading_data.json');
    const topics = ["All", ...data.default.map(item => (item as ReadingItem).topic)];

    // only return unique topics https://stackoverflow.com/a/14438954
    return [...new Set(topics)];
};

/**
 * Note: Use topic "All" to query all items.
 * @param topic 
 */
export const queryReadingItems = async (topic: string) => {
    const data = await import('$lib/server/db/reading_data.json');
    return data.default.map(item => item as ReadingItem).filter(item => topic === "All" || item.topic === topic);
};

export const queryReadingItemById = async (id: string) => {
    const data = await import('$lib/server/db/reading_data.json');
    return data.default.map(item => item as ReadingItem).find(item => item.id === id);
}