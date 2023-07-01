<script lang="ts">
	import VocabFlipCard from '$lib/components/VocabFlipCard.svelte';
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
		// TODO: add the actual amount.
		addProgress(1 / 12);
	};
	const onWrong = (index: number) => {
		setTimeout(() => (items[index] = { ...items[index], hide: true }), 5000);
	};

	// TODO: Check for actual finish.
	$: if (items.every((i) => i.hide)) {
		setTimeout(() => {
			onFinish();
		}, 1000);
	}
</script>

<div transition:fade class="absolute top-0 left-0 w-full h-[100vh] flex flex-row gap-[5vw] items-center justify-center pointer-events-none">
	{#each items as item, index}
		<VocabFlipCard
			class="w-[22vw] h-[30vw] pointer-events-auto {item.hide
				? 'opacity-0'
				: 'opacity-100'} transition-[opacity] duration-1000"
			onCorrect={() => onCorrect(index)}
			onWrong={() => onWrong(index)}
			{item}
		/>
	{/each}
</div>
