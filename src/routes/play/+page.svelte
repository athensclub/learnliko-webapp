<script lang="ts">
	import CardSlider from '$lib/components/CardSlider.svelte';
	import type { PageData } from './$types';
	import bgvd from '$lib/images/play.mp4';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';
	import { onMount } from 'svelte';
	import { queryConversationsLocal } from '$lib/localdb/conversationLocal';
	import assistant from '$lib/images/assistant.png';
	import { chatContext, currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { showModal } from '$lib/global/modal';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	// let options = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];

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

	const hideConversation = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => {
				$showChatbox = false;
				$chatContext = null;
			}
		});

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};
</script>

<!-- If there's current conversation going, display it instead of choosing conversation -->
{#if $chatContext?.conversation}
	<div
		class="w-[100vw] h-[100vh] text-white bg-cover bg-center relative"
		style="background-image: url('{$chatContext.conversation.conversationBackground}');"
	>
		<div
			class={`absolute ${
				$isMobile
					? 'top-0 w-full text-[1.3vw] rounded-t-none'
					: 'top-[25vh] left-[3vw] w-[33%] text-[1vw]'
			} backdrop-blur-sm backdrop-brightness-75 p-4 shadow-sm border border-black/15 rounded-xl`}
		>
			<div class="flex flex-row justify-between items-center">
				<strong class={`${$isMobile ? 'text-[4vw]' : 'text-[2vw]'}`}> 🎯Coversation Goal </strong>
			</div>
			<Typewriter>
				<pre class="mt-3">{$chatContext.conversation.details.learner.goal}</pre>
			</Typewriter>
		</div>

		<button
			on:click={hideConversation}
			class={`absolute flex flex-row items-center justify-around rounded-full ${
				$isMobile
					? 'top-[2.5vh] right-[4vw] h-[2.3vh] text-[3vw] border border-white px-2'
					: 'bg-white text-black left-[3vw] top-[6vh] h-[6vh] text-[1.8vw] px-5'
			}`}
		>
			<svg class="h-[45%] mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line
					x1="0.353553"
					y1="0.646447"
					x2="11.3536"
					y2="11.6464"
					stroke={$isMobile ? 'white' : 'black'}
				/>
				<line
					x1="11.3536"
					y1="0.353553"
					x2="0.353553"
					y2="11.3536"
					stroke={$isMobile ? 'white' : 'black'}
				/>
			</svg>
			Exit
		</button>

		<img
			class={`${$isMobile ? 'w-full' : 'h-[90%] left-[50%] translate-x-[-50%]'} absolute bottom-0`}
			src={$chatContext.conversation.avatars.normal}
			alt="Avatar"
		/>
	</div>
{:else}
	<header
		class="z-20 flex top-0 items-center justify-left h-[48px]font-line-seed text-xl font-bold w-full fixed bg-transparent py-8 px-6 pt-6"
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
		class="xl:mt-[5vw] py-3 justify-center font-bold xl:text-[1.5vw] lg:text-[3.5vh] text-[2.2vh] z-1 lg:flex lg:mt-[15vh] mt-[8vh] lg:w-[32vw] mx-auto rounded-xl"
	>
		<br />

		<h3
			class=" md:portrait:invisible animate-pulse xl:text-[1.5vw] mr-2 text-center text-[4.5vh] lg:text-[3.5vh]"
		>
			👋
		</h3>

		<h3
			class=" md:portrait:invisible font-line-seed font-bold text-center text-white lg:text-[1.5vw]"
		>
			Today, You have 5 people to Talk!
		</h3>
	</div>

	<div class="md:portrait:invisible lg:mt-2">
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
		class="z-30 p-1 w-16 fixed h-16 backdrop-blur-xl bg-black/10 rounded-full bottom-14 lg:right-14 right-8 hover:bg-white active:shadow-xl mouse shadow transition ease-in duration-200 focus:outline-none"
	>
		<img src={assistant} alt="assistant" />
	</button>

	<div
		class=" h-16 text-black/80 py-2 px-8 bottom-14 w-[75vw] text fixed lg:text-center lg:w-full lg:bottom-8 font-bold"
	>
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
{/if}

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
