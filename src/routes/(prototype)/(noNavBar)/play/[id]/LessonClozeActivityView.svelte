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

<div transition:fade class="mt-[3.8vh] flex w-full items-center justify-center">
	<ClozeFlipCard
		data={currentCard}
		onContinue={() => console.log('go go go')}
		class="h-[65.4vh] w-[88.46vw]"
	/>
</div>
