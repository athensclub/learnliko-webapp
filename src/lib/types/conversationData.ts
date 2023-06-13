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
	avatars: ConversationAvatar;
	conversationBackground: string;
	id: string;
}

export interface ConversationAvatar {
	normal: string;
}

export interface FinishedConversation {
	recap: RecapHistory;
	finishedTime: Date;
	conversationID: string;
}

export interface ChatBotMessage {
	message: string;
	mood:
		| 'neutral'
		| 'joy'
		| 'trust'
		| 'fear'
		| 'surprise'
		| 'sadness'
		| 'disgust'
		| 'anger'
		| 'anticipation';
	status: 'NORMAL' | 'INAPPROPRIATE' | 'END-OF-CONVERSATION';
}
