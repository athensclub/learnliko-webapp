import { writable, get } from 'svelte/store';
import type firebase from 'firebase/auth';
import type { User } from '$gql/generated/graphql';

interface UserSessionData {
	initialized?: boolean;
	isLoggedIn?: boolean;
	authUser?: firebase.User | null;
	accountData?: User | null;
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
