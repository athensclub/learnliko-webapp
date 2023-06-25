import { analyzeDialogue } from '$lib/server/conversation';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { assistant, user, context } = await request.json();
	if (!assistant) throw error(400, `Error: No assistant's message provided`);
	if (!user) throw error(400, `Error: No user details provided`);
	if (!context) throw error(400, `Error: No context provided`);

	try {
		const result = await analyzeDialogue(assistant, user, context);
		return json(result);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
