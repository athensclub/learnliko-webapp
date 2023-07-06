<script lang="ts">
	import type { SentenceCard } from '$gql/generated/graphql';
	import WritingCard from '$lib/components/WritingCard.svelte';
	import AnswerCorrectToast from '$lib/components/toasts/AnswerCorrectToast.svelte';
	import { toast } from '$lib/components/toasts/ToastManager.svelte';
	import { playAudio } from '$lib/global/audio';
	import type { WritingCardItem } from '$lib/types/writing_card';
	import { fade } from 'svelte/transition';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	export let items: (SentenceCard & { hide?: boolean })[];

	const onCorrect = (index: number) => {
		setTimeout(() => (items[index] = { ...items[index], hide: true }), 5000);

		playAudio('Success');

		// TODO: add the actual amount.
		addProgress(1 / 12);

		toast(AnswerCorrectToast, { exp: items[index].totalExp, coin: items[index].totalCoin });
	};
	const onWrong = (index: number) => {
		setTimeout(() => (items[index] = { ...items[index], hide: true }), 5000);

		playAudio('Fail');
	};

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
		<WritingCard
			onCorrect={() => onCorrect(index)}
			onWrong={() => onWrong(index)}
			class="pointer-events-auto h-[30vw] w-[22vw] {item.hide
				? 'opacity-0'
				: 'opacity-100'} transition-[opacity] duration-1000"
			{item}
		/>
	{/each}
</div>
