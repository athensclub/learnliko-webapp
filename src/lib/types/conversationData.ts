import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';

export interface ConversationDetails {
	intro: string;
	bot: {
		accent: SynthesizeAccent;
		gender: SynthesizeGender;
		prompt: string;
	};
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
