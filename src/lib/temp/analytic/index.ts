import { firestore } from '$lib/configs/firebase.config';
import type { PretestCEFRLevel } from '$lib/types/pretest';
import { doc, getDoc, increment, setDoc } from 'firebase/firestore/lite';

const _analyticCollection = 'Analytics';
const _level = ['PRE_A1', 'A1', 'A2', 'B1', 'B2'];

// Data Query
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
