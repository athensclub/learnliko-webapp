import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { Mode } from '$lib/types/mode';
import type { ChatCompletionFunctions } from 'openai';
import { chatCompletion, gptFunctionCalling } from '../openai';
import type { CEFRLevel } from '$lib/types/CEFRLevel';
import {
	evaluate_dialogue_advancement_prompt,
	evaluate_dialogue_appropriateness_prompt,
	evaluate_dialogue_grammar_prompt
} from './prompt';
import type { ChatMessage } from '$lib/types/requests/chatCompletion';

export const queryConversations = async function (mode: Mode) {
	let data; // = await import(mapping[mode]);
	if (mode === 'Professional') {
		data = await import('$lib/server/db/conversations.json');
	} else if (mode === 'Student') {
		data = await import('$lib/server/db/student_conversations.json');
	} else {
		throw new Error('Unknown mode: ' + mode);
	}
	return data.results.map((val) => val as ConversationCarouselItem);
};

export const isDialogueAchieveGoal = async function (dialogue: string, goal: string) {
	if (!dialogue) throw new Error('No dialogue provided');
	if (!goal) throw new Error('No goal provided');

	const _function: ChatCompletionFunctions = {
		name: 'is_dialogue_achieve_goal',
		description: `Check whether the User in the provided dialogue has achieved the provided goal.`,
		parameters: {
			type: 'object',
			properties: {
				result: {
					type: 'boolean',
					description: `true if the provided dialogue has achieved the goal, false otherwise`
				}
			},
			required: ['result']
		}
	};
	const response = await gptFunctionCalling(
		[
			{
				role: 'system',
				content:
					'You are a dialogue evaluator tasked with assessing whether a given dialogue has achieved its goal. Your task is to read the provided dialogue and determine if the participants in the conversation have successfully accomplished what they set out to do. Evaluate the dialogue and provide your analysis, stating whether the goal has been achieved or not. Give your answer by calling is_dialogue_achieve_goal function, passing your answer as argument in result parameter.'
			},
			{
				role: 'user',
				content:
					"Goal: ถามเพื่อนของคุณว่าเขาชอบทำอะไรหลังเลิกเรียน\n\nDialogue:\nAlex: Hello I’m Alex,I'm a new student.\nUser: Hello. What do you like to do in the morning?\nAlex: In the morning, I typically get up and clean my teeth. Then I eat breakfast. It's necessary to begin the day with a nutritious meal.\nUser: Nice. what about after school?\nAlex: After school, I like to play soccer. It's a great way to stay active and have fun with my friends. Playing sports helps me relax and unwind after a long day of studying."
			},
			{
				role: 'assistant',
				content: '',
				function_call: { name: 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' }
			},
			{
				role: 'user',
				content:
					"Goal: ถามเจนว่าชอบทำอะไรในวันหยุด\n\nDialogue:\nJane: Hello,I’m Jane\nUser: What do you like to do on holidays?\nJane: Oh, I love going sailing or fishing on holidays! There's something so peaceful and enjoyable about being out on the water. How about you? What do you like to do on your holidays?"
			},
			{
				role: 'assistant',
				content: '',
				function_call: { name: 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' }
			},
			{ role: 'user', content: `Goal: ${goal}\n\nDialogue:\n ${dialogue}` }
		],
		[_function],
		{
			name: _function.name
		},
		0.1
	);

	if (!response) throw new Error('No output from checker');

	return JSON.parse(response);
};

export const analyzeDialogue = async function (
	assistant: string,
	user: { message: string; CEFRLevel: CEFRLevel },
	context: string
) {
	if (!assistant) throw new Error('No assistant dialogue provided');
	if (!user) throw new Error('No user details provided');
	if (!context) throw new Error('No context provided');

	const _function: ChatCompletionFunctions = {
		name: 'analyze_dialogue',
		description: `Analyze the provided User's dialogue in terms of grammar, appropriateness, and advancement of vocabulary and sentence structure based on the provided context. Assess each aspect separately, providing specific examples to support your analysis`,
		parameters: {
			type: 'object',
			properties: {
				appropriateness: {
					type: 'boolean',
					description: `Assess the appropriateness of the language used in the User's dialogue based on the context of "${context}" and the relationship between the participants. Consider factors such as formality, politeness, and cultural sensitivity, true if the User's dialogue is appropriate, false otherwise`
				},
				grammar: {
					type: 'object',
					properties: {
						score: {
							type: 'number',
							minimum: 0,
							maximum: 10,
							description: `Evaluate the grammar used in the User's dialogue and determine its correctness and clarity, scale from 0 to 10`
						},
						examples: {
							type: 'array',
							items: {
								type: 'string'
							},
							maxItems: 3,
							description: `Provide User the examples of the response with correct grammar`
						}
					}
				},
				advancement: {
					type: 'object',
					properties: {
						score: {
							type: 'number',
							minimum: 0,
							maximum: 10,
							description: `Examine the vocabulary choices and sentence structures employed in the User's dialogue compared to CEFR level ${user.CEFRLevel}, scale from 0 to 10`
						},
						// suggestion: {
						// 	type: 'string',
						// 	description: `Provide User suggestion of how to reply in which advancement is satisfied with CEFR level ${user.CEFRLevel}`
						// },
						examples: {
							type: 'array',
							items: {
								type: 'string'
							},
							maxItems: 3,
							description: `Provide User the examples of the response which advancement at CEFR level ${user.CEFRLevel}`
						}
					},
					required: ['score', 'suggestion']
				}
			},
			required: ['appropriateness', 'grammar', 'advancement']
		}
	};

	const response = await gptFunctionCalling(
		[
			{
				role: 'system',
				content: `Analyze the provided dialogue in terms of grammar, appropriateness, and advancement of vocabulary and sentence structure`
			},
			{ role: 'user', content: `A: "${assistant}"\nUser: "${user.message}"` }
		],
		[_function],
		{
			name: _function.name
		}
	);

	if (!response) throw new Error('No output from function');

	return JSON.parse(response);
};

export const evaluateDialogueAppropriateness = async function (
	assistant: string,
	learner: string,
	context: string
) {
	if (!assistant) throw new Error('No assistant dialogue provided');
	if (!learner) throw new Error('No learner dialogue provided');
	if (!context) throw new Error('No context provided');

	const messages: ChatMessage[] = [
		{
			role: 'system',
			content: evaluate_dialogue_appropriateness_prompt
		},
		{
			role: 'user',
			content: `
			<context>${context}</context>
			<assistant>${assistant}</assistant>
			<learner>${learner}</learner>`
		}
	];

	// Attempting to parse gpt's output to object
	let data: { preferable: string[]; suggestion: string; isInContext: boolean } | undefined;
	let attempt = 0;
	while (true) {
		try {
			const response = await chatCompletion(messages);

			// skip if no response from gpt
			if (!response) continue;

			// gpt will response in JSON format, parse it to object
			data = JSON.parse(response);

			// ensure `data` is available
			if (!data) continue;
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			messages.push({ role: 'user', content: 'Reply with provided JSON scheme' });
			console.error('error: parsing appropriateness object, retring...');
		}
	}

	if (!data) throw new Error("Error: Failed to evaluate dialogue's appropriateness");
	return data;
};

export const evaluateDialogueGrammar = async function (learner: string, context: string) {
	if (!learner) throw new Error('No learner dialogue provided');
	if (!context) throw new Error('No context provided');

	const messages: ChatMessage[] = [
		{
			role: 'system',
			content: evaluate_dialogue_grammar_prompt
		},
		{
			role: 'user',
			content: `
			<context>${context}</context>
			<learner>${learner}</learner>`
		}
	];

	// Attempting to parse gpt's output to object
	let data:
		| { preferable: string[]; suggestion: string; accuracy: 'LOW' | 'MEDIUM' | 'HIGH' }
		| undefined;
	let attempt = 0;
	while (true) {
		try {
			const response = await chatCompletion(messages);

			// skip if no response from gpt
			if (!response) continue;

			// gpt will response in JSON format, parse it to object
			data = JSON.parse(response);

			// ensure `data` is available
			if (!data) continue;
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			messages.push({ role: 'user', content: 'Reply with provided JSON scheme' });
			console.error('error: parsing evaluated grammar object, retring...');
		}
	}

	if (!data) throw new Error("Error: Failed to evaluate dialogue's grammar");
	return data;
};

export const evaluateDialogueAdvancement = async function (
	learner: string,
	targetLevel: CEFRLevel,
	context: string
) {
	if (!learner) throw new Error('No learner dialogue provided');
	if (!targetLevel) throw new Error('No targetLevel provided');
	if (!context) throw new Error('No context provided');

	const messages: ChatMessage[] = [
		{
			role: 'system',
			content: evaluate_dialogue_advancement_prompt
		},
		{
			role: 'user',
			content: `
			<context>${context}</context>
			<targetLevel>${targetLevel}</targetLevel>
			<learner>${learner}</learner>`
		}
	];

	// Attempting to pares gpt's output to object
	let data:
		| { preferable: string[]; suggestion: string; accuracy: 'LOW' | 'MEDIUM' | 'HIGH' }
		| undefined;
	let attempt = 0;
	while (true) {
		try {
			const response = await chatCompletion(messages);

			// skip if no response from gpt
			if (!response) continue;

			// gpt will response in JSON format, parse it to object
			data = JSON.parse(response);

			// ensure `data` is available
			if (!data) continue;
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			messages.push({ role: 'user', content: 'Reply with provided JSON scheme' });
			console.error('error: parsing evaluated advancement object, retring...');
		}
	}

	if (!data) throw new Error("Error: Failed to evaluate dialogue's advancement");
	return data;
};
