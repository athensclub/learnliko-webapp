import type { BotEmotion, ConversationCarouselItem } from '$lib/types/conversationData';
import { writable } from 'svelte/store';

export type ChatboxView = 'CONVERSATION' | 'RECAP' | 'ASSISTANT';

/**
 * Whether to show the chatbox or not.
 */
export const showChatbox = writable(false);

/**
 * Tha current view that is being shown in chatbox.
 */
export const currentChatboxView = writable<ChatboxView>('CONVERSATION');

type BotContext = {
	emotion: BotEmotion;
};

type ChatboxContext = {
	conversation: ConversationCarouselItem;
	bot: BotContext;
};

/**
 * Context of the current chatbox
 */
export const chatContext = writable<ChatboxContext | null>();

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
 * If the history is not loaded yet, it will be null.
 */
export const recapHistory = writable<RecapHistory | null>();

export const isLoadingRecapHistory = writable(false);
