/**
 * Transcribe the given audio source to text.
 * @param audio the audio source
 * @returns the text transcribed from the audio.
 */
export const transcribe = async function (audio: Blob): Promise<string> {
	let returnedData = '',
		transcriptId = '';
	let attempt = 0;

	while (true) {
		try {
			const response = await fetch('/api/v1/transcribe', {
				method: 'POST',
				body: audio
			});

			transcriptId = await response.text();
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			console.error('error: uploading audio to assembly, retring...');
		}
	}

	if (!transcriptId) throw new Error('Cannot upload audio to assembly');

	attempt = 0;
	while (true) {
		try {
			let response = null;

			// TODO: Implement limit attempt to prevent infinit loop
			while (true) {
				const _res = await fetch(`/api/v1/transcribe/${transcriptId}`, {
					method: 'GET'
				});
				response = await _res.text();

				if (response) break;

				await new Promise((resolve) => setTimeout(resolve, 3000));
			}

			returnedData = response;
			break;
		} catch (error) {
			// max attempt at 5
			if (attempt++ >= 5) break;

			console.error('error: getting transcript audio, retring...');
		}
	}

	return returnedData;
};
