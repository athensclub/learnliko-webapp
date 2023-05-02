<script lang="ts">
	import CardSlider from '$lib/components/CardSlider.svelte';
	import Select from 'svelte-select';
	import type { PageData } from './$types';

	let options = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

	export let data: PageData;
</script>

<header
	class="flex top-0 items-center justify-left h-[48px] font-line-seed text-xl font-bold w-full fixed bg-transparent py-8 px-6 pt-10"
>
	<img  src="https://firebasestorage.googleapis.com/v0/b/motoverse-development.appspot.com/o/Group%2051.png?alt=media&token=6f4645b6-f350-44bb-9767-e3e2739dc749" alt="" class=" w-8 h-8 mr-2" />
	<span class=" flex mt-1">Learnliko.ai
		<h1 class=" ml-2 text-xs bg-black text-white rounded-md px-2 text-center mb-1 py-1">beta</h1>
	</span>
	

	<div class="w-full flex flex-row justify-end">
		<div class="w-[15%] ">
			<Select items={options} placeholder="Select Level"/>
		</div>
	</div>
</header>

<div class="w-full pt-8 text-center relative font-bold text-lg">
	<br>
	👋Today, You have 5 people to Talk with
</div>

<CardSlider cards={data.conversationCorouselItems} />
