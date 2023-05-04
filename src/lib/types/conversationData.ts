import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';

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
}

export interface ConversationCarouselItem {
	image: string;
	intro: string;
	topic: string;
	background: string;
	details: ConversationDetails;
}

export interface ChatBotMessage {
	message: string;
	status: 'NORMAL' | 'INAPPROPRIATE' | 'END-OF-CONVERSATION';
}
