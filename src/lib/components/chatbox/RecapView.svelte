<script lang="ts">
	import { chatContext, currentChatboxView, recapHistory, showChatbox } from '$lib/global/chatbox';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import DialogueCard from './DialogueCard.svelte';
	import { round } from '$lib/utils/math';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import type { Context } from 'svelte-simple-modal';
	import { getContext } from 'svelte';

	// we have to wait for recapHistory to finish loading.
	$: totalScore = $recapHistory ? $recapHistory.map((x) => x.score).reduce((x, y) => x + y, 0) : 0;

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

{#if $recapHistory && $chatContext}
	<div
		class="flex items-center justify-between w-full h-[48px] font-bold text-lg border-b border-black/[0.15] relative"
	>
		<div class="flex flex-row ml-4">
			You got
			<div class="font-extrabold ml-2">
				{round((totalScore / $recapHistory.length) * 100, 2).toLocaleString()}%
			</div>
		</div>

		<button
			on:click={hide}
			class="rounded-lg mr-4 px-3 text-base text-center text-white h-[28px] bg-[#6C80E8]"
		>
			Finish
		</button>
	</div>

	<div class="w-[full] px-[2vw] h-[calc(100%-48px)] overflow-y-auto">
		{#each $recapHistory as dialogue, index (index)}
			{#if dialogue.user}
				<DialogueCard
					dialogueNumber={index + 1}
					{dialogue}
					assistantProfileImage={$chatContext.conversation.details.bot.avatar}
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

