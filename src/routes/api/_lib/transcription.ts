/**
 * Transcribe the given audio source to text.
 * @param audio the audio source
 * @returns the text transcribed from the audio.
 */
export const transcribe = async function (audio: Blob): Promise<string> {
	let returnedData = '';

	let attempt = 0;
	while (true) {
		try {
			const response = await fetch('/api/v1/transcribe', {
				method: 'POST',
				body: audio
			});

			returnedData = await response.text();
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			console.error('error: transcribe audio, retring...');
		}
	}

	return returnedData;
};
