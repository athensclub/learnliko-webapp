import { SECRET_GOOGLE_SERVICE_ACCOUNT } from '$env/static/private';
import textToSpeech from '@google-cloud/text-to-speech';
import type { google } from '@google-cloud/text-to-speech/build/protos/protos';

const client = new textToSpeech.TextToSpeechClient({
	credentials: JSON.parse(SECRET_GOOGLE_SERVICE_ACCOUNT)
});

export const synthesize = async (
	text: string,
	languageCode: string,
	voiceName: string,
	ssmlGender:
		| 'SSML_VOICE_GENDER_UNSPECIFIED'
		| 'MALE'
		| 'FEMALE'
		| 'NEUTRAL'
		| google.cloud.texttospeech.v1.SsmlVoiceGender,
	speakingRate = 1
) => {
	try {
		const [response] = await client.synthesizeSpeech({
			input: { text: text },
			voice: { languageCode, ssmlGender, name: voiceName },
			audioConfig: { audioEncoding: 'MP3', speakingRate }
		});
		if (response.audioContent) {
			return response.audioContent;
		} else {
			throw new Error('Synthesize does not return any audio content (input text: ' + text + ')');
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
};
