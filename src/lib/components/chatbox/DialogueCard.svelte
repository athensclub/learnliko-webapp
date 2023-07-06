<script lang="ts">
	import type { RecapHistoryItem } from '$lib/global/chatbox';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import VoiceChatHistory from './VoiceChatHistory.svelte';
	import userImage from '$lib/images/sample_kid_image.png';
	import { round } from '$lib/utils/math';
	import type { ConversationHistoryItem } from '$lib/types/conversationData';
	import { profileImageLocal } from '$lib/localdb/profileLocal';
	import { each } from 'svelte/internal';

	export let dialogueNumber: number;
	export let assistantProfileImage: string;
	export let dialogue: RecapHistoryItem;

	dialogue.suggestion = dialogue.suggestion
		? dialogue.suggestion
		: "There's no suggestion for this dialogue.";

	const mockHistory: ConversationHistoryItem[] = [
		{ chat: dialogue.assistant },
		{ chat: dialogue.user! }
	];
</script>

<div class="mx-auto mb-5 mt-5 flex w-[100%] flex-col rounded-xl border-2 bg-[#F8F8F8] pb-4">
	<div class="mt-3 flex flex-row items-center justify-between px-3 text-xl font-bold">
		Dialogue {dialogueNumber}

		<div class="rounded-lg bg-black px-2 text-center text-base text-white">
			<!-- round to 2 decimal places https://stackoverflow.com/a/11832950 -->
			{round(dialogue.score, 2).toLocaleString()}%
		</div>
	</div>

	<div class="w-[100%] px-3">
		<!-- TODO: use actual profile image from cloud db. -->
		<VoiceChatHistory
			userBackgroundColor="#6C80E8"
			aiBackgroundColor="#6C80E8"
			showAssistantTranscription
			history={mockHistory}
			{assistantProfileImage}
			userProfileImage={$profileImageLocal ?? ''}
		/>
	</div>

	<div class="mt-3 w-full px-5 text-base font-bold">Suggestion</div>
	<div class="mt-2 px-5">
		{#if dialogue.advancementExample.length > 0}
			<p class=" font-bold text-gray-700">
				เพื่อยกระดับภาษาในการสนทนาของคุณ ลองใช้ตัวอย่างต่อไปนี้:
			</p>
			{#each dialogue.advancementExample as example}
				"{example}"<br />
			{/each}
			<br />
		{/if}
		{#if dialogue.grammarExample.length > 0}
			<p class=" font-bold text-gray-700">นี่คือตัวอย่างของการสนทนาที่ถูกต้องตามไวยากรณ์:</p>
			{#each dialogue.grammarExample as example}
				"{example}"<br />
			{/each}
		{/if}
		<!-- <ReadMore textContent={dialogue.suggestion} maxChars={80} /> -->
	</div>
</div>
