import type { ConversationCarouselItem } from '$lib/types/conversationData';
import type { Mode } from '$lib/types/mode';
import type { ChatCompletionFunctions } from 'openai';
import { gptFunctionCalling } from '../openai';

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

	console.log(dialogue);
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
