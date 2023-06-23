import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import {
	Configuration,
	OpenAIApi,
	type ChatCompletionFunctions,
	type CreateChatCompletionRequestFunctionCall
} from 'openai';
import { Readable } from 'stream';

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

export const gptFunctionCalling = async function (
	messages: ChatMessage[],
	functions: ChatCompletionFunctions[],
	function_call: CreateChatCompletionRequestFunctionCall
) {
	const chatGPT = await _openai.createChatCompletion({
		model: 'gpt-3.5-turbo-0613',
		function_call,
		functions,
		messages
	});

	return chatGPT.data.choices[0].message?.content;
};

export const transcribe = async function (audio: Blob) {
	// modified from https://github.com/openai/openai-node/issues/77#issuecomment-1500899486
	const buffer = await audio.arrayBuffer();
	const readable = new Readable({
		read() {
			this.push(Buffer.from(buffer));
			this.push(null);
		}
	});
	readable.path = 'audio.webm';
	const response = await _openai.createTranscription(
		readable,
		'whisper-1',
		undefined,
		undefined,
		undefined,
		'en'
	);
	return response.data.text;
};
