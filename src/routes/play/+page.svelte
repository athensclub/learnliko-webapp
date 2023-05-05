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
</header>

<div
	class=" xl:mt-[5vw] justify-center font-bold xl:text-[1.5vw] lg:text-[3.5vh] text-[2.2vh] z-1 lg:flex lg:mt-[15vh] mt-[10vh]"
>
	<br />

	<h3
		class=" md:portrait:invisible py-[1vw] animate-pulse xl:text-[1.5vw] mr-2 text-center text-[5.5vh] lg:text-[3.5vh]"
	>
		🗣️
	</h3>

	<h3 class=" md:portrait:invisible py-[1vw] font-line-seed font-bold text-center lg:mt-0 mt-[4vw]">
		Today, You have 5 people to Talk with
	</h3>
</div>


<div class="md:portrait:invisible">
	<CardSlider cards={data.conversationCorouselItems} />
</div>

<h3
	class="md:landscape:invisible md:portrait:visible portrait:invisible animate-pulse xl:text-[1.5vw] mr-2 text-center text-[10.5vh] lg:text-[3.5vh] top-[30vh] left-10 absolute"
>
	🔄️
</h3>
<h3
	class=" md:landscape:invisible md:portrait:visible portrait:invisible py-[1vw] font-line-seed font-bold text-center lg:mt-0 mt-[2vw] text-[5.2vh] top-[44vh] left-16 absolute"
>
	Flip your screen
</h3>

<footer
	class=" fixed bottom-0 w-full lg:h-16 h-32 bg-slate-100 text-center lg:py-2 py-8 text-gray-400"
>
	Demo for <strong>Learnliko.ai</strong> <br />©Copyright www.learnliko.ai 2023
</footer>
