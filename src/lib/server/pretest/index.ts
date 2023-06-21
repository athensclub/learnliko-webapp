import type { PretestCEFRLevel, PretestItem } from "$lib/types/pretest";
import { shuffle } from "$lib/utils/array";

/**
 * 1 Group: 1 conversation, 3 fill in the blank, 3 match the picture.
 * @param level 
 */
export const queryPretestQuestionGroup = async (level: PretestCEFRLevel): Promise<PretestItem[]> => {
    const data = await import('$lib/server/db/pretest_data.json');
    const items = data.default[level];

    const result: PretestItem[] = [...shuffle(items.writing).map(val => ({
        conversation: null,
        imageMatching: null,
        fillInTheBlank: { ...val, answer: undefined }
    })).slice(0, 3)];
    return result;
}

export const queryPretestQuizAnswer = async (id: string) => {
    const data = await import('$lib/server/db/pretest_data.json');
    for (const key in data.default) {
        const current = data.default[key as PretestCEFRLevel];

        let val = current.writing.find(item => item.id === id);
        if (val)
            return val.answer;
    }
    throw new Error("Pretest Quiz with unknown id: " + id);
};