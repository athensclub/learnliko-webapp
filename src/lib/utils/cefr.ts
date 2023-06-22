import type { CEFRLevel } from "$lib/types/CEFRLevel";

const ordered: CEFRLevel[] = ['pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

/**
 * 
 * @param level 
 * @returns the level that is a level above the given level. this function will return the same level if there's no higher level than the given level.
 */
export const nextLevel = (level: CEFRLevel) => {
    const idx = ordered.indexOf(level);
    return idx + 1 < ordered.length ? ordered[idx + 1] : level;
}

/**
 * 
 * @param level 
 * @returns the level that is a level below the given level. this function will return the same level if there's no lower level than the given level.
 */
export const previousLevel = (level: CEFRLevel) => {
    const idx = ordered.indexOf(level);
    return idx - 1 >= 0 ? ordered[i - 1] : level;
}