<script lang="ts">
	import { audioRecording, isRecording, toggleRecording } from '$lib/global/recording';
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

	let conversationDetails = $chatContext!.conversation.details;

	// initialization
	resetConversationData();
	initializeConversationBot();

	const showRecap = async () => ($currentChatboxView = 'RECAP');

	let unsubscribeAudioRecording = audioRecording.subscribe(submitUserReply);
	onDestroy(() => unsubscribeAudioRecording());
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
		<div class="w-full h-[80px]" />
	</div>
{:else}
	<div class="w-full h-full flex flex-row items-center justify-center text-white">
		Initializing Conversation<Typewriter mode="loop">...</Typewriter>
	</div>
{/if}

{#if !$conversationFinished}
	<button
		disabled={$waitingForAIResponse ||
			$transcribing ||
			$conversationFinished ||
			!$initializedConversation}
		on:click={toggleRecording}
		class="absolute bg-white/[0.8] mx-auto bottom-8 w-[200px] h-[44px] shadow-all rounded-xl flex items-center justify-center z-[1000]"
	>
		{#if $isRecording}
			<div class="bg-red-600 rounded-full w-[5%] aspect-square absolute top-2 right-2" />
		{/if}
		<svg class="w-[8%] mr-2" viewBox="0 0 41 56" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.5 35.25C18.1042 35.25 16.0677 34.4115 14.3906 32.7344C12.7135 31.0573 11.875 29.0208 11.875 26.625V9.375C11.875 6.97917 12.7135 4.94271 14.3906 3.26562C16.0677 1.58854 18.1042 0.75 20.5 0.75C22.8958 0.75 24.9323 1.58854 26.6094 3.26562C28.2865 4.94271 29.125 6.97917 29.125 9.375V26.625C29.125 29.0208 28.2865 31.0573 26.6094 32.7344C24.9323 34.4115 22.8958 35.25 20.5 35.25ZM17.625 55.375V46.5344C12.6417 45.8635 8.52083 43.6354 5.2625 39.85C2.00417 36.0646 0.375 31.6562 0.375 26.625H6.125C6.125 30.6021 7.52704 33.9917 10.3311 36.7939C13.1333 39.598 16.5229 41 20.5 41C24.4771 41 27.8677 39.598 30.6718 36.7939C33.4739 33.9917 34.875 30.6021 34.875 26.625H40.625C40.625 31.6562 38.9958 36.0646 35.7375 39.85C32.4792 43.6354 28.3583 45.8635 23.375 46.5344V55.375H17.625Z"
				fill="black"
			/>
		</svg>
		{#if $isRecording}
			Recording
		{:else}
			Press to Talk
		{/if}
	</button>
{/if}
