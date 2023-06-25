<script lang="ts">
	import { chatContext, currentChatboxView, recapResult, showChatbox } from '$lib/global/chatbox';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import DialogueCard from './DialogueCard.svelte';
	import { round } from '$lib/utils/math';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import type { Context } from 'svelte-simple-modal';
	import { getContext } from 'svelte';
	import summaryImage from './recap_summary_image.png';

	// we have to wait for recapHistory to finish loading.
	// $: totalScore = $recapHistory ? $recapHistory.map((x) => x.score).reduce((x, y) => x + y, 0) : 0;
	const { open }: Context = getContext('simple-modal');
	const hide = () =>
		open(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to end the recap?',
			onConfirm: () => {
				$showChatbox = false;
			}
		});
</script>

{#if $recapResult && $chatContext}
	<div class="flex items-center justify-between w-full h-[48px] font-bold text-lg relative">
		<button
			on:click={hide}
			class="rounded-lg ml-auto mr-4 px-3 text-base text-center text-white h-[28px] bg-[#6C80E8]"
		>
			Finish
		</button>
	</div>

	<div class="w-full px-[2vw] h-[calc(100%-48px)] overflow-y-auto">
		<div
			class="flex flex-row items-center justify-between w-full rounded-[2vw] px-[2vw] pt-[2vh] bg-gradient-to-r from-[#C698FF] to-[#FFD281]"
		>
			<div class="flex flex-col font-bold text-white">
				<div class="text-[1.7vw]">Your score</div>
				<div class="text-[4vw]">{$recapResult.score}</div>
				<div class="text-[2vw]">+ 🧿{$recapResult.coins}</div>
			</div>

			<div class="flex flex-col w-[50%] h-full justify-end">
				<img class="w-full" src={summaryImage} alt="Congratulations" />
			</div>
		</div>

		{#each $recapResult.history as dialogue, index (index)}
			{#if dialogue.user}
				<DialogueCard
					dialogueNumber={index + 1}
					{dialogue}
					assistantProfileImage={$chatContext.conversation.avatar.models.neutral}
				/>
			{/if}
		{/each}
	</div>
{:else}
	<div class="w-full h-full flex flex-col items-center bg-[#50556C] text-white">
		<iframe
			class="w-full aspect-[4/3] mt-[3.5vw]"
			title="Loading"
			style="border: none"
			src="https://rive.app/community/4896-9912-rig-demo/embed"
		/>
		<div class="flex flex-row text-[1.35vw] font-bold">
			ระบบกำลังให้คะแนน<Typewriter mode="loop">...</Typewriter>
		</div>
	</div>
{/if}
