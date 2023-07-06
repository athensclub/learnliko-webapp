import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';
import type { AvatarModels } from '$gql/generated/graphql';
import type { RecapResult } from '$lib/global/chatbox';
import type { CEFRLevel } from './CEFRLevel';

interface LearnerDetails {
	mission: string;
	goal: string[];
	hint: string[];
}

interface BotDetails {
	avatar: string;
	accent: SynthesizeAccent;
	gender: SynthesizeGender;
	prompt: string;
}

export interface ConversationDetails {
	intro: string;
	bot: BotDetails;
	learner: LearnerDetails;
	image: string;
}

export interface ConversationCarouselItem {
	image: string;
	intro: string;
	topic: string;
	CEFRlevel: CEFRLevel;
	background: string;
	details: ConversationDetails;
	avatar: ConversationAvatar;
	id: string;
}

export interface ConversationAvatar {
	name: string;
	models: AvatarModels;
}

export interface AvatarModel {
	neutral: string;
	joy: string;
	trust: string;
	fear: string;
	surprise: string;
	sadness: string;
	disgust: string;
	anger: string;
	anticipation: string;
}

export interface FinishedConversation {
	recap: RecapResult;
	finishedTime: Date;
	conversationID: string;
}

export const BotEmotionValues = [
	'neutral',
	'joy',
	'trust',
	'fear',
	'surprise',
	'sadness',
	'disgust',
	'anger',
	'anticipation'
] as const;

export type BotEmotion = (typeof BotEmotionValues)[number];

export interface ChatBotMessage {
	message: string;
	emotion: BotEmotion;
	status: 'NORMAL' | 'INAPPROPRIATE' | 'END-OF-CONVERSATION';
}

export interface ConversationHistoryItem {
	chat?: {
		role: 'user' | 'assistant';
		audioURL: string;
		transcription: string | null;
	};
	endOfGoal?: number;
	hint?: string;
}
