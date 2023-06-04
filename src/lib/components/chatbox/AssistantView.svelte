<script lang="ts">
	import { showChatbox } from '$lib/global/chatbox';
	import { showModal } from '$lib/global/modal';
	import ConfirmModal from '../modals/ConfirmModal.svelte';
	import assistantProfileImage from '$lib/images/assistant.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { assistantChat } from '$api/conversation';
	import type { ChatMessage } from '$lib/types/requests/chatCompletion';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	let history: ChatMessage[] = [
		{
			role: 'system',
			content:
				'You are a female assistant for website Learnliko. You must assist the user in using the website using given information about the website. All of your answers must be in Thai language. Do not answer in English language.'
		},
		{ role: 'assistant', content: 'สวัสดี มีอะไรให้ฉันช่วยบ้าง' }
	];
	let currentText = '';
	let waitingForAIResponse = false;

	const hide = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => ($showChatbox = false)
		});

	const submitText = async () => {
		if (currentText.length === 0 || waitingForAIResponse) return;

		history = [...history, { role: 'user', content: currentText }];
		currentText = '';

		waitingForAIResponse = true;
		const assistantAnswer = await assistantChat(history);
		history = [...history, { role: 'assistant', content: assistantAnswer }];
		waitingForAIResponse = false;
	};

	const onKeyPressed = (e: KeyboardEvent) => {
		if (e.key === 'Enter') submitText();
	};

	// assistantChat(history).then(console.log).catch(console.log);
</script>

<div
	class="z-10 flex items-center justify-center w-full h-[48px] font-bold text-md border-b border-black/[0.15] relative"
>
	<h1>Assistant</h1>
	<div class="flex flex-row absolute right-0">
		<button
			on:click={hide}
			class="rounded-full border border-black/[0.15] h-[28px] aspect-square text-sm"
		>
			✕
		</button>
	</div>
</div>

<div class="w-full h-[calc(100%-48px-64px)] overflow-y-auto font-line-seed">
	{#each history as chat, index (index)}
		{#if chat.role !== 'system'}
			<div
				class={`flex pt-6 flex-row items-center w-full ${
					chat.role === 'user' ? 'flex-row-reverse' : ''
				}`}
			>
				{#if chat.role === 'assistant'}
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{assistantProfileImage}'), linear-gradient(#9BA1FD, #FFA7A7);"
					/>
				{/if}

				{#if chat.role === 'user'}
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>
				{/if}

				<div class={`mx-3 max-w-[75%] border border-black/[0.15] py-2 px-5 rounded-xl`}>{chat.content}</div>
			</div>
		{/if}
	{/each}

	{#if waitingForAIResponse}
		<div class="flex flex-row items-center">
			<div
				class={`w-[42px] h-[42px] bg-center bg-cover rounded-full mr-3`}
				style="background-image: url('{assistantProfileImage}'), linear-gradient(#9BA1FD, #FFA7A7);"
			/>
			Thinking
			<Typewriter mode="loop">...</Typewriter>
		</div>
	{/if}
</div>

<div
	class="absolute bottom-[86px] flex flex-row gap-6 font-line-seed w-full px-4 overflow-x-auto overflow-y-hidden"
>
	<button class="text-sm border border-black/[0.15] py-2 px-5 rounded-2xl whitespace-nowrap">
		How to start a conversation?
	</button>
	<button class="text-sm border border-black/[0.15] py-2 px-5 rounded-2xl whitespace-nowrap">
		How to start a conversation?
	</button>
	<button class="text-sm border border-black/[0.15] py-2 px-5 rounded-2xl whitespace-nowrap">
		How to start a conversation?
	</button>
</div>

<div class="w-full h-[64px] font-line-seed">
	<div class="flex flex-row">
		<input
			on:keypress={onKeyPressed}
			bind:value={currentText}
			class="bg-[#E6E6E657] h-fit flex-1 text-lg rounded-3xl px-5 py-1"
			type="text"
		/>

		<button on:click={submitText} class="bg-[#9BA1FD] py-1 px-3 rounded-xl ml-3">Send</button>
	</div>
</div>
