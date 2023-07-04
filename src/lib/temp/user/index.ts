import { graphql } from '$gql';
import type { LanguageLevel } from '$gql/graphql';
import { auth, firestore } from '$lib/configs/firebase.config';
import { graphqlClient } from '$lib/graphql';
import type { UserProfile } from '$lib/types/userProfile';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite';

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
	if (!userDoc.exists() || !userDoc.data().profile) return;

	return userDoc.data().profile as UserProfile;
};

// TODO: Implement GraphQL API instead
export const setupCurrentUserAccount = async function (
	level: LanguageLevel,
	firstname: string,
	lastname: string
) {
	const uid = _safeGetUID();

	if (firstname.length < 1 || lastname.length < 1)
		throw new Error('No First name and lastname provided');

	const userDocRef = doc(firestore, `Users/${uid}`);
	await updateDoc(userDocRef, {
		'languageLevel.overall.level': level,
		'languageLevel.communication.level': level,
		'languageLevel.grammar.level': level,
		'languageLevel.vocabulary.level': level,
		profile: {
			firstname: firstname,
			lastname: lastname,
			fullname: `${firstname} ${lastname.at(0)}`
		}
	});
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
