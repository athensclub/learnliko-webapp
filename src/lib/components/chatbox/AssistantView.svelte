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
		{ role: 'assistant', text: 'สวัสดี ฉันคือผู้ช่วยของเธอ ฉันสามารถให้ความช่วยเหลือในการใช้งาน Learnliko รวมถึงให้ความช่วยเหลือด้านภาษาอังกฤษ เช่น การแปลคำศัพท์, การใช้แกรมมา และ อื่นๆ' },
		{ role: 'user', text: 'Metaverse แปลว่าอะไร' }
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
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full bg-[#FFD281]`}
						style="background-image: url('{assistantProfileImage}');"
					/>
				{/if}

				{#if chat.role === 'user'}
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>
				{/if}

			</div>
			<div class={`mx-3 border border-black/[0.15] py-2 px-5 rounded-xl max-w-[18rem] mt-6`}>{chat.text}</div>
		</div>
	{/each}
</div>

<div class="absolute bottom-[86px] flex flex-row gap-6 font-line-seed w-full px-4 overflow-x-auto overflow-y-hidden pb-6">
    <button class="text-sm border border-black/[0.15] py-2 px-5 rounded-full whitespace-nowrap">
        สอนการแนะนำตัว
    </button>
    <button class="text-sm border border-black/[0.15] py-2 px-5 rounded-full whitespace-nowrap">
        สอนการทักทายผู้อื่น
    </button>
    <button class="text-sm border border-black/[0.15] py-2 px-5 rounded-full whitespace-nowrap">
        การใช้งานระบบ Reading
    </button>
	<button class="text-sm border border-black/[0.15] py-2 px-5 rounded-full whitespace-nowrap">
        ช่วยฉันแปลประโยค
    </button>
</div>

<div class="w-full h-[64px] font-line-seed">
	<div class="flex flex-row">
		<input class="bg-[#E6E6E657] h-fit flex-1 text-lg rounded-full px-5 py-1" type="text" />

		<button class="bg-[#979DFF] py-1 px-3 rounded-full ml-3 text-white">Send</button>
	</div>
</div>
