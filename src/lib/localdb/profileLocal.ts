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
				'https://cdn.discordapp.com/attachments/842737146321174558/1122773960019423262/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
			),
			createIndexedDBStorage(),
			'profileImage'
	  )
	: null;
