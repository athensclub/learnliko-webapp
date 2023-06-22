<script lang="ts">
	import { audioRecording, resetRecordingData } from '$lib/global/recording';
	import { currentChatboxView, chatContext } from '$lib/global/chatbox';
	import Typewriter from 'svelte-typewriter';
	import userImage from '$lib/images/sample_kid_image.png';
	import VoiceChatHistory from './VoiceChatHistory.svelte';
	import {
		conversationFinished,
		history,
		initializeConversationBot,
		initializedConversation,
		resetConversationData,
		waitingForAIResponse
	} from '$lib/global/conversation';
	import Recorder from './Recorder.svelte';
	import { onDestroy, onMount } from 'svelte';

	let conversationDetails = $chatContext!.conversation.details;

	let clazz = '';
	export { clazz as class };

	export let initializingClass = '';
	export let voiceChatHistoryClass = '';
	export let recorderClass = '';
	export let finishButtonClass = '';

	export let aiChatBackgroundColor = '#6C80E8';
	export let userChatBackgroundColor = '#404040';

	export let onFinishClicked: () => void = () => ($currentChatboxView = 'RECAP');

	// initialization
	onMount(() => {
		resetConversationData();
		initializeConversationBot();
	});

	onDestroy(() => {
		resetRecordingData();
	});
</script>

{#if $initializedConversation}
	<div class={`w-full h-full overflow-y-auto ${clazz}`}>
		<VoiceChatHistory
			class={voiceChatHistoryClass}
			aiBackgroundColor={aiChatBackgroundColor}
			userBackgroundColor={userChatBackgroundColor}
			history={$history}
			assistantProfileImage={conversationDetails.bot.avatar}
			userProfileImage={userImage}
		/>

		{#if $waitingForAIResponse}
			<div class="flex flex-row items-center px-4 mt-6">
				<div
					class={`mr-2 w-[42px] h-[42px] px-4 bg-top bg-cover rounded-full border border-white`}
					style="background-image: url('{conversationDetails.bot.avatar}');"
				/>
				Thinking
				<Typewriter mode="loop">...</Typewriter>
			</div>
		{/if}

		{#if $conversationFinished}
			<slot name="finished">
				<div class="w-full text-center flex flex-col mt-4 items-center font-bold">
					Conversation Finished

					<button
						on:click={onFinishClicked}
						class={`mt-3 rounded-lg w-fit border font-normal text-base mr-4 px-4 py-1 ${finishButtonClass}`}
					>
						Finish!
					</button>
				</div>
			</slot>
		{/if}

		<!-- Just a bottom space -->
		<div class="w-full h-[120px]" />
	</div>
{:else}
	<div class={`w-full h-full flex flex-row items-center justify-center ${initializingClass}`}>
		Initializing Conversation<Typewriter mode="loop">...</Typewriter>
	</div>
{/if}

{#if !$conversationFinished}
	<Recorder class={`absolute bottom-[3vh] left-[50%] translate-x-[-50%] ${recorderClass}`} />
{/if}
