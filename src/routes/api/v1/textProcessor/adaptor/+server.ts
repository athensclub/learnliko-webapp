import { textAdaptor } from '$lib/server/textProcessor';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { text, targetLevel } = await request.json();
	if (!text) throw error(400, `Error: No text provided`);
	if (!targetLevel) throw error(400, `Error: No target CEFR level provided`);

	try {
		const result = await textAdaptor(text, targetLevel);
		return json(result);
	} catch (e) {
		throw error(500, e as string);
	}
};
