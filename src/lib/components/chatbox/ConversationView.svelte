<script lang="ts">
	import { audioRecording, resetRecordingData } from '$lib/global/recording';
	import { currentChatboxView, chatContext, showChatbox } from '$lib/global/chatbox';
	import Typewriter from 'svelte-typewriter';
	import userImage from '$lib/images/sample_kid_image.png';
	import VoiceChatHistory from './VoiceChatHistory.svelte';
	import {
		conversationFinished,
		conversationHistory,
		currentGoal,
		initializeConversationBot,
		initializedConversation,
		resetConversationData,
		waitingForAIResponse
	} from '$lib/global/conversation';
	import Recorder from './Recorder.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { profileImageLocal } from '$lib/localdb/profileLocal';

	$: conversationDetails = $chatContext?.conversation.details;

	let clazz = '';
	export { clazz as class };

	export let initializingClass = '';
	export let voiceChatHistoryClass = '';
	export let recorderClass = '';
	export let finishButtonClass = '';

	export let aiChatBackgroundColor = '#EFEFEF';
	export let userChatBackgroundColor = '#EFEFEF';

	export let aiChatProfileBackgroundColor = '#766A78';

	/**
	 * Whether to show help (click for hint) button.
	 */
	export let allowHint = true;

	export let onFinishClicked = () => {};

	// initialization
	onMount(() => {
		resetConversationData();
		initializeConversationBot();
	});

	onDestroy(() => {
		resetRecordingData();
	});
</script>

{#if $initializedConversation && conversationDetails}
	<div
		style="box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.10);"
		class="w-full py-[7.2vw] text-center text-[4.2vw] font-bold"
	>
		{$currentGoal + 1}. {conversationDetails.learner.goal[$currentGoal]}
	</div>

	<div class={`h-full w-full overflow-y-auto ${clazz}`}>
		<!-- TODO: use profile image from cloud db. -->
		<VoiceChatHistory
			aiProfileBackgroundColor={aiChatProfileBackgroundColor}
			allowFriendSpeakSlower
			class={voiceChatHistoryClass}
			aiBackgroundColor={aiChatBackgroundColor}
			userBackgroundColor={userChatBackgroundColor}
			history={$conversationHistory}
			assistantProfileImage={conversationDetails.bot.avatar}
			userProfileImage={$profileImageLocal ?? ''}
		/>

		{#if $conversationFinished}
			<slot name="finished">
				<div class="mt-4 flex w-full flex-col items-center text-center font-bold">
					ภารกิจการสนทนาสำเร็จ!

					<button
						on:click={onFinishClicked}
						class={`mr-4 mt-3 w-fit rounded-lg border bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-4 py-1 text-[4vw] font-normal text-white ${finishButtonClass}`}
					>
						เสร็จสิ้น
					</button>
				</div>
			</slot>
		{/if}

		<!-- Just a bottom space -->
		<div class="h-[50vw] w-full" />
	</div>
{:else}
	<div class={`flex h-full w-full flex-row items-center justify-center ${initializingClass}`}>
		Initializing Conversation<Typewriter mode="loop">...</Typewriter>
	</div>
{/if}

{#if !$conversationFinished}
	<Recorder
		{allowHint}
		class={`absolute bottom-[20vw] left-[50%] translate-x-[-50%] ${recorderClass}`}
	/>
{/if}
