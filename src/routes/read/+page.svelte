<script lang="ts">
	import jsonData from './readingdata.json';
	import read from '$lib/images/read.mp4';
	import ReadMore from '$lib/components/ReadMore.svelte';

	export let data: PageData;
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

	<div class="font-line-seed w-[24vw] fixed top-[10vh] left-[6vw] bg-white rounded-xl shadow-lg flex flex-col p-2" >
		<div class="font-line-seed font-bold text-2xl w-full text-center">Select Topic</div>
		
		<div class="flex flex-row flex-wrap w-full gap-2 mt-3">
			{#each data.topics as topic (topic)}
				<button class="rounded-3xl bg-[#EBEBEB] py-1 px-5 font-bold">{topic}</button>
			{/each}
		</div>
	</div>
		
	<ul>
		{#each jsonData as blog (blog.id)}
			<li class="mt-6 bg-white w-[28vw] mx-auto px-4 py-4 rounded-xl">
				<h2 class="text-xl font-bold mb-2">{blog.blogName}</h2>
				<p class="text-gray-600">Topic: {blog.topic}</p>
				<p class="text-gray-600">Date and Time: {blog.dateTime}</p>
				<img class="mt-2 rounded-lg mb-2" src={blog.image} alt="Blog Image" />
				<ReadMore textContent={blog.content} maxChars={120} />
			</li>
		{/each}
	</ul>

	<div class=" w-[23vw] h-[23vw] top-[24vh] fixed right-[8vw] bg-transparent rounded-xl border-black/20 border-dashed border-2" />
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
