import { getReadingItems } from "$api/reading";
import { browser } from "$app/environment";
import type { FinishedReading } from "$lib/types/reading";
import { createIndexedDBStorage, persist } from "@macfja/svelte-persistent-store";
import { writable, get } from "svelte/store";

export const completedReadings = browser ? persist(writable<FinishedReading[]>([]), createIndexedDBStorage(), "completedReadings") : null;

export const completeReadingLocal = async (item: FinishedReading) => {
    if (!completedReadings)
        throw new Error("do not query local data from ssr");

    completedReadings.set([...get(completedReadings), item]);
};

export const queryAnswersLocal = async (readingID: string) => {
    const all = await getReadingItems('All');
    return all.find(v => v.id === readingID)?.quiz.map(q => q.answer);
}
