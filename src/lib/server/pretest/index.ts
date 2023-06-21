import type { FillInTheBlankMultipleChoicesQuestion, PretestCEFRLevel, PretestItem } from "$lib/types/pretest";
import { shuffle } from "$lib/utils/array";

/**
 * 1 Group: 1 conversation, 3 fill in the blank, 3 match the picture.
 * @param level 
 */
export const queryPretestQuestionGroup = async (level: PretestCEFRLevel): Promise<PretestItem[]> => {
    const data = await import('$lib/server/db/pretest_data.json');
    const items = data.default[level];

    const result: PretestItem[] = [...shuffle(items.writing).map(val => ({ conversation: null, imageMatching: null, fillInTheBlank: val  })).slice(0, 3)];
    return result;
}