<script lang="ts">
	import jsonData from './readingdata.json';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import { getReadingItem } from '$api/reading';
	import type { ReadingItem } from '$lib/types/reading';
	import { browser } from '$app/environment';

	export let data: PageData;
	let selectedTopic = 0;
	let items: ReadingItem[] = [];

	const onSelectedTopicChanged = async () => {
		// avoid the first time when it is still in SSR
		if (!browser) return;
		items = await getReadingItem(data.topics[selectedTopic]);
	};

	$: selectedTopic, onSelectedTopicChanged();
</script>

<!-- <video
	autoplay
	muted
	loop
	id="myVideo"
	class=" brightness-120 blur-sm rotate-0 md:rotate-0 object-cover"
>
	<source src={read} type="video/mp4" />
</video> -->

<div class="w-full h-full bg-black/5">
	<h1 class="text-3xl font-bold pt-8 text-center">Dynamic Blog List</h1>

	<div
		class="font-line-seed w-[24vw] fixed top-[10vh] left-[6vw] bg-white rounded-xl shadow-lg flex flex-col p-4"
	>
		<div class="font-line-seed font-bold text-2xl w-full text-center">Select Topic</div>

		<div class="flex flex-row flex-wrap w-full gap-2 mt-6">
			{#each data.topics as topic, index (topic)}
				<button
					on:click={() => {
						selectedTopic = index;
						
					}}
					class={`rounded-3xl py-1 px-5 font-bold ${
						selectedTopic === index ? 'bg-black text-white' : 'bg-[#EBEBEB] text-black'
					}`}
				>
					{topic}
				</button>
			{/each}
		</div>
	</div>

	<ul>
		{#each items as blog (blog.id)}
			<li class="mt-6 bg-white w-[28vw] mx-auto px-4 py-4 rounded-xl">
				<h2 class="text-xl font-bold mb-2">{blog.blogName}</h2>
				<p class="text-gray-600">Topic: {blog.topic}</p>
				<p class="text-gray-600">Date and Time: {blog.dateTime}</p>
				<img class="mt-2 rounded-lg mb-2" src={blog.image} alt="Blog Image" />
				<ReadMore textContent={blog.content} maxChars={120} />
			</li>
		{/each}
	</ul>

	<div
		class=" w-[23vw] h-[23vw] top-[24vh] fixed right-[8vw] bg-transparent rounded-xl border-black/20 border-dashed border-2"
	/>
</div>

<style>
	#myVideo {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: -1;
	}
</style>
