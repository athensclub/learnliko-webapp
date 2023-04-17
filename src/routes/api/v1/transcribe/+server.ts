import type { RequestHandler } from './$types';
import { transcribe } from '$lib/server/assemblyai/transcription';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const audioBlob = await request.blob();
	if (!audioBlob) throw error(400, `Error: No audio provided`);

	try {
		const text = await transcribe(audioBlob);
		return new Response(text);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
