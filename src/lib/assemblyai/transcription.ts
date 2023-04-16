import axios from "axios";
import key from "./assemblyai_key.json";
import { setTimeout } from 'timers/promises';

const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: key.key,
    },
});

export const transcribe = async (audio: Blob): Promise<string> => {
    const url = (await assembly.post("/upload", audio)).data.upload_url;
    const id = (await assembly.post("/transcript", { audio_url: url })).data.id;

    let result = null;
    do {
        const res = (await assembly.get(`/transcript/${id}`)).data;
        if (res.status === 'completed') {
            result = res.text;
        } else if (res.status === 'error') {
            throw new Error('Something went wrong while trying to transcribe audio: ' + JSON.stringify(res));
        }
        await setTimeout(300);
    } while (result === null);
    return result;
}