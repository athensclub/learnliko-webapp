import axios from 'axios';
import { SECRET_ASSEMBLY_API_KEY } from '$env/static/private';

const assembly = axios.create({
	baseURL: 'https://api.assemblyai.com/v2',
	headers: {
		authorization: SECRET_ASSEMBLY_API_KEY
	}
});

/**
 * Upload audio file to assembly, and make transcribe request
 * @param audio
 * @returns id of transcription
 */
export const transcribe = async (audio: Blob): Promise<string> => {
	const url = (await assembly.post('/upload', audio)).data.upload_url;
	const id = (await assembly.post('/transcript', { audio_url: url })).data.id;
	return id;
};

/**
 * Get transcription result by id
 * @param id
 * @returns transcription result
 */
export const getTranscript = async function (id: string) {
	let res = null,
		text = '';
	try {
		res = (await assembly.get(`/transcript/${id}`)).data;
	} catch (e) {
		res = null;
	}

	if (!res) return;

	if (res.status === 'completed') {
		text = res.text;
	} else if (res.status === 'error') {
		throw new Error(
			'Something went wrong while trying to transcribe audio: ' + JSON.stringify(res)
		);
	}

	return text;
};
