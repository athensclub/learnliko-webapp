import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import { Configuration, OpenAIApi } from 'openai';

const _configuration = new Configuration({
	organization: 'org-zy9WP5Ms8eWs4ToQfjGStzlC',
	apiKey: SECRET_OPENAI_API_KEY
});
const _openai = new OpenAIApi(_configuration);

export const chatCompletion = async function (messages: ChatMessage[]) {
	const chatGPT = await _openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages
	});
	
	return chatGPT.data.choices[0].message?.content;
};
