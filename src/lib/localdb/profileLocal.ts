/**
 * Profile APIs implemented using IndexDB (For demo/testing only).
 */
import { getConversations, getVocabsFromConversation } from "$api/conversation";
import { browser } from "$app/environment";
import type { ConversationCarouselItem, FinishedConversation } from "$lib/types/conversationData";
import type { LearnedItem, LearningDiaryItem } from "$lib/types/learningDiary";
import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store"
import { writable, get } from "svelte/store"

interface UserFinishedConversationItem {
    conversation: FinishedConversation;
    vocabs: string[];
}

const completedConversations = browser ? persist(writable<UserFinishedConversationItem[]>([]), createIndexedDBStorage(), "completedConversations") : null;

export const completeConversationLocal = async (conversation: FinishedConversation) => {
    completedConversations?.set([...get(completedConversations),
    { conversation, vocabs: await getVocabsFromConversation(conversation.recap) }]);
}

export const queryLearningDiariesLocal = async (): Promise<LearningDiaryItem[]> => {
    if (!completedConversations)
        throw new Error("do not query local data from ssr");

    const conversations = await getConversations();
    const completed = get(completedConversations);
    const dateToConversations = new Map<string, UserFinishedConversationItem[]>;
    for (const item of completed) {
        const date = `${item.conversation.finishedTime.getDate()}.${item.conversation.finishedTime.getMonth() + 1}.${item.conversation.finishedTime.getFullYear()}`;
        if (!dateToConversations.has(date))
            dateToConversations.set(date, []);
        dateToConversations.get(date)?.push(item);
    }

    const result: LearningDiaryItem[] = [];
    for (const key of dateToConversations.keys()) {
        const convs = dateToConversations.get(key);
        // use if check to make linter happy :(
        if (convs) {
            const items: LearnedItem[] = convs.map(conv =>
            ({
                recap: conv.conversation.recap,
                conversation: conversations.find(c => c.id === conv.conversation.conversationID)!,
                vocabs: conv.vocabs,
                finishedTime: conv.conversation.finishedTime
            }));
            result.push({
                date: key,
                title: `You achieved following goal(s): ${items.map(item => item.conversation.details.learner.goal).join(", ")}`,
                learnedItems: items
            });
        }
    }
    return result;
};
