import type { ReadingItem } from "$lib/types/reading";

export const getReadingItems = async (topic: string): Promise<ReadingItem[]> => {
    const response = await fetch("/api/v1/reading?" + new URLSearchParams({ topic }));
    const val = await response.json();
    return val;
};

export const getReadingItemById = async (id: string): Promise<ReadingItem> => {
    const response = await fetch("/api/v1/reading?" + new URLSearchParams({ id }));
    const val = await response.json();
    return val;
}