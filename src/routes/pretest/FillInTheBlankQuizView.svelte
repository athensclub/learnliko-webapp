<script lang="ts">
	import type { FillInTheBlankMultipleChoicesQuestion } from '$lib/types/pretest';

	export let item: FillInTheBlankMultipleChoicesQuestion;
</script>

<div class="flex flex-col mx-auto mt-[4vh]">
	<div class="inline-block text-center text-[2vw] font-bold">
		{#each item.text as t, index (index)}
			{#if t}
				{t}
			{:else}
				<div
					class="inline-block align-bottom w-[4.5vw] h-[2.8vw] mx-[1vw] rounded-[1vw] border border-[#00000033] bg-white"
				/>
			{/if}
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-[4vw] mt-[10vh]">
		{#each item.choices as choice, index (index)}
			<button
				class={`min-w-[20vw] h-[5vw] flex-1 rounded-full border-[0.25vw] text-[1.7vw] border-[#6C80E8] hover:bg-[#6C80E8] hover:text-white bg-white text-black`}
			>
				{choice}
			</button>
		{/each}
	</div>
</div>
