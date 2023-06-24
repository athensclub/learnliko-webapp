import type { CEFRLevel } from "$lib/types/CEFRLevel";
import type { PretestCEFRLevel } from "$lib/types/pretest";

export const orderedCEFR: CEFRLevel[] = ['pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const orderedPretestCEFR: PretestCEFRLevel[] = ['pre-A1', 'A1', 'A2', 'B1', 'B2']

/**
 * 
 * @param level 
 * @returns the level that is a level above the given level. this function will return the same level if there's no higher level than the given level.
 */
export const nextLevel = (level: CEFRLevel) => {
    const idx = orderedCEFR.indexOf(level);
    return idx + 1 < orderedCEFR.length ? orderedCEFR[idx + 1] : level;
}

/**
 * 
 * @param level 
 * @returns the level that is a level below the given level. this function will return the same level if there's no lower level than the given level.
 */
export const previousLevel = (level: CEFRLevel) => {
    const idx = orderedCEFR.indexOf(level);
    return idx - 1 >= 0 ? orderedCEFR[idx - 1] : level;
}

/**
 * 
 * @param level 
 * @returns the level that is a level above the given level. this function will return the same level if there's no higher level than the given level.
 */
export const nextPretestLevel = (level: PretestCEFRLevel) => {
    const idx = orderedPretestCEFR.indexOf(level);
    return idx + 1 < orderedPretestCEFR.length ? orderedPretestCEFR[idx + 1] : level;
}

/**
 * 
 * @param level 
 * @returns the level that is a level below the given level. this function will return the same level if there's no lower level than the given level.
 */
export const previousPretestLevel = (level: PretestCEFRLevel) => {
    const idx = orderedPretestCEFR.indexOf(level);
    return idx - 1 >= 0 ? orderedPretestCEFR[idx - 1] : level;
}