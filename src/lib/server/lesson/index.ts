import type { LessonCard, LessonItem } from '$lib/types/lesson';

export const queryLessonCards = async (): Promise<LessonCard[]> => {
    const data = await import('$lib/server/db/lessons.json');
    return data.default.map(l => ({ ...l, progress: 0, intro: undefined, vocabs: undefined, writings: undefined }));
};

export const queryLessonById = async (id: string): Promise<LessonItem> => {
    const data = await import('$lib/server/db/lessons.json');
    return data.default.find(l => l.id == id);
}