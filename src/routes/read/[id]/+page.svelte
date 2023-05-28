<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import type { ReadingItem } from '$lib/types/reading';

	export let data: PageData;
	let item: ReadingItem = data.item;
</script>

<div class="w-full h-full min-h-[100vh] bg-white">
	<Header />
	<!-- top spacing -->
	<div class="w-full h-[100px]" />

	<div class="font-line-seed w-[24vw] fixed top-[23vh] left-[6vw] flex flex-col p-4">
		<h2 class="text-xl font-bold mb-2">{item.blogName}</h2>
		<p class="text-gray-600">Topic: {item.topic}</p>
		<p class="text-gray-600">Date and Time: {item.dateTime}</p>
		<img class="mt-2 rounded-lg mb-2" src={item.image} alt="Blog" />
	</div>

	<div class="font-bold w-[32vw] mx-auto px-4 py-4 rounded-xl whitespace-pre-wrap font-line-seed">
		{item.content}
	</div>

	<div
		class=" w-[28vw] h-[23vw] top-[24vh] bg-[#F6F6F6] fixed right-[3vw] rounded-xl font-line-seed text-lg font-bold p-3 flex flex-col"
	>
		Quiz

		{#each item.quiz as problem, index (index)}
			<div class="mt-5">
				{index + 1}. {problem.question}

				<div class="flex flex-row flex-wrap gap-5 mt-3">
					{#each problem.choices as choice, index (index)}
						<button class="bg-[#D9D9D9] border border-black py-1 px-3 rounded-xl">
							{String.fromCharCode(index + 'A'.charCodeAt(0))}. {choice}
						</button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
