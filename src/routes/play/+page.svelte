<script lang="ts">
	import CardSlider from '$lib/components/CardSlider.svelte';
	import type { PageData } from './$types';
	import bgvd from '$lib/images/play.mp4';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';
	import { onMount } from 'svelte';
	import { queryConversationsLocal } from '$lib/localdb/conversationLocal';
	import assistant from '$lib/images/assistant.png';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	let options = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

	// TODO: probably switch back to querying in ssr when we switch the db to cloud.
	// export let data: PageData;
	let data: { conversationCorouselItems: ConversationCarouselItem[] } = {
		conversationCorouselItems: []
	};
	onMount(async () => {
		const result = await queryConversationsLocal();
		data = {
			conversationCorouselItems: result
		};
	});

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};
</script>

<header
	class="z-20 flex top-0 items-center justify-left h-[48px]font-line-seed text-xl font-bold w-full fixed bg-transparent py-8 px-6 pt-10"
>
	<a href="/" class="flex">
		<img
			src="https://firebasestorage.googleapis.com/v0/b/motoverse-development.appspot.com/o/Group%2051.png?alt=media&token=6f4645b6-f350-44bb-9767-e3e2739dc749"
			alt=""
			class=" w-8 h-8 mr-2"
		/>
		<span class=" flex mt-1"
			>Learnliko
			<h1 class=" ml-2 text-xs bg-black text-white rounded-md px-2 text-center mb-1 py-1">
				School
			</h1>
		</span>
	</a>

	<!-- <div class="w-full flex flex-row justify-start ml-6">
		<div class="w-[150px]">
			<Select items={options} placeholder="Select Level ▾" />
		</div>
	</div> -->
</header>

<div
	class="xl:mt-[5vw] w-[42vh] lg:shadow-xl justify-center font-bold xl:text-[1.5vw] lg:text-[3.5vh] text-[2.2vh] z-1 lg:flex lg:mt-[15vh] mt-[8vh] lg:w-[32vw] lg:backdrop-brightness-75 mx-auto lg:backdrop-blur-xl rounded-full"
>
	<br />

	<h3
		class=" md:portrait:invisible py-[0.5vw] animate-pulse xl:text-[1.5vw] mr-2 text-center text-[4.5vh] lg:text-[3.5vh]"
	>
		👋
	</h3>

	<h3
		class=" md:portrait:invisible py-[0.5vw] font-line-seed font-bold text-center text-white lg:mt-0 mt-[6vw] text-[0.3]"
	>
		Today, You have 5 people to Talk!
	</h3>
</div>

<div class="md:portrait:invisible lg:mt-6">
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

<button
	on:click={openAssistantChat}
	class="p-1 w-16 fixed h-16 backdrop-blur-lg bg-white/20 rounded-full bottom-14 right-14 hover:bg-white active:shadow-xl mouse shadow transition ease-in duration-200 focus:outline-none"
>
	<img src={assistant} alt="assistant" />
</button>


<div class="bottom-8 h-16 text-black py-2 fixed text-center w-full">
	<Typewriter>Tips: ฝึกฝนอ่าน Reading เพื่อเรียนรู้คำใหม่ๆเพื่อใช้พูดคุย</Typewriter>
</div>
<video
	autoplay
	muted
	loop
	id="myVideo"
	class=" brightness-150 blur-lg rotate-0 md:rotate-0 object-cover"
>
	<source src={bgvd} type="video/mp4" />
</video>

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
