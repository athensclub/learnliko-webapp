import type { RecapHistory } from "$lib/global/chatbox";
import type { ConversationCarouselItem } from "./conversationData";

export interface LearningDiaryItem{
    date: string;
    title: string;
    learnedItems: LearnedItem[]
}

export interface LearnedItem {
    conversation: ConversationCarouselItem;
    recap: RecapHistory;
    vocabs: string[];
    finishedTime: Date;
}