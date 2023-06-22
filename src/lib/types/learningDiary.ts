import type { RecapHistory } from "$lib/global/chatbox";
import type { ConversationCarouselItem } from "./conversationData";
import type { ReadingItem } from "./reading";

export type CEFRLevel = 'pre-A1' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface LearningDiaryItem {
    date: string;
    title: string;
    learnedConversations: LearnedConversationItem[];
    learnedReadings: LearnedReadingItem[];
}

export interface LearnedReadingItem {
    item: ReadingItem;
    vocabs: string[];
    finishedTime: Date;
}

export interface LearnedConversationItem {
    conversation: ConversationCarouselItem;
    recap: RecapHistory;
    vocabs: string[];
    finishedTime: Date;
}