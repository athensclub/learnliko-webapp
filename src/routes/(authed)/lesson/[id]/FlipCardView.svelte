<script lang="ts">
	import type { VocabularyCard } from '$gql/generated/graphql';
	import VocabFlipCard from '$lib/components/VocabFlipCard.svelte';
	import AnswerCorrectToast from '$lib/components/toasts/AnswerCorrectToast.svelte';
	import { toast } from '$lib/components/toasts/ToastManager.svelte';
	import { playAudio } from '$lib/global/audio';
	import { isMobile } from '$lib/global/breakpoints';
	import { shuffle } from '$lib/utils/array';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	export let items: VocabularyCard[];

	let count = 0;
	let displayed: (VocabularyCard & { hide?: boolean })[] = [];

	const updateIsMobile = () => {
		const targetCount = $isMobile ? 1 : 3;
		// pretty inefficient lol, but items < 100 anyway.
		if (displayed.length < targetCount) {
			while (items.length > 0 && displayed.length < targetCount) {
				let item = items[0];
				items = items.slice(1);
				displayed = [...displayed, item];
			}
		} else {
			while (displayed.length > targetCount) {
				let item = displayed[0];
				displayed = displayed.slice(1);
				items = [...items, item];
			}
			items = shuffle(items);
		}
	};
	// use $: instead of store.subscribe so svelte can handle cleanup stuff.
	$: $isMobile, updateIsMobile();

	onMount(() => {
		// save count in separate variable as items is going to be mutated.
		count = items.length;
		items = shuffle(items);
		// add item to displayed array for the first time
		updateIsMobile();
	});

	const finishItem = (index: number) => {
		setTimeout(() => {
			if (items.length > 0) {
				let item = items[0];
				items = items.slice(1);
				displayed[index] = item;
			} else {
				displayed[index] = { ...displayed[index], hide: true };
			}
		}, 5000);
		addProgress(1 / (4 * count));
	};

	const onCorrect = (index: number) => {
		finishItem(index);
		playAudio('Success');
		toast(AnswerCorrectToast, { exp: displayed[index].totalExp, coin: displayed[index].totalCoin });
	};
	const onWrong = (index: number) => {
		finishItem(index);
		playAudio('Fail');
	};

	// check for > 0 so that finish does not run before initialization
	$: if (displayed.length > 0 && displayed.every((i) => i.hide)) {
		setTimeout(() => {
			onFinish();
		}, 1000);
	}
</script>

<div
	transition:fade
	class="pointer-events-none absolute left-0 top-0 flex h-[100vh] w-full flex-row items-center justify-center gap-[5vw]"
>
	<!-- Multiple absolute position so that transition work without shifts  -->
	{#each displayed as item, index (item.id)}
		<div
			style="left: {$isMobile ? 50 : 50 + 4 * (index - 1)}vw; 
			transform: translate({$isMobile ? -50 : -50 + 100 * (index - 1)}%,0);"
			transition:fade
			class="absolute {$isMobile ?'h-[110vw] w-[75vw]':'h-[30vw] w-[22vw]'}"
		>
			<VocabFlipCard
				class="pointer-events-auto h-full w-full translate-x-0 {item.hide
					? 'opacity-0'
					: 'opacity-100'} transition-[opacity] duration-1000"
				onCorrect={() => onCorrect(index)}
				onWrong={() => onWrong(index)}
				{item}
			/>
		</div>
	{/each}
</div>
