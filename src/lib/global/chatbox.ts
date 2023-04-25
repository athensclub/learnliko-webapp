import { writable } from "svelte/store";

export type ChatboxView = "CONVERSATION" | "RECAP";

/**
 * Whether to show the chatbox or not.
 */
export const showChatbox = writable(false);

export type RecapHistory = {
    role: 'user' | 'assistant';
    audioURL: string;
    transcription: string;
    suggestion: string;
    score: number;
}[];
/**
 * A history to be used to show in recap.
 * Fill this store's data before showing recap view.
 */
export const recapHistory = writable<RecapHistory>([]);