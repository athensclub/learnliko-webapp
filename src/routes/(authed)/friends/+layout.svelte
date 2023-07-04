<script lang="ts">
	import { resetFriendsSpaceData } from '$lib/global/friends';
	import { onMount } from 'svelte';

	// reset in layout.svelte so that it does not reset when going in sub route of /friends
	onMount(() => {
		resetFriendsSpaceData();
	});
</script>

<slot />
