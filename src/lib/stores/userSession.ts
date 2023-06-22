import { writable, get } from 'svelte/store';
import type firebase from 'firebase/auth';
import type { UserProfile } from '$lib/types/userProfile';

interface UserSessionData {
	initialized?: boolean;
	isLoggedIn?: boolean;
	authUser?: firebase.User | null;
	profile?: UserProfile | null;
}

const userSession = writable<UserSessionData>({
	initialized: false,
	isLoggedIn: false
});

export default {
	subscribe: userSession.subscribe,
	set: userSession.set,
	update: (data: UserSessionData) => {
		userSession.set({ ...get(userSession), ...data });
	},
	value: () => get(userSession)
};
