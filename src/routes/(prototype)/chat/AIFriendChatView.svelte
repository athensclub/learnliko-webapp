<script lang="ts">
	import { aiFriendCurrentView, selectedAIFriend } from './+page.svelte';
	import { hideBottomNavBar } from '../+layout.svelte';
	import { onDestroy, onMount } from 'svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	import { synthesize } from '$api/tts';
	import { blobToBase64 } from '$lib/utils/io';
	import { profileImageLocal } from '$lib/localdb/profileLocal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { chat } from '$api/conversation';

	let history: (ChatCompletionRequestMessage & { transcription?: string })[] = [];
	let currentInput = '';

	let aiThinking = false;

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
		$hideBottomNavBar = true;

		aiThinking = true;
		history = [
			{
				role: 'system',
				content: $selectedAIFriend?.prompt
			},
			{
				role: 'assistant',
				content: 'Hello!',
				transcription: await blobToBase64(await synthesize('Hello!', 'US', 'FEMALE'))
			}
		];
		aiThinking = false;
	});

	onDestroy(async () => {
		$hideBottomNavBar = false;
	});
</script>

<div class="relative flex h-full max-h-[100vh] w-full flex-col">
	{#if $selectedAIFriend}
		<div
			style="box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);"
			class="flex w-full flex-row items-center gap-[4vw] p-[6vw]"
		>
			<button on:click={() => ($aiFriendCurrentView = 'DETAILED')} class="">
				<svg class="w-[5vw]" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M22.5458 10.1252C23.1483 10.1252 23.6367 9.62151 23.6367 9.00021C23.6367 8.37891 23.1483 7.87521 22.5458 7.87521L22.5458 10.1252ZM0.683482 8.20469C0.25752 8.64404 0.25752 9.35639 0.683482 9.79574L7.62603 16.9552C8.05206 17.3945 8.74276 17.3945 9.16879 16.9552C9.59483 16.5158 9.59483 15.8035 9.16879 15.3642L2.99766 9.00021L9.16879 2.63624C9.59483 2.19689 9.59483 1.48461 9.16879 1.04526C8.74275 0.605913 8.05206 0.605913 7.62603 1.04526L0.683482 8.20469ZM22.5458 7.87521L1.4549 7.87521L1.4549 10.1252L22.5458 10.1252L22.5458 7.87521Z"
						fill="black"
						fill-opacity="0.8"
					/>
				</svg>
			</button>

			<div
				style="background-color: {$selectedAIFriend.backgroundColor};
					   background-image: url('{$selectedAIFriend.imageProfile}');"
				class="min-h-[17vw] min-w-[17vw] rounded-full bg-cover bg-center"
			/>

			<div class="flex flex-col">
				<div class="text-[4vw] font-bold">{$selectedAIFriend.role}</div>
				<div class="text-[6vw] font-bold">{$selectedAIFriend.name}</div>
			</div>
		</div>

		<div class="flex w-full flex-1 flex-col gap-[5vw] overflow-y-auto p-[6vw]">
			{#each history as chat}
				{#if chat.role !== 'system'}
					<div class="flex gap-[4vw] {chat.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}">
						<div
							style="background-color: {chat.role === 'assistant'
								? $selectedAIFriend.backgroundColor
								: ''};
					               background-image: url('{chat.role === 'assistant'
								? $selectedAIFriend.imageProfile
								: $profileImageLocal}');"
							class="max-h-[15vw] min-h-[15vw] min-w-[15vw] max-w-[15vw] rounded-full bg-cover bg-center"
						/>

						<div
							style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.25);"
							class="flex flex-row rounded-[5vw] p-[5vw] text-[4.5vw] font-bold"
						>
							{chat.content}
						</div>
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
					{$selectedAIFriend.name} กำลังคิด<Typewriter mode="loop">...</Typewriter>
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
	{/if}
</div>
