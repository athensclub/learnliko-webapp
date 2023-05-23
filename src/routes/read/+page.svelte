<script>
	import jsonData from './readingdata.json';
	import read from '$lib/images/read.mp4';
	import ReadMore from '$lib/components/ReadMore.svelte';
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
	<div class=" w-[16vw] h-[35vw] top-[10vh] fixed left-[8vw] bg-white rounded-xl shadow-lg" />

	<h1 class="text-3xl font-bold pt-8 text-center">Dynamic Blog List</h1>

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
