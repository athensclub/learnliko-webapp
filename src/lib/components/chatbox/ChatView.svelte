<script lang="ts">
	import { assistantChat, chat } from '$api/conversation';
	import { synthesize, type SynthesizeAccent, type SynthesizeGender } from '$api/tts';
	import { playAudioURL } from '$lib/global/audio';
	import { isRecording, startRecording } from '$lib/global/recording';
	import { profileImageLocal } from '$lib/localdb/profileLocal';
	import { addChatHistory } from '$lib/temp/analytic';
	import { blobToBase64 } from '$lib/utils/io';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import Recorder from './Recorder.svelte';
	import { currentRecording } from '$lib/global/conversation';
	import { transcribe } from '$api/transcription';

	export let intro: string;
	export let prompt: string;
	export let aiBackground: string;
	export let aiImage: string;
	export let aiName: string;
	export let accent: SynthesizeAccent;
	export let gender: SynthesizeGender;

	export let scale = 1;

	let history: (ChatCompletionRequestMessage & {
		transcription?: string;
	})[] = [];
	let aiThinking = false;
	let transcribing = false;
	let currentInput = '';

	const submitAudio = async (recording: { data: Blob; url: string }) => {
		transcribing = true;
		const result = await transcribe(recording.data);
		transcribing = false;

		submitText(result);
	};

	const submitCurrent = async () => {
		if (currentInput.trim().length === 0) return;
		submitText(currentInput);
		currentInput = '';
	};

	const submitText = async (input: string) => {
		aiThinking = true;

		history = [
			...history,
			{
				role: 'user',
				content: input
			},
			{
				role: 'assistant',
				content: ''
			}
		];

		await assistantChat(
			history.slice(0, history.length - 1).map((c) => ({ ...c, transcription: undefined })),
			(token) =>
				(history[history.length - 1] = {
					...history[history.length - 1],
					content: history[history.length - 1].content + token
				})
		);

		history[history.length - 1] = {
			...history[history.length - 1],
			transcription: await blobToBase64(
				await synthesize(history[history.length - 1].content!, accent, gender)
			)
		};
		addChatHistory(input, history[history.length - 1].content!, aiName);

		aiThinking = false;
	};

	onMount(async () => {
		aiThinking = true;
		history = [
			{
				role: 'system',
				content: prompt
			},
			{
				role: 'assistant',
				content: intro,
				transcription: await blobToBase64(await synthesize(intro, accent, gender))
			}
		];
		aiThinking = false;
	});
</script>

<div class="flex max-h-full w-full flex-col gap-[5vw] overflow-y-auto p-[6vw]">
	{#each history as chat}
		{#if chat.role !== 'system'}
			<div class="flex gap-[4vw] {chat.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}">
				<div
					style="background-color: {chat.role === 'assistant' ? aiBackground : ''};
                           background-image: url('{chat.role === 'assistant'
						? aiImage
						: $profileImageLocal}'); 
						min-height: {15 * scale}vw;
						max-height: {15 * scale}vw;
						min-width: {15 * scale}vw;
						max-width: {15 * scale}vw; "
					class="rounded-full bg-cover bg-center"
				/>

				<button
					on:click={() => playAudioURL(chat.transcription ?? '')}
					disabled={chat.role === 'user'}
					style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25); 
					font-size: {4.5 * scale}vw; 
					padding: {5 * scale}vw;"
					class="flex max-w-[80%] flex-row whitespace-pre-wrap rounded-[5vw] text-start font-bold"
				>
					{chat.content}

					{#if chat.transcription}
						<div class="ml-[5vw] flex h-full flex-col justify-end">
							<svg
								class="w-[4vw]"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect y="5" width="3" height="7" rx="1.5" fill="#545454" />
								<rect x="12" y="5" width="3" height="6" rx="1.5" fill="#545454" />
								<rect x="6" width="3" height="15" rx="1.5" fill="#545454" />
							</svg>
						</div>
					{/if}
				</button>
			</div>
		{/if}
	{/each}

	{#if transcribing}
		<div class="ml-auto mr-[4vw] flex flex-row text-[5vw] font-bold">
			transcribing<Typewriter mode="loop">...</Typewriter>
		</div>
	{/if}
	<!-- Bottom spacing -->
	<div class="min-h-[30vw] w-full" />
</div>

{#if $isRecording || $currentRecording}
	<Recorder
		submitRecording={(recording) => submitAudio(recording)}
		allowHint={false}
		class="absolute bottom-[6vw] left-[50%] w-[90%] translate-x-[-50%]"
	/>
{:else}
	<div
		style="box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25); "
		class="absolute bottom-[6vw] left-[50%] flex w-[90%] translate-x-[-50%] flex-row gap-[2.5vw] rounded-[4vw] bg-white p-[4vw]"
	>
		{#if aiThinking || transcribing}
			<div style="font-size: {5 * scale}vw;" class="flex flex-row font-bold">
				{aiName} กำลังคิด<Typewriter mode="loop">...</Typewriter>
			</div>
		{:else}
			<textarea
				bind:value={currentInput}
				placeholder="Typing..."
				style="font-size: {4 * scale}vw;"
				class="flex h-[9vw] flex-1 rounded-full bg-[#F2F2F2] px-[5vw] pt-[1vw] font-bold"
			/>

			<button
				on:click={startRecording}
				class="flex items-center justify-center rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[4vw]"
			>
				<svg class="w-[2.5vw]" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8.39439 12.875C7.51039 12.875 6.75898 12.5758 6.14018 11.9773C5.52138 11.3789 5.21197 10.6522 5.21197 9.79729V3.64182C5.21197 2.78689 5.52138 2.06021 6.14018 1.46176C6.75898 0.863311 7.51039 0.564087 8.39439 0.564087C9.2784 0.564087 10.0298 0.863311 10.6486 1.46176C11.2674 2.06021 11.5768 2.78689 11.5768 3.64182V9.79729C11.5768 10.6522 11.2674 11.3789 10.6486 11.9773C10.0298 12.5758 9.2784 12.875 8.39439 12.875ZM7.33358 20.0564V16.9017C5.49485 16.6623 3.97437 15.8673 2.77212 14.5165C1.56987 13.1657 0.96875 11.5926 0.96875 9.79729H3.09036C3.09036 11.2165 3.60768 12.426 4.64232 13.4259C5.67625 14.4265 6.92694 14.9268 8.39439 14.9268C9.86184 14.9268 11.1129 14.4265 12.1475 13.4259C13.1815 12.426 13.6984 11.2165 13.6984 9.79729H15.82C15.82 11.5926 15.2189 13.1657 14.0167 14.5165C12.8144 15.8673 11.2939 16.6623 9.4552 16.9017V20.0564H7.33358Z"
						fill="white"
					/>
				</svg>
			</button>

			<button
				on:click={submitCurrent}
				class="flex items-center justify-center rounded-full bg-[#F4F4F4] px-[4vw]"
			>
				<svg class="w-[4vw]" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M47.468 1.38637L15.9101 11.8742C-5.30336 18.9709 -5.30336 30.5425 15.9101 37.6043L25.2761 40.7157L28.3864 50.0848C35.4459 71.3051 47.0486 71.3051 54.1081 50.0848L64.6275 18.5514C69.3105 4.39287 61.6219 -3.33314 47.468 1.38637ZM48.5863 20.1945L35.3061 33.549C34.7819 34.0734 34.1179 34.3181 33.4538 34.3181C32.7898 34.3181 32.1258 34.0734 31.6016 33.549C30.5881 32.5352 30.5881 30.8572 31.6016 29.8433L44.8818 16.4888C45.8953 15.475 47.5728 15.475 48.5863 16.4888C49.5998 17.5026 49.5998 19.1807 48.5863 20.1945Z"
						fill="#6C80E8"
					/>
				</svg>
			</button>
		{/if}
	</div>
{/if}
