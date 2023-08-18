<script lang="ts">
	import {
		chatContext,
		currentChatboxView,
		onRecapFinished,
		recapResult,
		showChatbox
	} from '$lib/global/chatbox';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import DialogueCard from './DialogueCard.svelte';
	import { round } from '$lib/utils/math';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import type { Context } from 'svelte-simple-modal';
	import { getContext } from 'svelte';
	import summaryImage from './recap_summary_image.png';
	import { isMobile } from '$lib/global/breakpoints';

	// we have to wait for recapHistory to finish loading.
	// $: totalScore = $recapHistory ? $recapHistory.map((x) => x.score).reduce((x, y) => x + y, 0) : 0;
	const { open }: Context = getContext('simple-modal');
	const hide = () =>
		open(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to end the recap?',
			onConfirm: () => {
				$onRecapFinished();
			}
		});
</script>

{#if $recapResult && $chatContext}
	<div class="relative flex h-[60px] w-full items-center justify-between text-lg font-bold">
		<div class="mx-[4vw] {$isMobile ? 'text-[5vw]' : 'text-[2vw]'}">คะแนนและคำแนะนำ</div>
		<button
			on:click={hide}
			class="ml-auto mr-4 h-[35px] rounded-full bg-[#6C80E8] px-5 text-center text-base text-white {$isMobile
				? 'text-[8vw]'
				: 'text-[3vw]'}"
		>
			เสร็จสิ้น
		</button>
	</div>

	<div class="h-[calc(100%-48px)] w-full overflow-y-auto px-[2vw]">
		<div
			style="background-image: url('{$chatContext.conversation.background}');"
			class="flex w-full flex-row items-center justify-between overflow-hidden rounded-[4vw] bg-cover bg-center {$isMobile
				? 'h-[32vw]'
				: 'h-[18vw] '}"
		>
			<div
				class="ont-bold flex h-full flex-col justify-center bg-gradient-to-r from-black/80 via-black/60 to-transparent text-white {$isMobile
					? 'px-[6vw]'
					: 'px-[2vw] '}"
			>
				<div class={$isMobile ? 'text-[4vw]' : 'text-[1.7vw]'}>Your score</div>
				<div class={$isMobile ? 'text-[8vw]' : 'text-[4vw]'}>
					{round($recapResult.score, 2).toLocaleString()}%
				</div>

				<div class="flex w-full flex-row justify-end {$isMobile ? 'text-[4.5vw]' : 'text-[1.5vw]'}">
					
				</div>
			</div>

			<div
				class="flex h-full flex-col justify-end bg-gradient-to-l from-black/80 via-black/60 to-transparent"
			>
				<img
					class="relative top-[5vw] {$isMobile ? 'w-[17vw]' : 'w-[10vw]'}"
					src={$chatContext.conversation.avatar.models.neutral}
					alt="Congratulations"
				/>
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
	<div class="flex h-full w-full flex-col items-center bg-[#50556C] text-white">
		<iframe
			class="mt-[3.5vw] aspect-[4/3] w-full"
			title="Loading"
			style="border: none"
			src="https://rive.app/community/4896-9912-rig-demo/embed"
		/>
		<div class="flex flex-row font-bold {$isMobile ? 'text-[5vw]' : 'text-[1.35vw]'}">
			ระบบกำลังให้คะแนน<Typewriter mode="loop">...</Typewriter>
		</div>
	</div>
{/if}
