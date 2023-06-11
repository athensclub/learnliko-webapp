<script lang="ts">
	import { audioRecording } from '$lib/global/recording';
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
		submitUserReply,
		transcribing,
		waitingForAIResponse
	} from '$lib/global/conversation';
	import { onDestroy } from 'svelte';
	import Recorder from './Recorder.svelte';

	let conversationDetails = $chatContext!.conversation.details;

	// initialization
	resetConversationData();
	initializeConversationBot();

	const showRecap = async () => ($currentChatboxView = 'RECAP');
</script>

{#if $initializedConversation}
	<div class="w-full h-full overflow-y-auto text-white">
		<VoiceChatHistory
			history={$history}
			assistantProfileImage={conversationDetails.bot.avatar}
			userProfileImage={userImage}
		/>

		{#if $waitingForAIResponse}
			<div class="flex flex-row items-center px-4 mt-6">
				<div
					class={`mr-2 w-[42px] h-[42px] px-4 bg-center bg-cover rounded-full border border-white`}
					style="background-image: url('{conversationDetails.bot.avatar}');"
				/>
				Thinking
				<Typewriter mode="loop">...</Typewriter>
			</div>
		{/if}

		{#if $conversationFinished}
			<div class="w-full text-center flex flex-col mt-4 items-center font-bold">
				Conversation Finished

				<button
					on:click={showRecap}
					class="mt-3 rounded-lg w-fit border border-black/[0.15] font-normal text-base mr-4 px-4 py-1"
				>
					Finish!
				</button>
			</div>
		{/if}

		<!-- Just a bottom space -->
		<div class="w-full h-[120px]" />
	</div>
{:else}
	<div class="w-full h-full flex flex-row items-center justify-center text-white">
		Initializing Conversation<Typewriter mode="loop">...</Typewriter>
	</div>
{/if}

{#if !$conversationFinished}
	<Recorder class="absolute bottom-8 w-[calc(100%-48px)] mx-auto" />
{/if}
