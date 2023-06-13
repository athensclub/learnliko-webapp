<script lang="ts">
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { chatContext, showChatbox } from '$lib/global/chatbox';
	import { showModal } from '$lib/global/modal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	const hideConversation = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => {
				$showChatbox = false;
				$chatContext = null;
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
			src={$chatContext.conversation.avatar.models[$chatContext.bot.emotion]}
			alt="Avatar"
		/>
	</div>
{/if}
