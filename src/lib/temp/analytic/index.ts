import { firestore } from '$lib/configs/firebase.config';
import type { PretestCEFRLevel } from '$lib/types/pretest';
import { doc, increment, setDoc } from 'firebase/firestore/lite';

const _analyticCollection = 'Analytics';

// Data Query


// Data Mutation
export const increaseActiveUser = async function () {
	const docRef = doc(firestore, `${_analyticCollection}/dailyActiveUser`);
	await setDoc(docRef, { total: increment(1) }, { merge: true });
};

export const updateTotalLearner = async function (level: PretestCEFRLevel) {
	const _level = ['PRE_A1', 'A1', 'A2', 'B1', 'B2'];
	const docRef = doc(firestore, `${_analyticCollection}/totalLearner`);
	await setDoc(
		docRef,
		{ totalLevel: increment(_level.indexOf(level)), totalLearner: increment(1) },
		{ merge: true }
	);
};

