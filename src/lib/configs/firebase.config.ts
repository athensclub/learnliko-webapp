import { isOnProduction } from '$lib/utils/environment';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const _firebaseConfig = {
	development: {
		apiKey: 'AIzaSyDJftypswtY8WWtv6Eq7INGMqYG2vkNqAo',
		authDomain: 'learnliko-develop.firebaseapp.com',
		projectId: 'learnliko-develop',
		storageBucket: 'learnliko-develop.appspot.com',
		messagingSenderId: '697908106019',
		appId: '1:697908106019:web:e51dc9d63148a746f2b296',
		measurementId: 'G-3C9KNG9V8P'
	},
	production: {
		apiKey: 'AIzaSyDb68B0U7Qlw-EjgpfntVnmGIDLZnvVFSc',
		authDomain: 'learnliko-fe12e.firebaseapp.com',
		projectId: 'learnliko-fe12e',
		storageBucket: 'learnliko-fe12e.appspot.com',
		messagingSenderId: '738118435759',
		appId: '1:738118435759:web:87c6fd80d56461be2f655a',
		measurementId: 'G-2PWSB5KDSP'
	}
};

const _envSelector = function (target: { development: any; production: any }) {
	return isOnProduction() ? target.production : target.development;
};

// initialize firebase instance
const _app = initializeApp(_envSelector(_firebaseConfig));

// initialize database instance
const firestore = getFirestore(_app);

// initialize auth instance
const auth = getAuth(_app);

export { auth, firestore };
