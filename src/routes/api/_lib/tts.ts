import type { SynthesizeRequestBody } from "$lib/types/requests/synthesize_request_body";

export type SynthesizeAccent = 'Australia' | 'India' | 'UK' | 'US' | 'TH';
export type SynthesizeGender = 'MALE' | 'FEMALE';

const modelsMapping = {
	'Australia': {
		'voiceName': {
			'MALE': 'en-AU-Standard-D',
			'FEMALE': 'en-AU-Standard-A'
		},
		'languageCode': 'en-AU'
	},
	'India': {
		'voiceName': {
			'MALE': 'en-IN-Standard-B',
			'FEMALE': 'en-IN-Standard-A'
		},
		'languageCode': 'en-IN'
	},
	'UK': {
		'voiceName': {
			'MALE': 'en-GB-Standard-B',
			'FEMALE': 'en-GB-Standard-C'
		},
		'languageCode': 'en-GB'
	},
	'US': {
		'voiceName': {
			'MALE': 'en-US-Standard-I',
			'FEMALE': 'en-US-Standard-G'
		},
		'languageCode': 'en-US'
	},
	'JP': {
		'voiceName': {
			'MALE': 'ja-JP-Standard-C',
			'FEMALE': 'ja-JP-Standard-B'
		},
		'languageCode': 'ja-JP'
	},
	'TH': {
		'voiceName': {
			'MALE': 'th-TH-Standard-A',
			'FEMALE': 'th-TH-Standard-A'
		},
		'languageCode': 'th-TH'
	},
	'CN': {
		'voiceName': {
			'MALE': 'yue-HK-Standard-C',
			'FEMALE': 'yue-HK-Standard-D'
		},
		'languageCode': 'yue-HK'
	},
	'DK': {
		'voiceName': {
			'MALE': 'da-DK-Standard-C',
			'FEMALE': 'da-DK-Standard-A'
		},
		'languageCode': 'da-DK'
	}
};

/**
 * Synthesize the given text to speech audio.
 * @param text the text to be synthesized.
 * @param accent the accent to be used for generating audio
 * @param gender the geneder to be used for generating audio
 * @returns an audio generated from transcribing the given text.
 */
export const synthesize = async function (text: string, accent: SynthesizeAccent, gender: SynthesizeGender, speakingRate = 1) {
	const body: SynthesizeRequestBody = {
		text,
		languageCode: modelsMapping[accent]['languageCode'],
		voiceName: modelsMapping[accent]['voiceName'][gender],
		ssmlGender: gender,
		speakingRate
	};

	const response = await fetch('/api/v1/synthesize', {
		method: 'POST',
		body: JSON.stringify(body)
	});

	return response.blob();
};

/**
 * Synthesize the given text to speech audio, automatically selecting accent, gender and speaking rate.
 * If the text contains Thai character, the accent will be Thai, otherwise the accent will be US.
 * The gender is always female. The speaking rate is always 0.7.
 * @param text the text to synthesize.
 * @returns an audio generated from transcribing the given text.
 */
export const synthesizeAuto = async (text: string) => {
	// https://stackoverflow.com/a/56285693
	const accent: SynthesizeAccent = /([\u0E00-\u0E7F]+)/.test(text) ? 'TH' : 'US';
	return await synthesize(text, accent, 'FEMALE', 0.7);
}