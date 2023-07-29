<script lang="ts">
	import type { Narrative } from '$gql/generated/graphql';
	import { isMobile } from '$lib/global/breakpoints';
	import type { LessonIntro } from '$lib/types/lesson';
	import { fade } from 'svelte/transition';

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
</script>

<!-- <svelte:head>
	{#each items as item}
		<link rel="preload" as="image" href={item.illustrationUrl} />
	{/each}
</svelte:head> -->

{#key currentItem}
	<div
		transition:fade
		class="absolute bottom-0 left-0 flex w-full flex-col items-center bg-gradient-to-b from-transparent via-black/60 to-black/80 {$isMobile
			? 'gap-[3.5vh] py-[8vh]'
			: 'gap-[5vh] py-[10vh]'}"
	>
		<div
			class="text-center font-bold text-white {$isMobile
				? 'max-w-[80%] text-[4.5vw]'
				: 'max-w-[60%] text-[1.5vw]'}"
		>
			{items[currentItem].text}
		</div>

		<button
			on:click={nextItem}
			class="rounded-full border border-white font-bold text-white {$isMobile
				? 'px-[8vw] py-[0.6vh] text-[4.5vw]'
				: 'px-[3vw] py-[1vh] text-[1.3vw]'}"
		>
			{currentItem === items.length - 1 ? 'เริ่ม' : 'ต่อไป'}
		</button>
	</div>
{/key}
