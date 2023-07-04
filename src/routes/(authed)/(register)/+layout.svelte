<script lang="ts">
	import { goto } from '$app/navigation';
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

			// navigate to homepage if user is already completed setup
			if (session.accountData?.profile) goto(`/`);

			loading = false;
		});
	});
</script>

{#if !loading}
	<slot />
{/if}
