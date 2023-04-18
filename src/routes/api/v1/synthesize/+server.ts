import { synthesize } from '$lib/server/gcloud/tts';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const text = await request.text();
	if (!text) throw error(400, `Error: No text provided`);

	try {
		const audio = await synthesize(text);
		return new Response(audio);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
