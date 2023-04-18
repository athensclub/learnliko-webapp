/**
 * Synthesize the given text to speech audio.
 * @param text the text to be synthesized .
 * @returns an audio generated from transcribing the given text.
 */
export const synthesize = async function (text: string) {
	const response = await fetch('/api/v1/synthesize', {
		method: 'POST',
		body: text
	});
	return response.blob();
};
