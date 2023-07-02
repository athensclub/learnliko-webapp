<script lang="ts">
	import VocabFlipCard from '$lib/components/VocabFlipCard.svelte';
	import AnswerCorrectToast from '$lib/components/toasts/AnswerCorrectToast.svelte';
	import { toast } from '$lib/components/toasts/ToastManager.svelte';
	import { playAudio } from '$lib/global/audio';
	import { fade } from 'svelte/transition';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	let items: { image: string; choices: string[]; coin: number; exp: number; hide?: boolean }[] = [
		{
			image:
				'https://cdn.discordapp.com/attachments/842737146321174558/1123927173087109120/image.png',
			choices: ['A dog', 'A cat', 'An ant', 'An elephant'],
			coin: 100,
			exp: 25
		},
		{
			image:
				'https://cdn.discordapp.com/attachments/842737146321174558/1123927173087109120/image.png',
			choices: ['A dog', 'A cat', 'An ant', 'An elephant'],
			coin: 100,
			exp: 25
		},
		{
			image:
				'https://cdn.discordapp.com/attachments/842737146321174558/1123927173087109120/image.png',
			choices: ['A dog', 'A cat', 'An ant', 'An elephant'],
			coin: 100,
			exp: 25
		}
	];

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
