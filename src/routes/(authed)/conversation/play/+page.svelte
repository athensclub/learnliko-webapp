<script lang="ts">
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { chatContext, showChatbox } from '$lib/global/chatbox';
	import { maxDialogueCount, saveCurrentConversation } from '$lib/global/conversation';
	import { getContext, onMount } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { fly } from 'svelte/transition';

	// initialization
	onMount(() => {
		$saveCurrentConversation = true;
		$maxDialogueCount = 1000000;
	});

	const { open }: Context = getContext('simple-modal');
	const hideConversation = () =>
		open(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => {
				$showChatbox = false;
				$chatContext = null;
				window.history.back();
			}
		});
</script>

{#if $chatContext}
	<div
		class="w-[100vw] h-[100vh] text-white bg-cover bg-center relative"
		style="background-image: url('{$chatContext.conversation.background}');"
	>
		<div
			class={`absolute ${
				$isMobile
					? 'top-0 w-full text-[1.3vw] rounded-t-none'
					: 'top-[25vh] left-[3vw] w-[33%] text-[1vw]'
			} backdrop-blur-lg backdrop-brightness-75 p-4 shadow-sm border  rounded-xl`}
		>
			<div class="flex flex-row justify-between items-center">
				<strong class={`${$isMobile ? 'text-[4vw]' : 'text-[2vw]'}`}> 🎯Coversation Goal </strong>
			</div>
			<Typewriter>
				<div class="mt-3 text-[1.3vw] font-line-seed whitespace-pre-wrap">
					{$chatContext.conversation.details.learner.goal}
				</div>
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
			src={$chatContext.conversation.avatar.models[$chatContext.bot.emotion]}
			alt="Avatar"
		/>

		<div
			class={`fixed ${
				$isMobile ? 'w-[100vw] h-[40vh] bottom-0' : 'w-[37vw] h-[70vh] bottom-[15vh] right-[3vw]'
			} z-[600]`}
		>
			<div
				transition:fly={{ y: 800, duration: 800 }}
				class={`overflow-hidden w-full h-full font-line-seed relative flex flex-col items-center shadow-2xl shadow-gray-700 border-[1px] border-black/10 border-b-0 backdrop-blur-sm backdrop-brightness-75 bg-transparent rounded-3xl`}
			>
				<ConversationView
					class="text-white"
					initializingClass="text-white"
					recorderClass="text-black bg-black/[0.5] backdrop-blur-md w-[90%]"
					finishButtonClass="border-white/[0.15]"
				/>
			</div>
		</div>
	</div>
{/if}
