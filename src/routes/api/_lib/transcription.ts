/**
 * Transcribe the given audio source to text.
 * @param audio the audio source
 * @returns the text transcribed from the audio.
 */
export const transcribe = async function (audio: Blob): Promise<string> {
	const response = await fetch('/api/v1/transcribe', {
		method: 'POST',
		body: audio
	});
	return response.text();
};
