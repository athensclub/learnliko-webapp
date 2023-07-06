import type { LessonProgress, ProfileData, User } from '$gql/graphql';
import { firestore } from '$lib/configs/firebase.config';
import type { PretestCEFRLevel } from '$lib/types/pretest';
import {
	QueryConstraint,
	collection,
	collectionGroup,
	doc,
	getDoc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	setDoc,
	where
} from 'firebase/firestore/lite';

const _analyticCollection = 'Analytics';
const _level = ['PRE_A1', 'A1', 'A2', 'B1', 'B2'];
const _classroom = [{ id: 'classroom1', name: 'Classroom 1', total: 100 }];

// Data Query
export const queryLearnerLesson = async function () {
	const usersRef = collectionGroup(firestore, `LessonRecaps`);
	const queryConst: QueryConstraint[] = [
		orderBy('latestUpdate', 'desc'),
		where('status', '==', 'COMPLETED')
	];
	const snapshot = await getDocs(query(usersRef, ...queryConst));
	const recaps = snapshot.docs.map(
		(doc) => doc.data() as LessonProgress & { profile: ProfileData }
	);

	const promises: Promise<any>[] = [];
	for (let index = 0; index < recaps.length; index++) {
		const element = recaps[index];
		const userDocRef = doc(firestore, `Users/${element.ownerUid}`);
		promises.push(
			getDoc(userDocRef).then((doc) => (recaps[index].profile = doc.data() as ProfileData))
		);
	}
	await Promise.all(promises);

	return recaps;
};

export const queryClassroom = async function () {
	return _classroom;
};

export const queryLearnersByExp = async function (classroomScope?: string) {
	const usersRef = collection(firestore, `Users`);
	const queryConst: QueryConstraint[] = [orderBy('exp', 'desc'), limit(30)];
	if (classroomScope) {
		queryConst.push(where('classRoom.id', '==', classroomScope));
	}
	const snapshot = await getDocs(query(usersRef, ...queryConst));

	return snapshot.docs.map((doc) => doc.data() as User);
};

export const getActiveUsers = async function () {
	const docRef = doc(firestore, `${_analyticCollection}/dailyActiveUser`);
	const result = await getDoc(docRef);
	return result.data()?.total ?? 0;
};

export const getTotalLearner = async function () {
	const docRef = doc(firestore, `${_analyticCollection}/totalLearner`);
	const result = await getDoc(docRef);
	const totalLearner = result.data()?.totalLearner ?? 0;
	const totalLevel = result.data()?.totalLevel ?? 0;
	return {
		totalLearner: totalLearner,
		totalLevel: totalLevel,
		averageLevel: _level[Math.floor(totalLevel / totalLearner)]
	};
};

// Data Mutation
export const increaseActiveUser = async function () {
	const docRef = doc(firestore, `${_analyticCollection}/dailyActiveUser`);
	await setDoc(docRef, { total: increment(1) }, { merge: true });
};

export const updateTotalLearner = async function (level: PretestCEFRLevel) {
	const docRef = doc(firestore, `${_analyticCollection}/totalLearner`);
	await setDoc(
		docRef,
		{ totalLevel: increment(_level.indexOf(level)), totalLearner: increment(1) },
		{ merge: true }
	);
};
