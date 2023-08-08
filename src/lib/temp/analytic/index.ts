import type { LessonProgress, ProfileData, User } from '$gql/generated/graphql';
import { auth, firestore } from '$lib/configs/firebase.config';
import type { PretestCEFRLevel } from '$lib/types/pretest';
import {
	QueryConstraint,
	addDoc,
	collection,
	collectionGroup,
	doc,
	getDoc,
	getDocs,
	increment,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	where,
	writeBatch
} from 'firebase/firestore/lite';

const _analyticCollection = 'Analytics';
const _level = ['PRE_A1', 'A1', 'A2', 'B1', 'B2'];
const _classroom = [{ id: 'classroom1', name: 'Classroom 1' }];

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

export const addLessonSession = async function (
	timeSpentSeconds: number,
	completed: boolean,
	progress: number,
	lesson: string
) {
	const uid = auth.currentUser?.uid ?? '';
	const batch = writeBatch(firestore);

	const sessionDocRef = doc(collection(firestore, `${_analyticCollection}/lessonSession/sessions`));
	const totalDocRef = doc(firestore, `${_analyticCollection}/lessonSession`);
	batch.set(sessionDocRef, {
		uid,
		completed,
		lesson,
		progress,
		timeSpent: timeSpentSeconds,
		timestamp: serverTimestamp()
	});
	batch.update(totalDocRef, {
		totalSession: increment(1),
		totalTimespent: increment(timeSpentSeconds)
	});

	await batch.commit();
};

export const addChatHistory = async function (user: string, bot: string, botName: string) {
	const uid = auth.currentUser?.uid ?? '';
	const historyCollection = collection(firestore, `${_analyticCollection}/chatHistory/history`);
	await addDoc(historyCollection, {
		uid,
		botName,
		chat: { user, bot },
		timestamp: serverTimestamp()
	});
};

export const addDailyUser = async function () {
	const uid = auth.currentUser?.uid ?? '';
	const logDocRef = doc(collection(firestore, `${_analyticCollection}/dailyActiveUser/logs`));
	const totalDocRef = doc(firestore, `${_analyticCollection}/dailyActiveUser`);

	const batch = writeBatch(firestore);

	batch.set(logDocRef, {
		uid,
		timestamp: serverTimestamp()
	});
	batch.update(totalDocRef, {
		total: increment(1)
	});

	await batch.commit();
};
