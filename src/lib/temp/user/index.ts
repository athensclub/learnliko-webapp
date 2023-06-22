import { auth, firestore } from '$lib/configs/firebase.config';
import type { UserProfile } from '$lib/types/userProfile';
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';

export const createUserAccount = async function (data: UserProfile) {
	const uid = _safeGetUID();

	const userDocRef = doc(firestore, `Users/${uid}`);
	await setDoc(userDocRef, data);
};

export const getCurrentUserProfile = async function () {
	const uid = _safeGetUID();

	const userDocRef = doc(firestore, `Users/${uid}`);
	const userDoc = await getDoc(userDocRef);

	// return null if user doesn't exist/complete setup
	if (!userDoc.exists()) return;

	return userDoc.data() as UserProfile;
};

const _safeGetUID = function () {
	// get user's id from [auth]
	const uid = auth.currentUser?.uid;

	// ensure user is already login
	if (!uid) {
		throw new Error('user have to login first');
	}

	return uid;
};
