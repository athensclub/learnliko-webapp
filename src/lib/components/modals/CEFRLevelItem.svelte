<script lang="ts">
	import type { LanguageLevel } from '$gql/generated/graphqll';
	import { orderedCEFR } from '$lib/utils/cefr';

	export let title: string;
	export let level: LanguageLevel;
	export let textScale = 1;
</script>

<div class="w-full bg-white flex flex-col rounded-[2vw] px-[2vw] py-[1.5vh] font-bold">
	<div class="flex flex-row items-start justify-between">
		<div style="font-size: {textScale * 1.35}vw;">{title}</div>
		<div style="font-size: {textScale * 1.8}vw;">{level}</div>
	</div>

	<div class="mt-[2vw] w-full h-[1.1vw] bg-[#0000001A] rounded-full overflow-hidden">
		<div
			style="width: {(orderedCEFR.indexOf(level) / (orderedCEFR.length - 1)) * 100}%;"
			class="h-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
		/>
	</div>

	<div class="flex flex-row w-full justify-between mt-[0.5vw]">
		{#each orderedCEFR as cefr (cefr)}
			<div class="relative right-[1.2vw] text-[0.85vw]">{cefr}</div>
		{/each}
	</div>
</div>
