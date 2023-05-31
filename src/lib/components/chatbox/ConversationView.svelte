<script lang="ts">
	import { audioRecording, isRecording, toggleRecording } from '$lib/global/recording';
	import { transcribe } from '$api/transcription';
	import { showModal } from '$lib/global/modal';
	import {
		showChatbox,
		recapHistory,
		type RecapHistory,
		currentChatboxView,
		chatContext
	} from '$lib/global/chatbox';
	import Typewriter from 'svelte-typewriter';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { synthesize, type SynthesizeAccent, type SynthesizeGender } from '$api/tts';
	import userImage from '$lib/images/sample_kid_image.png';
	import { analyzeDialog, chat } from '$api/conversation';
	import type { ChatMessage } from '$lib/types/requests/chatCompletion';
	import type { ChatBotMessage } from '$lib/types/conversationData';
	import VoiceChatHistory from './VoiceChatHistory.svelte';
	import { completeConversationLocal } from '$lib/localdb/profileLocal';
	import { blobToBase64 } from '$lib/utils/io';

	// chat's history, used for display only
	let history: {
		role: 'user' | 'assistant';
		audioURL: string;
		transcription: string | null;
	}[] = [];
	let finished = false;
	let finishedTime: Date;
	let initializedConversation = false;
	let waitingForAIResponse = false;
	let transcribing = false;

	// an array of chatGPT's history in raw data, used for chat completion
	const gptHistory: ChatMessage[] = [];

	let conversationDetails = $chatContext!.conversation.details;

	const computeRecap = async () => {
		$recapHistory = null;
		let result: RecapHistory = [];
		const promises: Promise<any>[] = [];

		for (let i = 0; i < history.length; i += 2) {
			// the last dialog will have no user's response
			if (i + 1 >= history.length) break;

			promises.push(
				analyzeDialog(history[i].transcription!, history[i + 1].transcription!).then((recap) => {
					result[i / 2] = {
						assistant: {
							...history[i],
							role: 'assistant',
							transcription: history[i].transcription!
						},
						user: { ...history[i + 1], role: 'user', transcription: history[i + 1].transcription! },

						score: recap.overallScore,
						suggestion: recap.suggestion
					};
				})
			);
		}
		await Promise.all(promises);

		$recapHistory = result;

		// TODO: use actual db (cloud).
		completeConversationLocal({
			recap: result,
			finishedTime,
			conversationID: $chatContext!.conversation.id
		});
	};

	const showRecap = async () => ($currentChatboxView = 'RECAP');

	const hide = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => ($showChatbox = false)
		});

	/**
	 * Call bot to reply base on chat history
	 * @param message ignore chat history if [message] is provided
	 */
	const botReply = async function (message?: string) {
		waitingForAIResponse = true;
		// if no message provide, get response from chatGPT
		if (!message) {
			let data: ChatBotMessage | undefined;
			let attempt = 0;
			while (true) {
				try {
					const botResponse = await chat(gptHistory);

					// gpt will response in JSON format, parse it to object
					data = JSON.parse(botResponse);

					gptHistory.push({ role: 'assistant', content: botResponse });
					console.log(botResponse);
					break;
				} catch (error) {
					// max attempt at 5
					if (attempt++ >= 5) break;

					gptHistory.push({ role: 'user', content: 'Reply with provided JSON scheme' });
					console.error("error: parsing bot's message, retring...");
				}
			}

			if (!data) throw new Error('Error: Bot failed to reply');
			message = data.message;

			// TODO: implement behavior regarding bot's message status
			switch (data.status) {
				case 'NORMAL':
					break;
				case 'INAPPROPRIATE':
					break;
				case 'END-OF-CONVERSATION':
					finished = true;
					finishedTime = new Date();
					computeRecap();
					break;
				default:
					break;
			}
		}

		const audio = await synthesize(
			message,
			conversationDetails.bot.accent,
			conversationDetails.bot.gender
		);

		history = [
			...history,
			{
				role: 'assistant',
				audioURL: await blobToBase64(audio),
				transcription: message
			}
		];
		waitingForAIResponse = false;
	};

	const onUserReply = async function (audioRecording: { data: Blob; url: string } | null) {
		if (audioRecording !== null) {
			transcribing = true;
			history = [
				...history,
				{
					role: 'user',
					audioURL: audioRecording.url,
					transcription: null
				}
			];

			const targetIndex = history.length - 1;
			const transcription = await transcribe(audioRecording.data);
			history[targetIndex] = {
				...history[targetIndex],
				transcription: transcription
			};
			gptHistory.push({ role: 'user', content: transcription });

			transcribing = false;
			botReply();
		}
	};

	const initializeBot = async function () {
		gptHistory.push({ role: 'user', content: conversationDetails.bot.prompt });
		gptHistory.push({
			role: 'assistant',
			content: `{"message":"${conversationDetails.intro}","status":"NORMAL"}`
		});

		await botReply(conversationDetails.intro);

		// finish initialization
		initializedConversation = true;
		console.log('Finish init bot');
	};

	// initialization
	initializeBot();
	audioRecording.subscribe(onUserReply);
</script>

<div
	class="z-10 flex items-center justify-center w-full h-[48px] font-bold text-md border-b border-black/[0.15] relative"
>
	<h1>Voice Chat</h1>
	<div class="flex flex-row absolute right-0">
		<button
			on:click={hide}
			class="rounded-full border border-black/[0.15] h-[28px] aspect-square text-sm"
		>
			✕
		</button>
	</div>
</div>

{#if initializedConversation}
	<div class="w-full h-[calc(100%-48px)] overflow-y-auto">
		<h1 class=" sticky p-4 shadow-sm border border-black/15 rounded-xl mt-3 text-black text-[1.3vw]">
			<strong class=" text-[2vw]">🎯Coversation Goal</strong><br><Typewriter><pre>{conversationDetails.learner.goal}</pre></Typewriter>
		</h1>
		<VoiceChatHistory
			{history}
			assistantProfileImage={conversationDetails.bot.avatar}
			userProfileImage={userImage}
		/>

		{#if waitingForAIResponse}
			<div class="flex flex-row items-center">
				<div
					class={`w-[42px] h-[42px] px-4 bg-center bg-cover rounded-full border border-white`}
					style="background-image: url('{conversationDetails.bot.avatar}');"
				/>
				Thinking
				<Typewriter mode="loop">...</Typewriter>
			</div>
		{/if}

		{#if finished}
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
	<div class="w-full h-full flex flex-row items-center justify-center">
		Initializing Conversation<Typewriter mode="loop">...</Typewriter>
	</div>
{/if}

<button
	disabled={waitingForAIResponse || transcribing || finished || !initializedConversation}
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
	{/if}
	{#if !$isRecording}
		Press to Talk
	{/if}
</button>
