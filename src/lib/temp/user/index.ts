import type { Course, User } from '$gql/generated/graphql';
import { auth, firestore } from '$lib/configs/firebase.config';
import type { PretestCEFRLevel } from '$lib/types/pretest';
import type { UserProfile } from '$lib/types/userProfile';
import {
	QueryConstraint,
	Timestamp,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	increment,
	orderBy,
	query,
	runTransaction,
	setDoc,
	updateDoc,
	where,
	writeBatch
} from 'firebase/firestore/lite';
import { increaseActiveUser, updateTotalLearner } from '../analytic';

/**
 * Query Data Section
 * ===============================
 */

export const queryCurrentUserLessonRecap = async function () {
	const uid = _safeGetUID();
	const userRef = collection(firestore, `Users/${uid}/LessonRecaps`);
	const queryConst: QueryConstraint[] = [
		orderBy('latestUpdate', 'desc'),
		where('status', '==', 'COMPLETED')
	];

	const snapshot = await getDocs(query(userRef, ...queryConst));
	const recaps = snapshot.docs.map((doc) => {
		return { ...doc.data(), latestUpdate: doc.data().latestUpdate.toDate() };
	});
	return recaps;
};

/**
 * Mutation Data Section
 * ===============================
 */

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
	if (!userDoc.exists()) return;

	return userDoc.data() as User;
};

export const createGuestProfile = async function () {
	const uid = _safeGetUID();

	const userDocRef = doc(firestore, `Users/${uid}`);
	const data = { uid, coin: 0, exp: 0, subjectProgress: [] };
	await setDoc(userDocRef, data);

	return data;
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
		increaseActiveUser()
	]);
};

/**
 * Increase `course`'s progression by 20% per function call
 * @param course
 */
export const increaseCourseProgress = async function (course: Course) {
	const uid = _safeGetUID();
	const userDocRef = doc(firestore, `Users/${uid}`);
	let currentProgress = 1;

	// Run transaction to mutate user's `subjectProgress` object
	await runTransaction(firestore, async (transaction) => {
		const userData = (await transaction.get(userDocRef)).data() as User;

		// Search for subject and course index in array of user's progress
		const subjectIndex = userData.subjectProgress.findIndex(
			(e) => e.subject.id === course.subject.id
		);
		if (subjectIndex > -1) {
			const courseIndex = userData.subjectProgress[subjectIndex].courseProgress.findIndex(
				(e) => e.course.id === course.id
			);
			if (courseIndex > -1) {
				// prevent over-increase of progress
				if (userData.subjectProgress[subjectIndex].courseProgress[courseIndex].progress >= 1)
					return;

				// increase progress by mutate `userData.subjectProgress`
				userData.subjectProgress[subjectIndex].courseProgress[courseIndex].progress += 0.2;

				currentProgress =
					userData.subjectProgress[subjectIndex].courseProgress[courseIndex].progress;
			} else {
				// if not found push to the back of array
				userData.subjectProgress[subjectIndex].courseProgress.push({
					course,
					progress: 0.2
				});

				currentProgress = 0.2;
			}
		} else {
			// if not found push new progress to the back of array
			userData.subjectProgress.push({
				subject: course.subject,
				courseProgress: [
					{
						course,
						progress: 0.2
					}
				]
			});

			currentProgress = 0.2;
		}

		transaction.update(userDocRef, 'subjectProgress', userData.subjectProgress);
	});

	return currentProgress;
};

/**
 * Increase provided currency
 * @param data
 */
export const increaseCurrency = async function (data: { coin?: number; exp?: number }) {
	const uid = _safeGetUID();
	const userDocRef = doc(firestore, `Users/${uid}`);

	await updateDoc(userDocRef, { coin: increment(data.coin ?? 0), exp: increment(data.exp ?? 0) });
};

/**
 * Utils Functions Section
 * ===============================
 */

const _safeGetUID = function () {
	// get user's id from [auth]
	const uid = auth.currentUser?.uid;

	// ensure user is already login
	if (!uid) {
		throw new Error('user have to login first');
	}

	return uid;
};
