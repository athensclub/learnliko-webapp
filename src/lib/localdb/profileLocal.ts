/**
 * Profile APIs implemented using IndexDB (For demo/testing only).
 */
import { browser } from "$app/environment";
import type { FinishedConversation } from "$lib/types/conversationData";
import { persist, createIndexedDBStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"

export const completedConversations = browser ? persist(writable<FinishedConversation[]>([]), createIndexedDBStorage(), "completedConversations") : null;