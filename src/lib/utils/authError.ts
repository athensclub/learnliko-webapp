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

			// convert code to a human readable message (some messages can be found here: <https://firebase.google.com/docs/auth/admin/errors?hl=th>)
			switch (code) {
				case AuthErrorCodes.ARGUMENT_ERROR: {
					msg = textData['argumentError']['th'];
					break;
				}
				case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN: {
					msg = textData['loginAgain']['th'];
					break;
				}
				case AuthErrorCodes.INVALID_PASSWORD: {
					msg = textData['incorrectPassword']['th'];
					break;
				}
				case AuthErrorCodes.TOKEN_EXPIRED: {
					msg = textData['tokenExpired']['th'];
					break;
				}
				case AuthErrorCodes.USER_CANCELLED: {
					msg = textData['userCancelled']['th'];
					break;
				}
				case AuthErrorCodes.USER_DELETED: {
					msg = textData['userDeleted']['th'];
					break;
				}
				case AuthErrorCodes.USER_DISABLED: {
					msg = textData['userDisabled']['th'];
					break;
				}
				case AuthErrorCodes.USER_MISMATCH: {
					msg = textData['userMismatch']['th'];
					break;
				}
				case AuthErrorCodes.USER_SIGNED_OUT: {
					msg = textData['userSignedOut']['th'];
					break;
				}
				case AuthErrorCodes.WEAK_PASSWORD: {
					msg = textData['weakPassword']['th'];
					break;
				}
				case AuthErrorCodes.INVALID_EMAIL: {
					msg = textData['invalidEmail']['th'];
					break;
				}
				case AuthErrorCodes.INTERNAL_ERROR: {
					msg = textData['interalError']['th'];
					break;
				}
				case AuthErrorCodes.INVALID_API_KEY: {
					msg = textData['invalidApiKey']['th'];
					break;
				}
				case AuthErrorCodes.INVALID_APP_CREDENTIAL: {
					msg = textData['invalidAppCredential']['th'];
					break;
				}
				case AuthErrorCodes.INVALID_APP_ID: {
					msg = textData['invalidAppID']['th'];
					break;
				}
				case AuthErrorCodes.INVALID_AUTH: {
					msg = textData['invalidAuth']['th'];
					break;
				}
				case AuthErrorCodes.TIMEOUT: {
					msg = textData['timeout']['th'];
					break;
				}
				case AuthErrorCodes.UNVERIFIED_EMAIL: {
					msg = textData['unverifiedEmail']['th'];
					break;
				}
				case AuthErrorCodes.WEB_STORAGE_UNSUPPORTED: {
					msg = textData['webStorageUnsuppprted']['th'];
					break;
				}
				case AuthErrorCodes.ALREADY_INITIALIZED: {
					msg = textData['alreadyInitialized']['th'];
					break;
				}
				case 'auth/too-many-requests': {
					msg = textData['tooManyRequests']['th'];
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
