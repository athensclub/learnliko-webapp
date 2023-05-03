<script lang="ts">
	import CardSlider from '$lib/components/CardSlider.svelte';
	import Select from 'svelte-select';
	import type { PageData } from './$types';

	let options = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

	export let data: PageData;
</script>

<header
	class="z-20 flex top-0 items-center justify-left h-[48px] font-line-seed text-xl font-bold w-full fixed bg-transparent py-8 px-6 pt-10"
>
	<img
		src="https://firebasestorage.googleapis.com/v0/b/motoverse-development.appspot.com/o/Group%2051.png?alt=media&token=6f4645b6-f350-44bb-9767-e3e2739dc749"
		alt=""
		class=" w-8 h-8 mr-2"
	/>
	<span class=" flex mt-1"
		>Learnliko.ai
		<h1 class=" ml-2 text-xs bg-black text-white rounded-md px-2 text-center mb-1 py-1">DEMO</h1>
	</span>

	<!-- <div class="w-full flex flex-row justify-start ml-6">
		<div class="w-[150px]">
			<Select items={options} placeholder="Select Level ▾" />
		</div>
	</div> -->

	<div class="w-full flex flex-row justify-end">
		<button class=" text-sm border border-black/10 rounded-full p-2 px-3">📖Reading</button>
	</div>
</header>

<div class=" mt-[5vw] justify-center font-bold text-[1.5vw] z-1 flex">
	<br />
	<h3 class=" animate-pulse text-[2.5vw] mr-2 ">🗣️</h3>
	<h3 class=" py-[1vw] font-line-seed font-bold">	Today, You have 5 people to Talk with</h3>

</div>

<CardSlider cards={data.conversationCorouselItems} />

<footer class=" fixed bottom-0 w-full h-16 bg-slate-100 text-center py-5 text-gray-400">
	Demo for <strong>Learnliko.ai</strong> ©Copyright www.learnliko.ai 2023
</footer>
