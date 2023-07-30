<script lang="ts">
	import type { Activity, ClozeCard } from '$gql/generated/graphql';
	import { fade } from 'svelte/transition';
	import ClozeFlipCard from '$lib/components/ClozeFlipCard.svelte';

	export let data: Activity;
	export let onFinish: () => void;

	const cards = data.cards as ClozeCard[];

	let currentIndex = 0;

	// keep track of current card
	$: currentCard = cards[currentIndex];
</script>

<div transition:fade class="flex justify-center mt-[3.8vh] items-center w-full">
	<ClozeFlipCard data={currentCard} class="h-[65.4vh] w-[88.46vw]" />
</div>
