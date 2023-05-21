import { getTranscript } from '$lib/server/assemblyai/transcription';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const id = params.id;
	if (!id) throw error(400, `Error: No transcript's id provided`);

	try {
		const text = await getTranscript(id);
		return new Response(text);
	} catch (e) {
		throw error(500, `Error: ${e}`);
	}
};
