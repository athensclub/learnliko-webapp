export interface ConversationCarouselItem {
	image: string;
	intro: string;
	topic: string;
}

export interface ChatBotMessage {
	message: string;
	status: 'NORMAL' | 'INAPPROPRIATE' | 'END-OF-CONVERSATION';
}
