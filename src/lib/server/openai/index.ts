import { SECRET_OPENAI_API_KEY } from '$env/static/private';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';
import {
	Configuration,
	OpenAIApi,
	type ChatCompletionFunctions,
	type CreateChatCompletionRequestFunctionCall
} from 'openai';
import {
	OpenAIApi as OpenAIEdgeApi,
	Configuration as EdgeConfiguration
} from 'openai-edge';
import { Readable } from 'stream';

const _configuration = new Configuration({
	organization: 'org-zy9WP5Ms8eWs4ToQfjGStzlC',
	apiKey: SECRET_OPENAI_API_KEY
});
const _openai = new OpenAIApi(_configuration);

const _configurationEdge = new EdgeConfiguration({
	organization: 'org-zy9WP5Ms8eWs4ToQfjGStzlC',
	apiKey: SECRET_OPENAI_API_KEY
});
const _openaiEdge = new OpenAIEdgeApi(_configurationEdge)

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
	function_call: CreateChatCompletionRequestFunctionCall,
	temperature = 0.5
) {
	const chatGPT = await _openai.createChatCompletion({
		model: 'gpt-3.5-turbo-0613',
		temperature,
		messages,
		functions,
		function_call
	});

	return chatGPT.data.choices[0].message?.function_call?.arguments;
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

export const assistantChatCompletion = async (message: ChatMessage[]) => {
	const completion = await _openaiEdge.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: message,
		temperature: 0.5,
		stream: true,
	});
	return completion.body;
	// modified from https://stackoverflow.com/a/74336207
	// and https://github.com/dan-kwiat/openai-edge
	// const stream = new ReadableStream<string>({
	// 	async start(controller) {
	// 		const completion = await _openaiEdge.createChatCompletion({
	// 			model: "gpt-3.5-turbo",
	// 			messages: message,
	// 			temperature: 0.5,
	// 			stream: true,
	// 		});

	// 		if (!completion.body)
	// 			throw Error('No response body from OpenAI chat completion api.');
				
	// 		const reader = completion.body.pipeThrough(new TextDecoderStream()).getReader();
	// 		while (true) {
	// 			const { value, done } = await reader.read();
	// 			if (done) break;

	// 			let toBreak = false;
	// 			const lines = value.split("\n");
	// 			for (const line of lines) {
	// 				const str = line.substring(5).trim();
	// 				if (line.length === 0) continue;
	// 				if (str === '[DONE]') {
	// 					toBreak = true;
	// 					break;
	// 				}

	// 				try {
	// 					const obj = JSON.parse(str);
	// 					controller.enqueue(obj.choices[0].delta.content);
	// 				} catch (e) {
	// 					console.log(str, 'and', e);
	// 				}
	// 			}

	// 			if (toBreak) break;
	// 		}
	// 		controller.close();
	// 	},
	// })
	// return stream;
}