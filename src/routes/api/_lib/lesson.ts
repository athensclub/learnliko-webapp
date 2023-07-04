import type { LessonCardData, LessonItem } from "$lib/types/lesson";

export const getLessonCards = async (): Promise<LessonCardData[]> => {
    const result = await fetch(
        '/api/v1/lesson/cards',
        { method: 'GET' }
    );
    return await result.json();
};

export const getLessonById = async (id: string): Promise<LessonItem> => {
    const result = await fetch('/api/v1/lesson?' + new URLSearchParams({ id }), { method: 'GET' });
    const val = await result.json();
    return val;
}