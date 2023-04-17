import type { SvelteComponent } from "svelte";
import { bind } from 'svelte-simple-modal';
import { writable } from "svelte/store";

/**
 * This variable is mainly for the main layout.svelte file.
 * You probably don't need to use this variable outside and should use
 * other function inside this file instead.
 */
export const modal = writable<null | typeof SvelteComponent>(null);

/**
 * Display a modal with the given component as root and passing the props to the component.
 * @param component the root of the modal to show.
 * @param props props to pass to the component.
 */
export const showModal = (component: typeof SvelteComponent, props: Record<string, any>) => {
    modal.set(bind(component, props));
}

/**
 * Close the currently showing modal.
 */
export const closeModal = () => {
    modal.set(null);
}