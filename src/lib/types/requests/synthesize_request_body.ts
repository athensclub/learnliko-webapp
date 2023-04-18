import type { google } from "@google-cloud/text-to-speech/build/protos/protos";

export type SynthesizeRequestBody = {
    text: string;
    languageCode: string;
    voiceName: string;
    ssmlGender: "SSML_VOICE_GENDER_UNSPECIFIED" | "MALE" | "FEMALE" | "NEUTRAL" | google.cloud.texttospeech.v1.SsmlVoiceGender;
};