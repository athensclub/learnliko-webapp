<script>
	import jsonData from './readingdata.json';
    import read from '$lib/images/read.mp4';
    import ReadMore from '$lib/components/ReadMore.svelte';
</script>

<video
	autoplay
	muted
	loop
	id="myVideo"
	class=" brightness-120 blur-sm rotate-0 md:rotate-0 object-cover"
>
	<source src={read} type="video/mp4" />
</video>

<div class=" text-center">
	<h1 class="text-3xl font-bold my-4">Dynamic Blog List</h1>

	<ul>
		{#each jsonData as blog (blog.id)}
			<li class="my-6 backdrop-blur-2xl bg-white/5 w-[26vw] shadow-xl mx-auto px-4 py-4 rounded-xl">
				<h2 class="text-xl font-bold mb-2">{blog.blogName}</h2>
                <p class="text-gray-600">Topic: {blog.topic}</p>
                <p class="text-gray-600">Date and Time: {blog.dateTime}</p>
                <img class="mt-2 rounded mb-2" src={blog.image} alt="Blog Image" />
                <ReadMore textContent={blog.content} maxChars={120} />
                
				
			</li>
		{/each}
	</ul>
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
