import textToSpeech from '@google-cloud/text-to-speech';

const client = new textToSpeech.TextToSpeechClient();

export const synthesize = async (text: string) => {
    const [response] = await client.synthesizeSpeech({
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'OGG_OPUS' },
    });

    if (response.audioContent) {
        return new Blob([response.audioContent]);
    }else{
        throw new Error("Synthesize does not return any audio content (input text: " + text + ")");
    }
}