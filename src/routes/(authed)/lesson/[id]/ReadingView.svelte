<script lang="ts">
	import { fade } from 'svelte/transition';
	import ReadingContainer from '$lib/components/reading/ReadingContainer.svelte';
	import type { ReadingCard } from '$gql/generated/graphqll';

	export let item: ReadingCard;

	export let onFinish: () => void;
</script>

<div
	transition:fade
	class="pointer-events-none absolute flex h-full w-full items-center justify-center overflow-hidden"
>
	<ReadingContainer {item} class="h-[30vw] w-[60vw]" {onFinish} />
</div>
