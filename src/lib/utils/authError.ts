import { AuthErrorCodes } from 'firebase/auth';
import textData from '$lib/global/language/auth_error_text_data.json';

/**
 * Mapping Firebase Auth error code to a readable string
 * @param error provide [message] property of [Error] object, e.g. `(e as Error).message`
 * @param debug default is [false]
 * @returns reable string
 */
export const authErrorCodeMapping = function (error: string, debug = false) {
	let msg: string | undefined = undefined;

	if (error) {
		// convert error to string in case it's not
		error = error.toString();

		// get firestore error code
		// e.x.: FirebaseError: Firebase: Error (auth/user-not-found).
		const idx: number = error.indexOf('Firebase: Error ('); // returns -1 when not found
		if (idx != -1) {
			const code: string = error.substring(idx + 17, error.indexOf(')', idx));
			if (debug) {
				console.debug(`getMessageFromCode >> code = ${code}`);
			}

			// convert code to a human readable message (some messages can be found here: <https://firebase.google.com/docs/auth/admin/errors?hl=en>)
			switch (code) {
				case AuthErrorCodes.ARGUMENT_ERROR: {
					msg = textData['argumentError']['en'];
					break;
				}
				case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
					msg = textData['loginAgain']['en'];
					break;
				}
				case AuthErrorCodes.INVALID_PASSWORD: {
					msg = textData['incorrectPassword']['en'];
					break;
				}
				case AuthErrorCodes.TOKEN_EXPIRED: {
					msg = textData['tokenExpired']['en'];
					break;
				}
				case AuthErrorCodes.USER_CANCELLED: {
					msg = textData['userCancelled']['en'];
					break;
				}
				case AuthErrorCodes.USER_DELETED: {
					msg = textData['userDeleted']['en'];
					break;
				}
				case AuthErrorCodes.USER_DISABLED: {
					msg = textData['userDisabled']['en'];
					break;
				}
				case AuthErrorCodes.USER_MISMATCH: {
					msg = textData['userMismatch']['en'];
					break;
				}
				case AuthErrorCodes.USER_SIGNED_OUT: {
					msg = textData['userSignedOut']['en'];
					break;
				}
				case AuthErrorCodes.WEAK_PASSWORD: {
					msg = textData['weakPassword']['en'];
					break;
				}
				case AuthErrorCodes.INVALID_EMAIL: {
					msg = textData['invalidEmail']['en'];
					break;
				}
				case AuthErrorCodes.INTERNAL_ERROR: {
					msg = textData['interalError']['en'];
					break;
				}
				case AuthErrorCodes.INVALID_API_KEY: {
					msg = textData['invalidApiKey']['en'];
					break;
				}
				case AuthErrorCodes.INVALID_APP_CREDENTIAL: {
					msg = textData['invalidAppCredential']['en'];
					break;
				}
				case AuthErrorCodes.INVALID_APP_ID: {
					msg = textData['invalidAppID']['en'];
					break;
				}
				case AuthErrorCodes.INVALID_AUTH: {
					msg = textData['invalidAuth']['en'];
					break;
				}
				case AuthErrorCodes.TIMEOUT: {
					msg = textData['timeout']['en'];
					break;
				}
				case AuthErrorCodes.UNVERIFIED_EMAIL: {
					msg = textData['unverifiedEmail']['en'];
					break;
				}
				case AuthErrorCodes.WEB_STORAGE_UNSUPPORTED: {
					msg = textData['webStorageUnsuppprted']['en'];
					break;
				}
				case AuthErrorCodes.ALREADY_INITIALIZED: {
					msg = textData['alreadyInitialized']['en'];
					break;
				}
				case 'auth/too-many-requests': {
					msg = textData['tooManyRequests']['en'];
					break;
				}
				default: {
					msg = `Unknown error: ${code}`;
					break;
				}
			}

			// log
			if (debug) {
				console.debug(`getMessageFromCode >> msg = ${msg}`);
			}
		}
	}

	return msg;
};
