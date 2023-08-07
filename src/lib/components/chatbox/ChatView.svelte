<script lang="ts">
	import { chat } from '$api/conversation';
	import { synthesize } from '$api/tts';
	import { playAudioURL } from '$lib/global/audio';
	import { profileImageLocal } from '$lib/localdb/profileLocal';
	import { blobToBase64 } from '$lib/utils/io';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	export let intro: string;
	export let prompt: string;
	export let aiBackground: string;
	export let aiImage: string;
	export let aiName: string;

	let history: (ChatCompletionRequestMessage & { transcription?: string })[] = [];
	let aiThinking = false;
	let currentInput = '';

	const submitCurrent = async () => {
		aiThinking = true;

		history = [
			...history,
			{
				role: 'user',
				content: currentInput
			}
		];
		currentInput = '';

		const result = await chat(history.map((c) => ({ ...c, transcription: undefined })));
		history = [
			...history,
			{
				role: 'assistant',
				content: result,
				transcription: await blobToBase64(await synthesize(result, 'US', 'FEMALE'))
			}
		];

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
				content: 'Hello!',
				transcription: await blobToBase64(await synthesize(intro, 'US', 'FEMALE'))
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
						: $profileImageLocal}');"
					class="max-h-[15vw] min-h-[15vw] min-w-[15vw] max-w-[15vw] rounded-full bg-cover bg-center"
				/>

				<button
					on:click={() => playAudioURL(chat.transcription ?? '')}
					disabled={chat.role === 'user'}
					style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);"
					class="flex text-start max-w-[80%] flex-row rounded-[5vw] p-[5vw] text-[4.5vw] font-bold"
				>
					{chat.content}

					{#if chat.transcription}
						<div class="flex h-full flex-col justify-end ml-[5vw]">
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
	<!-- Bottom spacing -->
	<div class="min-h-[30vw] w-full" />
</div>

<div
	style="box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25); "
	class="absolute bottom-[6vw] left-[50%] mx-auto flex w-[90%] translate-x-[-50%] flex-row gap-[4vw] rounded-[4vw] bg-white p-[4vw]"
>
	{#if aiThinking}
		<div class="flex flex-row text-[5vw] font-bold">
			{aiName} กำลังคิด<Typewriter mode="loop">...</Typewriter>
		</div>
	{:else}
		<input
			bind:value={currentInput}
			placeholder="Typing..."
			class="flex flex-1 rounded-full bg-[#F2F2F2] px-[5vw] text-[4vw] font-bold"
		/>

		<button
			on:click={submitCurrent}
			class="flex items-center justify-center rounded-full bg-[#F4F4F4] px-[4vw] py-[2vw]"
		>
			<svg class="w-[6vw]" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M47.468 1.38637L15.9101 11.8742C-5.30336 18.9709 -5.30336 30.5425 15.9101 37.6043L25.2761 40.7157L28.3864 50.0848C35.4459 71.3051 47.0486 71.3051 54.1081 50.0848L64.6275 18.5514C69.3105 4.39287 61.6219 -3.33314 47.468 1.38637ZM48.5863 20.1945L35.3061 33.549C34.7819 34.0734 34.1179 34.3181 33.4538 34.3181C32.7898 34.3181 32.1258 34.0734 31.6016 33.549C30.5881 32.5352 30.5881 30.8572 31.6016 29.8433L44.8818 16.4888C45.8953 15.475 47.5728 15.475 48.5863 16.4888C49.5998 17.5026 49.5998 19.1807 48.5863 20.1945Z"
					fill="#6C80E8"
				/>
			</svg>
		</button>
	{/if}
</div>
