<script lang="ts">
	import { isMobile } from '$lib/global/breakpoints';
	import type { ImageMatchingMultipleChoicesQuestion } from '$lib/types/pretest';

	export let item: ImageMatchingMultipleChoicesQuestion;
	export let submit: (quiz: ImageMatchingMultipleChoicesQuestion, index: number) => void;
</script>

<div
	class={`flex gap-[5vw] h-[60vh] mx-auto ${
		$isMobile ? 'flex-col mt-[2vh] w-[90vw]' : 'mt-[4vh] flex-row'
	}`}
>
	<img class={`object-contain ${$isMobile ? 'w-full' : 'h-full'}`} src={item.image} alt="Quiz" />

	<div class={`${$isMobile ? 'grid grid-cols-2 gap-[5vw]' : 'flex flex-col h-full gap-[4vh]'}`}>
		{#each item.choices as choice, index (index)}
			<button
				on:click={() => submit(item, index)}
				class={`rounded-full border-[0.25vw] border-[#6C80E8] hover:bg-[#6C80E8] hover:text-white bg-white text-black ${
					$isMobile ? 'w-full min-h-[15vw] text-[5vw]' : 'min-w-[20vw] flex-1 text-[1.7vw]'
				}`}
			>
				{choice}
			</button>
		{/each}
	</div>
</div>
