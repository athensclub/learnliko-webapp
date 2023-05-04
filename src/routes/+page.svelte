<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	if (browser) {
		goto('/play');
	}
</script>

<h1 class="text-purple-500 font-bold">Welcome to Learnliko</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
