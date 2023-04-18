export const transcribe = async function (audio: Blob): Promise<string> {
	const response = await fetch('/api/v1/transcribe', {
		method: 'POST',
		body: audio
	});
	return response.text();
};
