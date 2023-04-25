import { writable } from "svelte/store";

/**
 * Whether to show the chatbox or not.
 */
export const showChatbox = writable(false);