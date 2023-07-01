<script lang="ts">
	import { fade } from 'svelte/transition';
	import ReadingContainer from '$lib/components/reading/ReadingContainer.svelte';

	export let onFinish: () => void;
</script>

<div
	transition:fade
	class="absolute w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
>
	<ReadingContainer class="w-[60vw] h-[30vw]" {onFinish} />
</div>
