import { graphql } from '$gql';
import { auth } from '$lib/configs/firebase.config';
import { graphqlClient } from '$lib/graphql';
import { authErrorCodeMapping } from '$lib/utils/authError';
import {
	signInAnonymously,
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword
} from 'firebase/auth';

const _usernameToEmail = (username: string) => `${username}@learnliko.demo`;

export const signInAnonymous = async function () {
	try {
		const result = await signInAnonymously(auth);
		return result;
	} catch (error) {
		throw new Error(authErrorCodeMapping((error as Error).message));
	}
};

export const signInWithUsername = async function (username: string, password: string) {
	try {
		const result = await signInWithEmailAndPassword(auth, _usernameToEmail(username), password);
		return result;
	} catch (error) {
		throw new Error(authErrorCodeMapping((error as Error).message));
	}
};

export const signUserOut = async function () {
	await signOut(auth);
};

// Create dummy account for demo purpose
export const _createAccount = async function (username: string) {
	const authResult = await createUserWithEmailAndPassword(
		auth,
		_usernameToEmail(username),
		'123456'
	);
	const mutation = graphql(`
		mutation Mutation($data: UserCreateDataInput!) {
			userCreate(data: $data) {
				uid
				username
				profile {
					imageUrl
					coverUrl
					fullname
					firstname
					lastname
				}
				languageLevel {
					overall {
						progress
						level
					}
					vocabulary {
						progress
						level
					}
					grammar {
						progress
						level
					}
					communication {
						progress
						level
					}
				}
				coin
				exp
				classRoom {
					id
					name
				}
			}
		}
	`);
	const mutationResult = await graphqlClient
		.mutation(mutation, {
			data: {
				classRoom: { id: 'classroom1', name: 'Classroom 1' },
				uid: authResult.user.uid,
				username: username
			}
		})
		.toPromise();

	console.log(mutationResult.data?.userCreate);
};
