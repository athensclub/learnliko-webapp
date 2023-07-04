import type { ChatCompletionFunctions } from 'openai';
import { gptFunctionCalling } from '../openai';
import type { CEFRLevel } from '$lib/types/CEFRLevel';

export const textAdaptor = async function (text: string, targetLevel: CEFRLevel) {
	if (text.trim().length === 0) throw new Error('No text provided');

	const _function: ChatCompletionFunctions = {
		name: 'text_adaptor',
		description: `Adjust provided text CEFR advance level to CEFR ${targetLevel} level`,
		parameters: {
			type: 'object',
			properties: {
				result: {
					type: 'string',
					description: `Adjusted ${targetLevel} CEFR level text`
				}
			},
			required: ['result']
		}
	};
	const response = await gptFunctionCalling(
		[{ role: 'user', content: `text: "${text}"` }],
		[_function],
		{
			name: _function.name
		}
	);

	if (!response) throw new Error('No output from adaptor');

	return JSON.parse(response);
};
