import type { PretestCEFRLevel, PretestItem } from "$lib/types/pretest";

export const getPretestQuestionGroup = async (level: PretestCEFRLevel): Promise<PretestItem[]> => {
    const result = await fetch('/api/v1/pretest/group?' + new URLSearchParams({ level }), { method: 'GET' });
    const val = await result.json();
    return val;
}

export const getPretestQuizAnswer = async (id: string): Promise<number> => {
    const result = await fetch('/api/v1/pretest/answer?' + new URLSearchParams({ id }), { method: 'GET' });
    const val = await result.json();
    return val.answer;
}