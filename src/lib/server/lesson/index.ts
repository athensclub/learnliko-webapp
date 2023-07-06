import type { LessonCard } from '$gql/generated/graphqll';
import type { LessonItem } from '$lib/types/lesson';

export const queryLessonCards = async (): Promise<LessonCard[]> => {
    const data = await import('$lib/server/db/lessons.json');
    return data.default.map(l => ({ ...l, vocabs: undefined, writings: undefined }));
};

export const queryLessonById = async (id: string): Promise<LessonItem> => {
    const data = await import('$lib/server/db/lessons.json');
    return data.default.find(l => l.id == id);
}