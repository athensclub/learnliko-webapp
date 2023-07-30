import type { Lesson } from '$gql/generated/graphql';
import type { LessonItem } from '$lib/types/lesson';

export const queryLessonCards = async (): Promise<Lesson[]> => {
    const data = await import('$lib/server/db/lessons.json');
    return data.default;
};

export const queryLessonById = async (id: string): Promise<Lesson> => {
    const data = await import('$lib/server/db/lessons.json');
    return data.default.find(l => l.id == id);
}