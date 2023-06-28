import { CEFRLevel } from "./CEFRLevel";

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