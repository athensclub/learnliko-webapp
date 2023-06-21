import type { Mode } from '$lib/types/mode';
import type { ReadingItem } from '$lib/types/reading';

export const queryReadingTopics = async (mode: Mode) => {
    let data;
    if (mode === 'Professional') {
        data = await import('$lib/server/db/reading_data.json');
    } else if (mode === 'Student') {
        data = await import('$lib/server/db/reading_data_student.json');
    } else {
        throw new Error("Unknown mode: ", mode);
    }
    const topics = ["All", ...data.default.map(item => (item as ReadingItem).topic)];

    // only return unique topics https://stackoverflow.com/a/14438954
    return [...new Set(topics)];
};

/**
 * Include both student and profiession items.
 */
const allItems = async (): Promise<ReadingItem[]> => {
    return [...(await import('$lib/server/db/reading_data.json')).default.map(item => ({
        ...item,
        quiz: item.quiz.map(q => ({ ...q, answer: undefined }))
    })), ...(await import('$lib/server/db/reading_data_student.json')).default.map(item => ({
        ...item,
        quiz: item.quiz.map(q => ({ ...q, answer: undefined }))
    }))]
}

/**
 * Note: Use topic "All" to query all items.
 * @param topic 
 */
export const queryReadingItems = async (topic: string, mode: Mode): Promise<ReadingItem[]> => {
    let data;
    if (mode === 'Professional') {
        data = await import('$lib/server/db/reading_data.json');
    } else if (mode === 'Student') {
        data = await import('$lib/server/db/reading_data_student.json');
    } else {
        throw new Error("Unknown mode: " + mode);
    }
    return data.default.map(item => ({
        ...item,
        quiz: item.quiz.map(q => ({ ...q, answer: undefined }))
    })).filter(item => topic === "All" || item.topic === topic);
};

export const queryReadingItemById = async (id: string) => {
    const data = await allItems();
    return data.map(item => item as ReadingItem).find(item => item.id === id);
}