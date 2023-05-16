import type { RequestHandler } from './$types';
import { transcribe } from '$lib/server/assemblyai/transcription';
import { error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const audioBlob = await request.blob();
	if (!audioBlob) throw error(400, `Error: No audio provided`);

	try {
		const id = await transcribe(audioBlob);
		return new Response(id);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
