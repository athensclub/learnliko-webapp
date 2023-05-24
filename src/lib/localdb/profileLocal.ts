/**
 * Profile APIs implemented using IndexDB (For demo/testing only).
 */
import { getConversations } from "$api/conversation";
import { browser } from "$app/environment";
import type { FinishedConversation } from "$lib/types/conversationData";
import type { LearningDiaryItem } from "$lib/types/learningDiary";
import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store"
import { writable, get } from "svelte/store"

const completedConversations = browser ? persist(writable<FinishedConversation[]>([]), createIndexedDBStorage(), "completedConversations") : null;

export const completeConversationLocal = (conversation: FinishedConversation) => {
    completedConversations?.set([...get(completedConversations), conversation]);
}

export const queryLearningDiariesLocal = async (): Promise<LearningDiaryItem[]> => {
    if (!completedConversations)
        throw new Error("do not query local data from ssr");

    const conversations = await getConversations();
    const completed = get(completedConversations);
    const dateToConversations = new Map<string, FinishedConversation[]>;
    for (const conv of completed) {
        const date = `${conv.finishedTime.getDate()}.${conv.finishedTime.getMonth() + 1}.${conv.finishedTime.getFullYear()}`;
        if (!dateToConversations.has(date))
            dateToConversations.set(date, []);
        dateToConversations.get(date)?.push(conv);
    }

    const result: LearningDiaryItem[] = [];
    for (const key of dateToConversations.keys()) {
        result.push({
            date: key,
            title: `You achieved following goal(s): ${dateToConversations.get(key)?.map(conv => conversations.find(c => c.id === conv.conversationID)?.details.learner.goal).join(", ")}`
        });
    }
    return result;
};
