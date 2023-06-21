<script lang="ts">
	import { isMobile } from '$lib/global/breakpoints';
	import type { FillInTheBlankMultipleChoicesQuestion } from '$lib/types/pretest';

	export let item: FillInTheBlankMultipleChoicesQuestion;
	export let submit: (quiz: FillInTheBlankMultipleChoicesQuestion, index: number) => void;
</script>

<div class={`flex flex-col mx-auto ${$isMobile ? 'mt-[6vh]' : 'mt-[4vh]'}`}>
	<div
		class={`inline-block max-w-[90vw] text-center font-bold ${
			$isMobile ? 'text-[6.5vw]' : 'text-[2vw]'
		}`}
	>
		{#each item.text as t, index (index)}
			{#if t}
				<div class="inline-block mx-[0.7vw]">
					{t}
				</div>
			{:else}
				<div
					class={`inline-block align-bottom rounded-[1vw] border border-[#00000033] bg-white ${
						$isMobile ? 'w-[10vw] h-[9vw] mx-[3vw]' : 'w-[4.5vw] h-[2.8vw] mx-[1vw]'
					}`}
				/>
			{/if}
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-[4vw] mt-[10vh]">
		{#each item.choices as choice, index (index)}
			<button
				on:click={() => submit(item, index)}
				class={`w-full rounded-full border-[0.25vw] border-[#6C80E8] hover:bg-[#6C80E8] hover:text-white bg-white text-black ${
					$isMobile ? 'min-h-[13vw] text-[5vw]' : 'min-h-[5vw] text-[1.7vw]'
				}`}
			>
				{choice}
			</button>
		{/each}
	</div>
</div>
