import { transcribe } from '$lib/server/openai';
import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const audioBlob = await request.blob();
	if (!audioBlob) throw error(400, `Error: No audio provided`);

	try {
		const result = await transcribe(audioBlob);
		return json({ text: result });
	} catch (e) {
		console.log(e);
		throw error(500, `Error: ${e}`);
	}
};
