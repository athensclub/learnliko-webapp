<script lang="ts">
	import ReadMore from '$lib/components/ReadMore.svelte';

	export let data: PageData;
</script>

<div class="w-full h-full min-h-[100vh] bg-black/5">
	<!-- top spacing -->
	<div class="w-full h-[64px]" />

	<div class="bg-white w-[28vw] mx-auto px-4 py-4 rounded-xl">
		<h2 class="text-xl font-bold mb-2">{data.item.blogName}</h2>
		<p class="text-gray-600">Topic: {data.item.topic}</p>
		<p class="text-gray-600">Date and Time: {data.item.dateTime}</p>
		<img class="mt-2 rounded-lg mb-2" src={data.item.image} alt="Blog Image" />
		<ReadMore textContent={data.item.content} maxChars={120} />
	</div>
</div>
