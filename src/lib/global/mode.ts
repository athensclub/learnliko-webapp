import type { Mode } from "$lib/types/mode";
import { writable } from "svelte/store";

export const currentMode = writable<Mode>("Professional");