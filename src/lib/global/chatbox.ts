import { writable } from "svelte/store";

export type ChatboxView = "CONVERSATION" | "RECAP";

/**
 * Whether to show the chatbox or not.
 */
export const showChatbox = writable(false);

/**
 * pair of assistant message, then user message.
 */
export type RecapHistoryItem = {
    assistant: {
        role: 'assistant';
        audioURL: string;
        transcription: string;
    };
    user: {
        role: 'user';
        audioURL: string;
        transcription: string;
    } | null;
    suggestion: string;
    score: number;
};

/**
 * A history of pair of assistant message, then user message.
 */
export type RecapHistory = RecapHistoryItem[];
/**
 * A history to be used to show in recap.
 * Fill this store's data before showing recap view.
 */
export const recapHistory = writable<RecapHistory>([]);