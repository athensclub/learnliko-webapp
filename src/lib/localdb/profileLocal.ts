/**
 * Profile APIs implemented using IndexDB (For demo/testing only).
 */
import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { createIndexedDBStorage, persist } from '@macfja/svelte-persistent-store';

export const usernameLocal = browser
	? persist(writable<string>('Guest'), createIndexedDBStorage(), 'username')
	: null;

export const profileImageLocal = browser
	? persist(
			writable<string>(
				'https://media.discordapp.net/attachments/1120787872379842711/1142017279882690630/guestprofile.png?width=655&height=655'
			),
			createIndexedDBStorage(),
			'profileImage'
	  )
	: null;
