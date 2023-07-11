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
		// TODO: Find a better way of handling this.
		// Current Idea: Invalid file format probably happen when audio is too short?
		// we treat really short audio as no text for now.
		if (e.response.data.error.type === 'invalid_request_error') {
			return json({ text: '' });
		} else {
			throw error(500, `Error: ${e}`);
		}
	}
};
