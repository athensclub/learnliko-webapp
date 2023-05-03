import { synthesize } from '$lib/server/gcloud/tts';
import type { SynthesizeRequestBody } from '$lib/types/requests/synthesize_request_body';
import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body: SynthesizeRequestBody = await request.json();
	if (!body) throw error(400, `Error: No text provided`);

	try {
		const audio = await synthesize(body.text, body.languageCode, body.voiceName, body.ssmlGender);
		return new Response(audio, { headers: { 'Content-Type': 'audio/mpeg' } });
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
