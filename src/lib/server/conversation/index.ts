import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { Mode } from '$lib/types/mode';
import type { ChatCompletionFunctions } from 'openai';
import { gptFunctionCalling } from '../openai';
import type { CEFRLevel } from '$lib/types/CEFRLevel';

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
			{ role: 'user', 'content': "Goal: ถามเพื่อนของคุณว่าเขาชอบทำอะไรหลังเลิกเรียน\n\nDialogue:\nAlex: Hello I’m Alex,I'm a new student.\nUser: Hello. What do you like to do in the morning?\nAlex: In the morning, I typically get up and clean my teeth. Then I eat breakfast. It's necessary to begin the day with a nutritious meal.\nUser: Nice. what about after school?\nAlex: After school, I like to play soccer. It's a great way to stay active and have fun with my friends. Playing sports helps me relax and unwind after a long day of studying." },
			{ role: 'assistant', 'content': '', function_call: { 'name': 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' } },
			{ role: 'user', 'content': "Goal: ถามเจนว่าชอบทำอะไรในวันหยุด\n\nDialogue:\nJane: Hello,I’m Jane\nUser: What do you like to do on holidays?\nJane: Oh, I love going sailing or fishing on holidays! There\'s something so peaceful and enjoyable about being out on the water. How about you? What do you like to do on your holidays?" },
			{ role: 'assistant', 'content': '', function_call: { 'name': 'is_dialogue_achieve_goal', arguments: '{\n  "result": true\n}' } },
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
		description: `Analyze the provided User's dialogue in terms of grammar, appropriateness, and advancement of vocabulary and sentence structure based on the context of "${context}". Assess each aspect separately, providing specific examples to support your analysis`,
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

/**
{
	intro: 'Welcome to the shop how can I help you?',
	bot: {
		accent: 'Australia' as SynthesizeAccent,
		gender: 'FEMALE' as SynthesizeGender,
		prompt: `Your role:
You are a female stationery shop keeper, you are kind, and friendly. Your name is Lucy.

Your Goal: 
You have to give customer an information about the product available in you store, the sell them to the customer. 

Answer Format:
You have to answer in the JSON format by using to following JSON schema

{
// your response
"message": string,
// the enum value
// “NORMAL” used when the situation is normal
// “INAPPROPRIATE” used when the situation is out of context or say something inappropriate
// “END-OF-CONVERSATION” used when the customer have left or finish purchased your product
"status": string
}

Shop information:
There are only pen and pencil available in your store.
The pen and pencil is 5฿ and 10฿ each respectively.
Your store have only 10 pens, 10 pencils stock in your storage.

My role:
I will be your customer who is an kid and have English proficiency at level A1.`
	}
};

*/
