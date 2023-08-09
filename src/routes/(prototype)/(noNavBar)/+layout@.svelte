<script lang="ts">
	import { onMount } from 'svelte';
	import userSession from '$lib/stores/userSession';
	import { goto } from '$app/navigation';

	onMount(() => {
		// Subscribe on user's session
		userSession.subscribe((session) => {
			// ensure the initialization is completed
			if (!session.initialized) {
				return;
			}

			// navigate to homepage if user is not logged in or not complete create account
			if (!session.isLoggedIn || !session.accountData?.uid) goto(`/`);
		});
	});
</script>

<!-- 
    Every page in this (noNavBar) group route will exclude navigation bar
    which is indicate by this file name (+layout@.svelte) `@` indicate to put the component in the root
    for more see https://kit.svelte.dev/docs/advanced-routing#advanced-layouts-layout
-->

<slot />
