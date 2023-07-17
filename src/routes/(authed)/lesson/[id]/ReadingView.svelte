<script lang="ts">
	import { fade } from 'svelte/transition';
	import ReadingContainer from '$lib/components/reading/ReadingContainer.svelte';
	import type { ReadingCard } from '$gql/generated/graphql';
	import { isMobile } from '$lib/global/breakpoints';

	export let item: ReadingCard;

	export let onFinish: () => void;
</script>

<div
	transition:fade
	class="pointer-events-none absolute flex h-full w-full items-center justify-center overflow-hidden"
>
	<ReadingContainer
		{item}
		class={$isMobile ? 'h-[67vh] w-[85vw]' : 'h-[30vw] w-[60vw]'}
		{onFinish}
	/>
</div>
