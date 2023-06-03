<script lang="ts">
	import { showChatbox } from '$lib/global/chatbox';
	import { showModal } from '$lib/global/modal';
	import ConfirmModal from '../modals/ConfirmModal.svelte';
	import assistantProfileImage from '$lib/images/assistant.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';

	let history: {
		role: 'user' | 'assistant';
		text: string;
	}[] = [
		{ role: 'assistant', text: 'Hello. How can I help you?' },
		{ role: 'user', text: 'Hello. How can I help you?' }
	];

	const hide = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => ($showChatbox = false)
		});
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
		<div class={`flex flex-col px-4 w-full ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
			<div
				class={`flex pt-6 flex-row items-center  w-full ${
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

				<div class={`mx-3 border border-black/[0.15] py-2 px-5 rounded-xl`}>{chat.text}</div>
			</div>
		</div>
	{/each}
</div>

<div class="absolute bottom-[86px] flex flex-row gap-6 font-line-seed w-full px-4 overflow-x-auto overflow-y-hidden">
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
		<input class="bg-[#E6E6E657] h-fit flex-1 text-lg rounded-3xl px-5 py-1" type="text" />

		<button class="bg-[#9BA1FD] py-1 px-3 rounded-xl ml-3">Send</button>
	</div>
</div>
