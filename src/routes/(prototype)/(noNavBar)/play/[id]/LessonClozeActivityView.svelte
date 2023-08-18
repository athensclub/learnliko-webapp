<script lang="ts">
	import type { Activity, ClozeCard } from '$gql/generated/graphql';
	import { fade } from 'svelte/transition';
	import ClozeFlipCard from '$lib/components/card/ClozeFlipCard.svelte';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	/**
	 * Called when the height of shown component of this activity changes.
	 */
	export let updateHeight: (pixels: number) => {};
	let height = 0;
	$: updateHeight(height);

	export let data: Activity;
	const cards = data.cards as ClozeCard[];

	let currentIndex = 0;

	// keep track of current card
	$: currentCard = cards[currentIndex];

	const nextCard = function () {
		if (currentIndex + 1 === cards.length) {
			onFinish.call(undefined);
			return;
		}
		currentIndex = currentIndex + 1;
	};
</script>

{#key currentIndex}
	<div
		in:fade={{ delay: 250 }}
		out:fade
		class="mt-[3.8vh] flex w-full items-center justify-center"
		bind:clientHeight={height}
	>
		<ClozeFlipCard
			onCorrect={() => addProgress(1 / cards.length)}
			data={currentCard}
			onContinue={nextCard}
			class="h-[65.4vh] w-[88.46vw]"
		/>
	</div>
{/key}
