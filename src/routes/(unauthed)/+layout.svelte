<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import userSession from '$lib/stores/userSession';
	import { onMount } from 'svelte';

	let loading = true;

	onMount(() => {
		// Subscribe on user's session
		userSession.subscribe((session) => {
			// ensure the initialization is completed
			if (!session.initialized) {
				loading = true;
				return;
			}

			// navigate to discover if user is logged in and has profile
			if (session.isLoggedIn && session.accountData?.profile) goto(`/discover`);

			loading = false;
		});
	});
</script>

{#if !loading}
	<slot />
{/if}
