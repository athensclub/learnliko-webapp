// inspired from https://cptcrunchy.medium.com/how-to-build-a-voice-recorder-with-sveltekit-d331e3e94af6
import { writable, get } from "svelte/store";

let mediaRecorder: MediaRecorder;

let media: Blob[] = [];

/**
 * The current audio recording. 
 * The store will change to the new value every time a recording is finished.
 */
export const audioRecording = writable<null | { data: Blob, url: string }>(null);

export const isRecording = writable(false);

/**
 * Call this function once on app mount to initialize audio recording.
 */
export const initializeAudioRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => media.push(e.data);
    mediaRecorder.onstop = function () {
        const blob = new Blob(media, { 'type': 'audio/ogg; codecs=opus' });
        media = [];
        audioRecording.set({ data: blob, url: window.URL.createObjectURL(blob) });
    }
};

export const startRecording = () => {
    isRecording.set(true);
    mediaRecorder.start()
}

export const stopRecording = () => {
    isRecording.set(false);
    mediaRecorder.stop()
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