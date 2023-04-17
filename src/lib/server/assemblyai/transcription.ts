import axios from 'axios';
import { setTimeout } from 'timers/promises';
import { SECRET_ASSEMBLY_API_KEY } from '$env/static/private';

const assembly = axios.create({
	baseURL: 'https://api.assemblyai.com/v2',
	headers: {
		authorization: SECRET_ASSEMBLY_API_KEY
	}
});

export const transcribe = async (audio: Blob): Promise<string> => {
	const url = (await assembly.post('/upload', audio)).data.upload_url;
	const id = (await assembly.post('/transcript', { audio_url: url })).data.id;

	let result = null;
	do {
		const res = (await assembly.get(`/transcript/${id}`)).data;
		if (res.status === 'completed') {
			result = res.text;
		} else if (res.status === 'error') {
			throw new Error(
				'Something went wrong while trying to transcribe audio: ' + JSON.stringify(res)
			);
		}
		await setTimeout(300);
	} while (result === null);
	return result;
};
