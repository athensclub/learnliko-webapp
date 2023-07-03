import type { CEFRLevel } from "$lib/types/CEFRLevel";
import type { FlipCardItem } from '$lib/types/flip_card';
import type { WritingCardItem } from '$lib/types/writing_card';
import type { ReadingItem } from '$lib/types/reading';

export interface LessonCardData {
    topic: string;
    description: string;
    avatar: string;
    avatarIntro: string;
    background: string;
    level: CEFRLevel;
    exp: number;
    /**
     * Value between 0 and 1?
     */
    progress: number;
    id: string;
}

export interface LessonItem extends LessonCardData {
    intro: LessonIntro[];
    vocabs: FlipCardItem[];
    writings: WritingCardItem[];
    reading: ReadingItem;
}

export interface LessonIntro {
    description: string;
    background: string;
}