import { Howl, Howler } from 'howler';

import Success from '$lib/audios/success_audio.wav'
import Fail from '$lib/audios/fail_audio.wav'

export type LearnlikoAudio = 'Success' | 'Fail';

const mapping: { [key: LearnlikoAudio]: string } = {
    Success, Fail
};

export const playAudio = (audio: LearnlikoAudio) => {
    const sound = new Howl({
        src: [mapping[audio]]
    });
    sound.play();
}

export const playAudioURL = (src: string) => {
    const sound = new Howl({
        src
    });
    sound.play();
}