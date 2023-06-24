<script lang="ts">
	import { beforeNavigate, goto } from '$app/navigation';
	import EnteringConversation from '$lib/components/loading/EnteringConversation.svelte';
	import userSession from '$lib/stores/userSession';
	import { onMount } from 'svelte';

	let loading = true;

	let enteringConversation = false;

	beforeNavigate(({ to }) => {
		if (to?.url.pathname === '/conversation/play') {
			enteringConversation = true;
		}
	});

	onMount(() => {
		// Subscribe on user's session
		userSession.subscribe((session) => {
			// ensure the initialization is completed
			if (!session.initialized) {
				loading = true;
				return;
			}

			// navigate to homepage if user is not logged in
			if (!session.isLoggedIn) goto(`/`);

			loading = false;
		});
	});
</script>

{#if !loading}
	{#if enteringConversation}
		<EnteringConversation onFinish={() => (enteringConversation = false)} />
	{:else}
		<slot />
	{/if}
{/if}
