<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { chatContext, showChatbox } from '$lib/global/chatbox';
	import {
	checkConversationFinished,
	conversationFinished,
		currentGoal,
		history,
		isCheckConversationGoal,
		maxDialogueCount,
		nextConversationGoal,
		saveCurrentConversation
	} from '$lib/global/conversation';
	import { getContext, onMount } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { get } from 'svelte/store';
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

	// TODO: remove this black magickery
	const keyPressed = (e: KeyboardEvent) => {
		if (e.code === 'KeyP') {
			nextConversationGoal();
			checkConversationFinished();
		}
	};
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
					? `right-[4vw] h-[2.3vh] text-[3vw] px-2 z-10 ${
							briefing
								? 'bg-white text-black top-[2.5vh]'
								: 'text-white border border-white top-[1vh]'
					  }`
					: 'bg-white text-black left-[3vw] top-[6vh] h-[6vh] text-[1.8vw] px-5'
			}`}
		>
			<svg class="h-[45%] mr-1" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line
					x1="0.353553"
					y1="0.646447"
					x2="11.3536"
					y2="11.6464"
					stroke={$isMobile && !briefing ? 'white' : 'black'}
				/>
				<line
					x1="11.3536"
					y1="0.353553"
					x2="0.353553"
					y2="11.3536"
					stroke={$isMobile && !briefing ? 'white' : 'black'}
				/>
			</svg>
			Exit
		</button>

		<div
			class={`flex flex-row h-full items-center ${
				$isMobile ? 'w-full' : `${briefing ? 'w-full justify-center' : 'w-[60%] justify-between'}`
			}`}
		>
			<!-- Mission Details container -->
			<div
				class={`transition-transform backdrop-blur-lg backdrop-brightness-75 p-[1.5vw] shadow-sm border rounded-xl font-line-seed flex ${
					$isMobile
						? `absolute w-full text-[1.3vw] ${
								briefing
									? 'bottom-0 rounded-b-none flex-col'
									: 'top-0 py-[4vh] rounded-t-none flex-row justify-between items-center'
						  }`
						: `h-fit flex-col ${briefing ? 'w-[33%]' : 'ml-[5%] w-[45%]'}`
				}`}
			>
				{#if briefing}
					<div class={`font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.7vw]'}`}>🎯ภารกิจของคุณ</div>
					<div class={`${$isMobile ? 'text-[4.5vw] mt-[3vw]' : 'text-[1.3vw] mt-[1vw]'}`}>
						{$chatContext.conversation.details.learner.mission}
					</div>

					<!-- Divider -->
					<div
						class={`w-full bg-white ${$isMobile ? 'h-[0.23vh] my-[6vw]' : 'h-[0.15vh] my-[2vw]'}`}
					/>

					<div class={`font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.7vw]'}`}>เป้าหมาย</div>
					<div
						class={`whitespace-pre-wrap ${
							$isMobile ? 'text-[4.5vw] mt-[3vw]' : 'text-[1.3vw] mt-[1vw]'
						}`}
					>
						{$chatContext.conversation.details.learner.goal
							.map((g, i) => `${i + 1}. ${g}`)
							.join('\n')}
					</div>

					<div
						class={`font-bold text-center ${
							$isMobile ? 'text-[3.5vw] mt-[5vw]' : 'text-[1.1vw] mt-[2vw]'
						}`}
					>
						คุณจะได้รับเหรียญสูงสุด 🧿 300 สำหรับภารกิจนี้
					</div>

					<button
						on:click={() => (briefing = false)}
						class={`bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] rounded-full ${
							$isMobile
								? 'w-[90%] mx-auto my-[4vw] text-[4.8vw] py-[1.5vh]'
								: 'w-full mt-[2vw] text-[1.3vw] py-[1.3vh]'
						}`}
					>
						เริ่มการพูดคุย
					</button>
				{:else if $currentGoal < $chatContext.conversation.details.learner.goal.length}
					<div
						class={`font-bold whitespace-pre-wrap text-center ${
							$isMobile ? 'text-[4vw]' : 'text-[1.7vw] mt-[5vh]'
						}`}
					>
						{$currentGoal + 1}. {$chatContext.conversation.details.learner.goal[$currentGoal]}
					</div>

					<div
						class={`bg-[#0000007D] w-fit rounded-full mx-auto ${
							$isMobile
								? 'text-[3vw] px-[2vw] py-[1vw]'
								: 'text-[1.35vw] px-[1vw] py-[0.3vw] mt-[3vh] mb-[5vh]'
						}`}
					>
						🧿 100
					</div>
				{:else}
					<div class="text-[1.7vw]">All goals are completed!</div>
				{/if}
			</div>

			<!-- Avatar zone -->
			<div class={`h-full flex flex-col justify-end ${$isMobile ? 'w-full' : 'w-fit'}`}>
				<img
					class={`${
						$isMobile
							? 'max-w-full max-h-full mx-auto'
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
					} z-10`}
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

<svelte:window on:beforeunload|preventDefault={beforeUnload} on:keypress={keyPressed} />
