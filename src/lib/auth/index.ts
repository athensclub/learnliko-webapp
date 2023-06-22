import { auth } from '$lib/configs/firebase.config';
import { authErrorCodeMapping } from '$lib/utils/authError';
import { signInAnonymously } from 'firebase/auth';

export const SignInAnonymously = async function () {
	try {
		const result = await signInAnonymously(auth);
		return result;
	} catch (error) {
		throw new Error(authErrorCodeMapping((error as Error).message));
	}
};
