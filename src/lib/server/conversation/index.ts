import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { Mode } from '$lib/types/mode';
import type { ChatCompletionFunctions } from 'openai';
import { chatCompletion, gptFunctionCalling } from '../openai';
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
		description: `Check whether the User in the provided dialogue has achieved the goal which is "${goal}"`,
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
					'You are a dialogue evaluator tasked with assessing whether a given dialogue has achieved its goal. Your task is to read the provided dialogue and determine if the participants in the conversation have successfully accomplished what they set out to do. Evaluate the dialogue and provide your analysis, stating whether the goal has been achieved or not'
			},
			{ role: 'user', content: `dialogue: "${dialogue}"` }
		],
		[_function],
		{
			name: _function.name
		}
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
	const systemPrompt = `
	You are english tutor, you have to evaluate learner's dialogue in term of appropriateness of 
	the language used in the learner's dialogue based on the context and the relationship between the participants.

	You will be provided a pair of dialogue between assistant and learner, 
	and context (delimited with XML tags).

	Use the following step-by-step instructions to respond to inputs.

	Step 1 - First work out your own preferable dialogue in the given context. 
	Don't rely on the learner's dialogue since it may be inappropriate. 
	Put all your evaluation for this step within 'preferable' field in JSON schema.

	Step 2 - Compare your preferable dialogue to the learner's dialogue, 
	then evaluate learner's dialogue regarding formality, politeness, and cultural sensitivity. 
	The learner will read you suggestion so make sure to refer to the learner by using 'You' and 'Your', instead of 'The learner'. 
	Put all your evaluation for this step within 'suggestion' field in JSON schema.

	Step 3 - Compare your preferable dialogue with learner's dialogue, 
	examine only whether the learner's dialogue is in the given context or not. 
	Do not consider about formality, politeness, and cultural sensitivity. 
	Put all your examination for this step within 'isInContext' field in JSON schema.

	Step 4 - Provide the output in the provided JSON schema:
	{
		type: "object",
		properties: {
			preferable: {
				type: "array",
						items: {
							type: "string"
						},
						maxItems: 3,
				description: "Evaluate the given context, then come up with the examples of appropriate dialogues as you will reply as if you were a learner"
			},
			suggestion: {
				type: "string",
				description: "The briefly explanation of how could learner improve their language in dialogue regarding formality, politeness, and cultural sensitivity, if the learner's dialogue is perfect offer them an encouraging comment."
			},
			isInContext: {
				type: "boolean",
				description: "Whether learner's dialogue is in the given context, true if learner's dialogue is in the given context, false otherwise"
			}
		},
		required: ["preferable", "suggestion", "isInContext"]
	}`;

	// Attempting to pares gpt's output to object
	let data: { preferable: string[]; suggestion: string; isInContext: boolean } | undefined;
	let attempt = 0;
	while (true) {
		try {
			const response = await chatCompletion([
				{
					role: 'system',
					content: systemPrompt
				},
				{
					role: 'user',
					content: `
					<context>${context}</context>
					<assistant>${assistant}</assistant>
					<learner>${learner}</learner>`
				}
			]);

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

			console.error('error: parsing appropriateness object, retring...');
		}
	}

	if (!data) throw new Error("Error: Failed to evaluate dialogue's appropriateness");
	return data;
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
