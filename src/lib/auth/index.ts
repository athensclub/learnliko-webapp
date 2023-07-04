import { auth } from '$lib/configs/firebase.config';
import { authErrorCodeMapping } from '$lib/utils/authError';
import { signInAnonymously, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signInAnonymous = async function () {
	try {
		const result = await signInAnonymously(auth);
		return result;
	} catch (error) {
		throw new Error(authErrorCodeMapping((error as Error).message));
	}
};

export const signInWithUsername = async function (username: string, password: string) {
	try {
		const result = await signInWithEmailAndPassword(auth, `${username}@learnliko.demo`, password);
		return result;
	} catch (error) {
		throw new Error(authErrorCodeMapping((error as Error).message));
	}
};

export const signUserOut = async function () {
	await signOut(auth);
};
