import type { LessonProgress, User } from '$gql/generated/graphql';
import { auth, firestore } from '$lib/configs/firebase.config';
import type { PretestCEFRLevel } from '$lib/types/pretest';
import type { UserProfile } from '$lib/types/userProfile';
import {
	QueryConstraint,
	Timestamp,
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	setDoc,
	updateDoc,
	where
} from 'firebase/firestore/lite';
import { increaseActiveUser, updateTotalLearner } from '../analytic';

export const queryCurrentUserLessonRecap = async function () {
	const uid = _safeGetUID();
	const userRef = collection(firestore, `Users/${uid}/LessonRecaps`);
	const queryConst: QueryConstraint[] = [
		orderBy('latestUpdate', 'desc'),
		where('status', '==', 'COMPLETED')
	];

	const snapshot = await getDocs(query(userRef, ...queryConst));
	const recaps = snapshot.docs.map((doc) => {
		return { ...doc.data(), latestUpdate: doc.data().latestUpdate.toDate() } as LessonProgress;
	});
	return recaps;
};

export const createUserAccount = async function (data: UserProfile) {
	const uid = _safeGetUID();

	const userDocRef = doc(firestore, `Users/${uid}`);
	await setDoc(userDocRef, data);
};

export const getCurrentUserData = async function () {
	const uid = _safeGetUID();

	const userDocRef = doc(firestore, `Users/${uid}`);
	const userDoc = await getDoc(userDocRef);

	// return null if user doesn't exist/complete setup
	if (!userDoc.exists() || !userDoc.data().profile) return;

	return userDoc.data() as User;
};

// TODO: Implement GraphQL API instead
export const setupCurrentUserAccount = async function (
	level: PretestCEFRLevel,
	firstname: string,
	lastname: string
) {
	const uid = _safeGetUID();

	if (firstname.length < 1 || lastname.length < 1)
		throw new Error('No First name and lastname provided');

	const userDocRef = doc(firestore, `Users/${uid}`);
	await Promise.all([
		updateDoc(userDocRef, {
			'languageLevel.overall.level': level,
			'languageLevel.communication.level': level,
			'languageLevel.grammar.level': level,
			'languageLevel.vocabulary.level': level,
			profile: {
				firstname: firstname,
				lastname: lastname,
				fullname: `${firstname} ${lastname.at(0)}`
			}
		}),
		increaseActiveUser(),
		updateTotalLearner(level)
	]);
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
