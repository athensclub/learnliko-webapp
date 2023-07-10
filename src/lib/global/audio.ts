import { Howl, Howler } from 'howler';

import Success from '$lib/audios/success_audio.wav'
import Fail from '$lib/audios/fail_audio.wav'

export type LearnlikoAudio = 'Success' | 'Fail';

const mapping = {
    Success, Fail
};

export const playAudio = (audio: LearnlikoAudio): Howl => {
    return playAudioURL(mapping[audio]);
}

export const playAudioURL = (src: string): Howl => {
    const sound = new Howl({
        src
    });
    sound.play();
    return sound;
}