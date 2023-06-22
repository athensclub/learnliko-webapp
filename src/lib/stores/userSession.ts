import { writable, get } from 'svelte/store';
import type firebase from 'firebase/auth';

const userSession = writable<{
	initialized?: boolean;
	isLoggedIn?: boolean;
	authUser?: firebase.User | null;
}>({
	initialized: false,
	isLoggedIn: false,
});

export default {
	subscribe: userSession.subscribe,
	set: userSession.set,
	value: () => get(userSession)
};
