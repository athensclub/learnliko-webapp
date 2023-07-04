import type { ConversationCarouselItem } from "./conversationData";
import type { ReadingItem } from "./reading";

/**
 * Each item will only has one non-null field.
 */
export interface DiscoverItem {
    conversation: ConversationCarouselItem | null;
    reading: ReadingItem | null;
};