<script lang="ts">
	import type { Narrative } from '$gql/generated/graphql';
	import type { LessonIntro } from '$lib/types/lesson';
	import { fade } from 'svelte/transition';

	export let setBackground: (image: string) => void;
	export let onFinish: () => void;
	export let items: Narrative[];

	let currentItem = 0;
	const nextItem = () => {
		if (currentItem + 1 >= items.length) {
			onFinish();
			return;
		}
		currentItem = currentItem + 1;
	};

	$: setBackground(items[currentItem].illustrationUrl);
</script>

<svelte:head>
	{#each items as item}
		<link rel="preload" as="image" href={item.illustrationUrl} />
	{/each}
</svelte:head>

<div
	transition:fade
	class="absolute bottom-0 left-0 flex flex-col items-center gap-[5vh] w-full py-[10vh] bg-gradient-to-b from-transparent via-black/60 to-black/80"
>
	<div class="text-white text-[1.5vw] max-w-[60%] text-center font-bold">
		{items[currentItem].text}
	</div>

	<button
		on:click={nextItem}
		class="text-white text-[1.3vw] font-bold border border-white rounded-full px-[3vw] py-[1vh]"
	>
		{currentItem === items.length - 1 ? 'เริ่ม' : 'ต่อไป'}
	</button>
</div>
