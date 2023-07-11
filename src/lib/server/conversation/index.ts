import type {
	ConversationCarouselItem,
	DialogueEvaluationResult
} from '$lib/types/conversationData';
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

export const isDialogueAchieveGoal = async function (latest: string, history: string | null, goal: string) {
	if (!latest) throw new Error('No latest dialogue provided');
	if (!goal) throw new Error('No goal provided');

	const _function: ChatCompletionFunctions = {
		name: 'is_dialogue_achieve_goal',
		description: `Check whether the User in the provided dialogue has achieved the provided goal. Consider both the latest dialogue and the conversation history.`,
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

	const userInput = `Goal: ${goal}\n\nLatest Dialogue:\n${latest}\n\nPrior Conversation History:\n${history ? history : 'There is no conversation history for this dialogue'}`;
	// console.log(userInput);

	const response = await gptFunctionCalling(
		[
			{
				role: 'system',
				content:
					"You are a dialogue evaluator tasked with assessing whether a given dialogue has achieved its goal. You will be given the latest dialogue (a pair of User message and partner's message) and a conversation history as a context. You have to determine if the participants in the conversation have successfully accomplished what they set out to do. Evaluate the dialogue and provide your analysis, stating whether the goal has been achieved or not. Give your answer by calling is_dialogue_achieve_goal function, passing your answer as argument in result parameter."
			},
			{ role: 'user', 'content': "Goal: ถามเพื่อนของคุณว่าเขาชอบทำอะไรหลังเลิกเรียน\n\nLatest Dialogue\nAlex: After school, I like to play soccer. It's a great way to stay active and have fun with my friends. Playing sports helps me relax and unwind after a long day of studying.\n\nPrior Conversation History:\nAlex: Hello I’m Alex,I'm a new student.\nUser: Hello. What do you like to do in the morning?\nAlex: In the morning, I typically get up and clean my teeth. Then I eat breakfast. It's necessary to begin the day with a nutritious meal.\nUser: Nice. what about after school?\n\n" },
			{ role: 'assistant', 'content': '', function_call: { 'name': 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' } },
			{ role: 'user', 'content': "Goal: ถามเจนว่าชอบทำอะไรในวันหยุด\n\nLatest Dialogue:\nUser: What do you like to do on holidays?\nJane: Oh, I love going sailing or fishing on holidays! There’s something so peaceful and enjoyable about being out on the water. How about you? What do you like to do on your holidays?\n\nPrior Conversation History:\nJane: Hello,I’m Jane\n\n" },
			{ role: 'assistant', 'content': '', function_call: { 'name': 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' } },
			{ role: 'user', 'content': "Goal: ถามนักท่องเที่ยวว่าเดินทางด้วยอะไร\n\nLatest Dialogue:\nUser: Anyway, how do you commute around here?\nSusan: Well, since I\'m a tourist, I\'ve been traveling by plane to get from one destination to another. It\'s a convenient and efficient way to cover long distances quickly. Plus, I enjoy looking out the window and getting a bird\'s eye view of the beautiful landscapes below. How about you? How do you usually get around?  \n\nPrior Conversation History:\nSusan: Hey, I\'m Susan nice too meet you.\nUser: Hello. How are you?\nSusan: Hey! I\'m doing great, thanks! How about you?\nUser: I\'m doing pretty good, thank you.\nSusan: That\'s fantastic news! So, please, inform me about your preferred creature?\nUser: giraffes, how about you?\nSusan: Giraffes are awesome! I love their long necks and how gracefully they move. As for me, I\'m all about monkeys! They are so playful and mischievous, they always make me smile.\nUser: Do you also know about tiger? they are really fast and strong\nSusan: Oh, yes! Tigers are amazing animals. They are very fast and strong, and also very sneaky. Did you know that they can run as fast as 40 miles per hour? That\'s like a super fast cat! They also have strong mouths and sharp teeth, which makes them great hunters. They can easily catch prey that is much bigger than them. Tigers are really impressive!" },
			{ role: 'assistant', 'content': '', function_call: { 'name': 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' } },
			{ role: 'user', content: userInput }
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

	const returnedData: DialogueEvaluationResult = {};

	returnedData.appropriateness = await _evaluateDialogueAppropriateness(
		assistant,
		user.message,
		context
	);

	// If the dialogue is out of context exit the function
	if (!returnedData.appropriateness.isInContext) return returnedData;

	// Asynchronous calling evaluate function
	await Promise.all([
		_evaluateDialogueAdvancement(user.message, user.CEFRLevel, context).then(
			(data) => (returnedData.advancement = data)
		),
		_evaluateDialogueGrammar(user.message, context).then((data) => (returnedData.grammar = data))
	]);

	return returnedData;
};

const _evaluateDialogueAppropriateness = async function (
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

const _evaluateDialogueGrammar = async function (learner: string, context: string) {
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

const _evaluateDialogueAdvancement = async function (
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

/**
 * properties: {
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
 */
