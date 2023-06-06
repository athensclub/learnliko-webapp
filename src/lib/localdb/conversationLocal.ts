/**
 * Conversation APIs implemented using IndexDB (For demo/testing only).
 */
import { getConversations, getVocabsFromConversation } from "$api/conversation";
import { browser } from "$app/environment";
import type { FinishedConversation } from "$lib/types/conversationData";
import { createIndexedDBStorage, persist } from "@macfja/svelte-persistent-store";
import { writable, get } from "svelte/store";

export interface UserFinishedConversationItem {
    conversation: FinishedConversation;
    vocabs: string[];
}
export const completedConversations = browser ? persist(writable<UserFinishedConversationItem[]>([]), createIndexedDBStorage(), "completedConversations") : null;

export const queryConversationsLocal = async () => {
    if (!completedConversations)
        throw new Error("do not query local data from ssr");

    const conversations = await getConversations();
    const completed = get(completedConversations);
    return conversations.filter(conv => completed.every(com => com.conversation.conversationID !== conv.id));
}

export const completeConversationLocal = async (conversation: FinishedConversation) => {
    if (!completedConversations)
        throw new Error("do not query local data from ssr");
        
    completedConversations.set([...get(completedConversations),
    { conversation, vocabs: await getVocabsFromConversation(conversation.recap) }]);
}