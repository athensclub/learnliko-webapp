import { writable, get } from 'svelte/store';

interface AccountInput {
	firstname?: string;
	lastname?: string;
}

const setupAccountInputStore = writable<AccountInput>({});

const setupAccountInput = {
	subscribe: setupAccountInputStore.subscribe,
	set: setupAccountInputStore.set,
	update: (data: AccountInput) => {
		setupAccountInputStore.set({ ...get(setupAccountInputStore), ...data });
	},
	value: () => get(setupAccountInputStore)
};

export default setupAccountInput;
