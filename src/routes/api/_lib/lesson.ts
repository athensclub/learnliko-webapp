import type { LessonCard } from "$gql/generated/graphqll";
import type { LessonItem } from "$lib/types/lesson";

export const getLessonCards = async (): Promise<LessonCard[]> => {
    const result = await fetch(
        '/api/v1/lesson/cards',
        { method: 'GET' }
    );
    return await result.json();
};

export const getLessonById = async (id: string): Promise<LessonCard> => {
    const result = await fetch('/api/v1/lesson?' + new URLSearchParams({ id }), { method: 'GET' });
    const val = await result.json();
    return val;
}