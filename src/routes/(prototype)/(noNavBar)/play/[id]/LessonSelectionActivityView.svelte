<script lang="ts">
	import type { Activity, ActivityCard, SelectionCard } from '$gql/generated/graphql';
	import SelectionFlipCard from '$lib/components/card/SelectionFlipCard.svelte';
	import VocabFlipCard from '$lib/components/VocabFlipCard.svelte';
	import AnswerCorrectToast from '$lib/components/toasts/AnswerCorrectToast.svelte';
	import { toast } from '$lib/components/toasts/ToastManager.svelte';
	import { playAudio } from '$lib/global/audio';
	import { isMobile } from '$lib/global/breakpoints';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	/**
	 * (Optional) This function will get called when a list of selection cards
	 * in this option has changed (because user has played a card). Useful in
	 * section that uses selection quiz and want to keep track of remaining items.
	 */
	export let updateItems: (items: SelectionCard[]) => void = () => {};

	export let items: SelectionCard[];

	let initialized = false;

	// use queue hold undisplayed data (I do not want to update exported items variable directly)
	let queue = [...items];

	let count = 0;
	let displayed: (SelectionCard & { hide?: boolean })[] = [];

	const updateIsMobile = () => {
		// wait until intialization to complete before mutating arrays.
		if (!initialized) return;

		const targetCount = $isMobile ? 1 : 3;
		// pretty inefficient lol, but items < 100 anyway.
		if (displayed.length < targetCount) {
			while (queue.length > 0 && displayed.length < targetCount) {
				let item = queue[0];
				queue = queue.slice(1);
				displayed = [...displayed, item];
			}
		} else {
			while (displayed.length > targetCount) {
				let item = displayed[displayed.length - 1];
				displayed = displayed.slice(0, displayed.length - 1);
				queue = [item, ...queue];
			}
		}
	};
	// use $: instead of store.subscribe so svelte can handle cleanup stuff.
	$: $isMobile, initialized, updateIsMobile();

	onMount(() => {
		// save count in separate variable as queue is going to be mutated.
		count = queue.length;
		initialized = true;
		// add item to displayed array for the first time
		updateIsMobile();
	});

	const finishItem = (index: number) => {
		setTimeout(() => {
			if (queue.length > 0) {
				let item = queue[0];
				queue = queue.slice(1);
				displayed[index] = item;
			} else {
				displayed[index] = { ...displayed[index], hide: true };
			}

			updateItems([...displayed.filter((d) => !d.hide), ...queue]);
		}, 5000);
		addProgress(1 / count);
	};

	const onCorrect = (index: number) => {
		finishItem(index);
	};
	const onWrong = (index: number) => {
		finishItem(index);
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
	{#each displayed as item, index (item)}
		<div
			style="left: {$isMobile ? 50 : 50 + 4 * (index - 1)}vw; 
			transform: translate({$isMobile ? -50 : -50 + 100 * (index - 1)}%,0);"
			transition:fade
			class="absolute mt-[10vw] flex flex-col {$isMobile
				? 'h-[110vw] w-[75vw]'
				: 'h-[30vw] w-[22vw]'}"
		>
			<SelectionFlipCard
				class="pointer-events-auto h-full w-full translate-x-0 transition-[opacity] duration-1000 {item.hide
					? 'opacity-0'
					: 'opacity-100'}"
				data={item}
				onCorrect={() => onCorrect(index)}
				onWrong={() => onWrong(index)}
			/>

			<slot name="bottom" />
		</div>
	{/each}
</div>
