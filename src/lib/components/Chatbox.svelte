<script lang="ts">
	import {
		audioRecording,
		isRecording,
		resetRecordingData,
		stopRecording,
		toggleRecording
	} from '$lib/global/recording';
	import { showChatbox } from '$lib/global/chatbox';
	import { fly } from 'svelte/transition';
	import { Player, DefaultUi, Audio } from '@vime/svelte';
	import { transcribe } from '$api/transcription';
	import { showModal } from '$lib/global/modal';
	import Typewriter from 'svelte-typewriter';
	import ConfirmModal from './modals/ConfirmModal.svelte';
	import { synthesize, type SynthesizeAccent, type SynthesizeGender } from '$api/tts';
	import aiImage from '$lib/images/sample_ai_profile.png';
	import userImage from '$lib/images/sample_kid_image.png';
	import { chat } from '$api/conversation';
	import type { ChatMessage } from '$lib/types/requests/chatCompletion';

	// chat's history, used for display only
	let history: {
		role: 'user' | 'assistant';
		audioURL: string;
		transcription: string | null;
	}[] = [];

	// an array of chatGPT's history in raw data, used for chat completion
	const gptHistory: ChatMessage[] = [];

	const conversationDetails = {
		intro: 'Welcome to the shop how can I help you?',
		bot: {
			accent: 'India' as SynthesizeAccent,
			gender: 'MALE' as SynthesizeGender,
			prompt: `Your role:
I want you to act as a female stationery shop keeper, you are kind, and friendly. Your name is Lucy.

Your Goal: 
You have to give customer an information about the product available in you store, the sell them to the customer. 

Answer Format:
You have to answer in the JSON format by using to following JSON schema

{
//your response
"message": string,
// the enum value in string type
// “NORMAL” used when the situation is normal
// “INAPPROPRIATE” used when the situation is out of context or say something inappropriate
// “END-OF-CONVERSATION” used when the customer have left or finish purchased your product
"status": string
}

When the customer have left or finish purchased your product, you have to add "END-OF-CONVERSATION" in the end of the last sentence.
If your customer talk out of context or say something inappropriate, simply answer "INAPPROPRIATE"

Shop information:
There are only pen and pencil available in your store.
The pen and pencil is 5฿ and 10฿ each respectively.
Your store have only 10 pens, 10 pencils stock in your storage.

My role:
I will be your customer who is an kid and have English proficiency at level A1.

If you understand, say “Welcome to the shop how can I help you?”`
		}
	};

	let initializedConversation = false;
	let waitingForAIResponse = false;
	let transcribing = false;

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
			const botResponse = await chat(gptHistory);
			gptHistory.push({ role: 'assistant', content: botResponse });

			console.log(botResponse);
			// gpt will response in JSON format, parse it to object
			const data: { message: string; status: string } = JSON.parse(botResponse);
			message = data.message;
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
				audioURL: URL.createObjectURL(audio),
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
			// TODO: implement `botReply` function with bot's typing/loadind status
			botReply();
		}
	};

	const initializeBot = async function () {
		gptHistory.push({ role: 'user', content: conversationDetails.bot.prompt });

		const message = await chat(gptHistory);
		gptHistory.push({ role: 'assistant', content: message });

		await botReply(conversationDetails.intro);

		// finish initialization
		initializedConversation = true;
		console.log('Finish init bot');
	};

	// initialization
	// TODO: implement with simulate situation, give bot the information about the situation
	initializeBot();
	audioRecording.subscribe(onUserReply);
</script>

<div
	transition:fly={{ y: 800, duration: 500 }}
	class="w-full h-full bg-white z-[1000] font-line-seed relative flex flex-col items-center"
>
	<div
		class="flex items-center justify-center w-full h-[48px] font-bold text-lg border-b border-black/[0.15] relative"
	>
		Voice Chat

		<button
			on:click={hide}
			class="absolute right-4 rounded-full border border-black/[0.15] h-[28px] aspect-square"
			>x</button
		>
	</div>

	{#if initializedConversation}
		<div class="w-full h-[calc(100%-48px)] overflow-y-auto">
			{#each history as chat, index (index)}
				<div class={`flex flex-col mt-3 ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
					<div class={`flex flex-row items-center w-[85%]`}>
						{#if chat.role === 'assistant'}
							<div
								class={`w-[48px] h-[48px] mr-2 bg-center bg-cover rounded-full border border-white`}
								style="background-image: url('{aiImage}');"
							/>
						{/if}
						<div class="w-[70%] mx-2 z-50">
							<Player>
								<Audio>
									<source data-src={chat.audioURL} type="audio/ogg; codecs=opus" />
								</Audio>

								<DefaultUi noSettings />
							</Player>
						</div>
						{#if chat.role === 'user'}
							<div
								class={`w-[48px] h-[48px] bg-center bg-cover ml-2 rounded-full border border-white`}
								style="background-image: url('{userImage}');"
							/>
						{/if}
					</div>
					{#if chat.role === 'user'}
						<div class="mt-1 flex flex-row pl-2 w-[85%]">
							{#if chat.transcription === null}
								Transcribing<Typewriter mode="loop">...</Typewriter>
							{:else}
								{chat.transcription}
							{/if}
						</div>
					{/if}
				</div>
			{/each}
			{#if waitingForAIResponse}
				<div class="flex flex-row items-center">
					<div
						class={`w-[48px] h-[48px] mr-2 bg-center bg-cover rounded-full border border-white`}
						style="background-image: url('{aiImage}');"
					/>
					Thinking
					<Typewriter mode="loop">...</Typewriter>
				</div>
			{/if}
		</div>
	{:else}
		<!-- TODO: waiting for conversation initialization UI -->
		<h4>Initializing Conversation...</h4>
	{/if}

	<button
		disabled={waitingForAIResponse || transcribing}
		on:click={toggleRecording}
		class="absolute bg-white/[0.8] mx-auto bottom-4 w-[44px] h-[44px] shadow-all rounded-xl flex items-center justify-center z-[1000]"
	>
		{#if $isRecording}
			<div class="bg-red-600 rounded-full w-[15%] aspect-square absolute top-1 right-2" />
		{/if}
		<svg class="w-[35%]" viewBox="0 0 41 56" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.5 35.25C18.1042 35.25 16.0677 34.4115 14.3906 32.7344C12.7135 31.0573 11.875 29.0208 11.875 26.625V9.375C11.875 6.97917 12.7135 4.94271 14.3906 3.26562C16.0677 1.58854 18.1042 0.75 20.5 0.75C22.8958 0.75 24.9323 1.58854 26.6094 3.26562C28.2865 4.94271 29.125 6.97917 29.125 9.375V26.625C29.125 29.0208 28.2865 31.0573 26.6094 32.7344C24.9323 34.4115 22.8958 35.25 20.5 35.25ZM17.625 55.375V46.5344C12.6417 45.8635 8.52083 43.6354 5.2625 39.85C2.00417 36.0646 0.375 31.6562 0.375 26.625H6.125C6.125 30.6021 7.52704 33.9917 10.3311 36.7939C13.1333 39.598 16.5229 41 20.5 41C24.4771 41 27.8677 39.598 30.6718 36.7939C33.4739 33.9917 34.875 30.6021 34.875 26.625H40.625C40.625 31.6562 38.9958 36.0646 35.7375 39.85C32.4792 43.6354 28.3583 45.8635 23.375 46.5344V55.375H17.625Z"
				fill="black"
			/>
		</svg>
	</button>
</div>
