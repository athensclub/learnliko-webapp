import type { ConversationCarouselItem } from "./conversationData";

export type PretestCEFRLevel = 'pre-A1';

/**
 * There must be only one non-null field.
 */
export interface PretestItem {
    conversation: ConversationCarouselItem | null;
    fillInTheBlank: FillInTheBlankMultipleChoicesQuestion | null;
    imageMatching: ImageMatchingMultipleChoicesQuestion | null;
}

export interface FillInTheBlankMultipleChoicesQuestion {
    /**
     * The string will be joined using whitespace, and null will be treated as the blank space to be filled.
     */
    text: (string | null)[];
    choices: string[];
    id: string;
}

export interface ImageMatchingMultipleChoicesQuestion {
    image: string;
    choices: string[];
    id: string;
}