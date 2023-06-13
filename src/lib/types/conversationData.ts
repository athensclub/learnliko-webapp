import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';
import type { RecapHistory } from '$lib/global/chatbox';

interface LearnerDetails {
	goal: string;
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
	CEFRlevel: string;
	background: string;
	details: ConversationDetails;
	avatar: ConversationAvatar;
	id: string;
}

export interface ConversationAvatar {
	name: string;
	models: AvatarModel;
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
	recap: RecapHistory;
	finishedTime: Date;
	conversationID: string;
}

export type BotEmotion =
	| 'neutral'
	| 'joy'
	| 'trust'
	| 'fear'
	| 'surprise'
	| 'sadness'
	| 'disgust'
	| 'anger'
	| 'anticipation';

export interface ChatBotMessage {
	message: string;
	emotion: BotEmotion;
	status: 'NORMAL' | 'INAPPROPRIATE' | 'END-OF-CONVERSATION';
}
