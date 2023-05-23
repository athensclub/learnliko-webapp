import type { ReadingItem } from '$lib/types/reading';

export const queryReadingTopics = async () => {
    const data = await import('$lib/server/db/reading_data.json');
    const topics = ["All", ...data.default.map(item => (item as ReadingItem).topic)];

    // only return unique topics https://stackoverflow.com/a/14438954
    return [...new Set(topics)];
}