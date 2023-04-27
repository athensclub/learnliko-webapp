<script lang="ts">
	import { recapHistory, showChatbox } from '$lib/global/chatbox';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { showModal } from '$lib/global/modal';
	import DialogueCard from './DialogueCard.svelte';
	import { round } from '$lib/utils/math';

	const totalScore = $recapHistory.map((x) => x.score).reduce((x, y) => x + y, 0);

	const hide = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to end the recap?',
			onConfirm: () => ($showChatbox = false)
		});
</script>

<div
	class="flex items-center justify-between w-full h-[48px] font-bold text-lg border-b border-black/[0.15] relative"
>
	<div class="flex flex-row ml-4">
		You got
		<div class="font-extrabold ml-2">{round(totalScore, 2).toLocaleString()} point</div>
	</div>

	<button
		on:click={hide}
		class="rounded-lg mr-4 px-3 text-base text-center text-white h-[28px] bg-gradient-to-r from-[#9BA1FD] to-[#FFABAB]"
	>
		Finish
	</button>
</div>

<div class="w-full h-[calc(100%-48px)] overflow-y-auto">
	{#each $recapHistory as dialogue, index (index)}
		{#if dialogue.user}
			<DialogueCard dialogueNumber={index + 1} {dialogue} />
		{/if}
	{/each}
</div>
