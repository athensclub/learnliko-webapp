/**
 * Conversation APIs implemented using IndexDB (For demo/testing only).
 */
import { getConversations } from "$api/conversation";
import { get } from "svelte/store";
import { completedConversations } from "./profileLocal";

export const queryConversationsLocal = async () => {
    if (!completedConversations)
        throw new Error("do not query local data from ssr");

    const conversations = await getConversations();
    const completed = get(completedConversations);
    return conversations.filter(conv => completed.every(com => com.conversation.conversationID !== conv.id));
}