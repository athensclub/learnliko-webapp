<script lang="ts">
	import type { ReadingItem } from '$lib/types/reading';
	import ReadMore from './ReadMore.svelte';

	export let item: ReadingItem;

	let clazz = '';
	export { clazz as class };
</script>

<!-- Specify the size(width, height) of the card in the user of the component, not in the component itself. -->
<a href="/read/{item.id}" class={`bg-white rounded-3xl flex flex-col overflow-hidden ${clazz}`}>
	<div
		style="background-image: url('{item.image}');"
		class="relative bg-cover bg-center w-full h-[50%]"
	>
		<div
			class="absolute top-[3vh] right-[2vw] w-fit text-white text-[1.3vw] rounded-full px-[1.5vw] py-[1vh] bg-[#0000009E]"
		>
			🧿 300 coin
		</div>
	</div>

	<div class="px-[2vw] py-[2vh] flex flex-col">
		<div class="font-bold text-[1.6vw]">{item.blogName}</div>
		<div class="text-[1.3vw] mt-[3vh]"><ReadMore textContent={item.content} maxChars={180} /></div>
	</div>
</a>
