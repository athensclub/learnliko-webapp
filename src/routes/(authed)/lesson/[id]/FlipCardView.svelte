<script lang="ts">
	import type { VocabularyCard } from '$gql/generated/graphql';
	import VocabFlipCard from '$lib/components/VocabFlipCard.svelte';
	import AnswerCorrectToast from '$lib/components/toasts/AnswerCorrectToast.svelte';
	import { toast } from '$lib/components/toasts/ToastManager.svelte';
	import { playAudio } from '$lib/global/audio';
	import type { FlipCardItem } from '$lib/types/flip_card';
	import { fade } from 'svelte/transition';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	export let items: (VocabularyCard & {hide?: boolean})[];

	const onCorrect = (index: number) => {
		setTimeout(() => (items[index] = { ...items[index], hide: true }), 5000);

		playAudio('Success');

		// TODO: add the actual amount.
		addProgress(1 / 12);

		toast(AnswerCorrectToast, { exp: items[index].totalExp, coin: items[index].totalCoin });
	};
	const onWrong = (index: number) => {
		setTimeout(() => (items[index] = { ...items[index], hide: true }), 5000);

		// TODO: add the actual amount.
		addProgress(1 / 12);

		playAudio('Fail');
	};

	console.log(items)

	// TODO: Check for actual finish.
	$: if (items.every((i) => i.hide)) {
		setTimeout(() => {
			onFinish();
		}, 1000);
	}
</script>

<div
	transition:fade
	class="pointer-events-none absolute left-0 top-0 flex h-[100vh] w-full flex-row items-center justify-center gap-[5vw]"
>
	{#each items as item, index}
		<VocabFlipCard
			class="pointer-events-auto h-[30vw] w-[22vw] {item.hide
				? 'opacity-0'
				: 'opacity-100'} transition-[opacity] duration-1000"
			onCorrect={() => onCorrect(index)}
			onWrong={() => onWrong(index)}
			{item}
		/>
	{/each}
</div>
