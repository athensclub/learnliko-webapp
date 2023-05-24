// inspired from https://cptcrunchy.medium.com/how-to-build-a-voice-recorder-with-sveltekit-d331e3e94af6
import { blobToBase64 } from "$lib/utils/io";
import { writable, get } from "svelte/store";

let mediaRecorder: MediaRecorder;

let media: Blob[] = [];

/**
 * when user is still recording, but closes the chatbox anyway, we will stop recording,
 * but we has to wait for mediaRecorder onstop to stop and we would need variable
 * to mark when user has already stopped using chatbox to ignore incoming data
 * when value comes from mediaRecorder.
 */
let resetting = false;

/**
 * The current audio recording. 
 * The store will change to the new value every time a recording is finished.
 */
export const audioRecording = writable<null | { data: Blob, url: string }>(null);

/**
 * Whether the browser is recording audio or not.
 */
export const isRecording = writable(false);

/**
 * Call this function once on app mount to initialize audio recording.
 */
export const initializeAudioRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => media.push(e.data);
    mediaRecorder.onstop = async function () {
        if (resetting) {
            media = [];
            return;
        }
        const blob = new Blob(media, { 'type': 'audio/ogg; codecs=opus' });
        const url = await blobToBase64(blob);
        media = [];
        audioRecording.set({ data: blob, url });
    }
};

/**
 * Reset all the current recording data to prepare for new recording.
 */
export const resetRecordingData = () => {
    media = [];
    resetting = true;
    stopRecording();
    audioRecording.set(null);
}

export const startRecording = () => {
    if (get(isRecording))
        return;
    resetting = false;
    isRecording.set(true);
    mediaRecorder.start();
}

export const stopRecording = () => {
    if (!get(isRecording))
        return;
    isRecording.set(false);
    mediaRecorder.stop();
}

/**
 * Start the recording if it is currently stop, and stop the recording is it is currently recording.
 */
export const toggleRecording = () => {
    if (get(isRecording)) {
        stopRecording();
    } else {
        startRecording();
    }
}