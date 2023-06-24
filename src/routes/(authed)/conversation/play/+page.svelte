<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { chatContext, showChatbox } from '$lib/global/chatbox';
	import {
		currentGoal,
		isCheckConversationGoal,
		maxDialogueCount,
		saveCurrentConversation
	} from '$lib/global/conversation';
	import { getContext, onMount } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { fly } from 'svelte/transition';

	let briefing = true;

	// initialization
	onMount(() => {
		$isCheckConversationGoal = true;
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

	const beforeUnload = (event: BeforeUnloadEvent) => {
		// Chrome requires returnValue to be set.
		event.returnValue = 'Are you sure you want to end conversation?';
		return 'Are you sure you want to end conversation?';
	};

	// window before unload won't trigger on navigation in the same site, use: https://stackoverflow.com/a/76238933
	beforeNavigate(({ cancel }) => {
		if (!confirm('Are you sure you want to end conversation?')) {
			cancel();
		}
	});
</script>

{#if $chatContext}
	<div
		class="w-[100vw] h-[100vh] text-white bg-cover bg-center relative"
		style="background-image: url('{$chatContext.conversation.background}');"
	>
		<!-- Exit Button -->
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

		<div
			class={`flex flex-row h-full items-center ${briefing ? 'w-full justify-center' : 'w-[60%]'}`}
		>
			<!-- Mission Details container -->
			<div
				class={`transition-transform backdrop-blur-lg backdrop-brightness-75 p-[1.5vw] shadow-sm border rounded-xl font-line-seed ${
					$isMobile
						? 'absolute top-0 w-full text-[1.3vw] rounded-t-none'
						: `${briefing ? 'w-[33%]' : 'ml-[5%] w-[45%]'} h-fit`
				}`}
			>
				{#if briefing}
					<div class="text-[1.7vw] font-bold">🎯ภารกิจของคุณ</div>
					<div class="text-[1.3vw] mt-[1vw]">
						{$chatContext.conversation.details.learner.mission}
					</div>

					<!-- Divider -->
					<div class="w-full h-[0.15vh] my-[2vw] bg-white" />

					<div class="text-[1.7vw] font-bold">เป้าหมาย</div>
					<div class="text-[1.3vw] mt-[1vw] whitespace-pre-wrap">
						{$chatContext.conversation.details.learner.goal
							.map((g, i) => `${i + 1}. ${g}`)
							.join('\n')}
					</div>

					<div class="text-[1.1vw] font-bold mt-[2vw] text-center">
						คุณจะได้รับเหรียญสูงสุด 🧿 300 สำหรับภารกิจนี้
					</div>

					<button
						on:click={() => (briefing = false)}
						class="w-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] rounded-full mt-[2vw] text-[1.3vw] py-[1.3vh]"
					>
						เริ่มการพูดคุย
					</button>
				{:else}
					<div class="text-[1.7vw] font-bold mt-[5vh] whitespace-pre-wrap text-center">
						{$currentGoal + 1}. {$chatContext.conversation.details.learner.goal[$currentGoal]}
					</div>

					<div
						class="text-[1.35vw] px-[1vw] py-[0.3vw] mt-[3vh] mb-[5vh] bg-[#0000007D] w-fit rounded-full mx-auto"
					>
						🧿 100
					</div>
				{/if}
			</div>

			<!-- Avatar zone -->
			<div class="w-fit h-full flex flex-col justify-end">
				<img
					class={`${
						$isMobile
							? 'w-full max-h-full object-contain mx-auto'
							: `${briefing ? 'h-[90%]' : 'w-full max-h-[90%]'} bottom-0 transition-transform`
					}`}
					src={$chatContext.conversation.avatar.models[$chatContext.bot.emotion]}
					alt="Avatar"
				/>
			</div>

			{#if !briefing}
				<div
					class={`fixed ${
						$isMobile
							? 'w-[100vw] h-[40vh] bottom-0'
							: 'w-[37vw] h-[70vh] bottom-[15vh] right-[3vw]'
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
			{/if}
		</div>
	</div>
{/if}

<svelte:window on:beforeunload|preventDefault={beforeUnload} />
