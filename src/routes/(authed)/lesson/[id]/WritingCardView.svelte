<script lang="ts">
	import type { SentenceCard } from '$gql/graphql';
	import WritingCard from '$lib/components/WritingCard.svelte';
	import AnswerCorrectToast from '$lib/components/toasts/AnswerCorrectToast.svelte';
	import { toast } from '$lib/components/toasts/ToastManager.svelte';
	import { playAudio } from '$lib/global/audio';
	import type { WritingCardItem } from '$lib/types/writing_card';
	import { fade } from 'svelte/transition';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	export let items: (SentenceCard & {hide?: boolean})[];

	const onCorrect = (index: number) => {
		setTimeout(() => (items[index] = { ...items[index], hide: true }), 5000);

		playAudio('Success');
		
		// TODO: add the actual amount.
		addProgress(1 / 12);
		
		// TODO: display actual amount.
		toast(AnswerCorrectToast, { exp: 25, coin: 100 });
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
	class="absolute top-0 left-0 w-full h-[100vh] flex flex-row gap-[5vw] items-center justify-center pointer-events-none"
>
	{#each items as item, index}
		<WritingCard
			onCorrect={() => onCorrect(index)}
			onWrong={() => onWrong(index)}
			class="w-[22vw] h-[30vw] pointer-events-auto {item.hide
				? 'opacity-0'
				: 'opacity-100'} transition-[opacity] duration-1000"
			{item}
		/>
	{/each}
</div>
