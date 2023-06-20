<script lang="ts">
	import type { ImageMatchingMultipleChoicesQuestion } from '$lib/types/pretest';

	export let item: ImageMatchingMultipleChoicesQuestion;
</script>

<div class="flex flex-row gap-[5vw] h-[60vh] mx-auto mt-[4vh]">
	<img class="h-full" src={item.image} alt="Quiz" />

	<div class="flex flex-col h-full gap-[4vh]">
		{#each item.choices as choice, index (index)}
			<button
				class={`min-w-[20vw] flex-1 rounded-full border-[0.25vw] text-[1.7vw] border-[#6C80E8] hover:bg-[#6C80E8] hover:text-white bg-white text-black`}
			>
				{choice}
			</button>
		{/each}
	</div>
</div>
