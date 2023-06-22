import { writable, get } from 'svelte/store';
import type firebase from 'firebase/auth';
import type { UserProfile } from '$lib/types/userProfile';

interface UserSessionData {
	initialized?: boolean;
	isLoggedIn?: boolean;
	authUser?: firebase.User | null;
	profile?: UserProfile | null;
}

const userSessionStore = writable<UserSessionData>({
	initialized: false,
	isLoggedIn: false
});

const userSession = {
	subscribe: userSessionStore.subscribe,
	set: userSessionStore.set,
	update: (data: UserSessionData) => {
		userSessionStore.set({ ...get(userSessionStore), ...data });
	},
	value: () => get(userSessionStore)
};

export default userSession;
