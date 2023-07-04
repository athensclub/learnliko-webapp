<script lang="ts">
	import type { RecapHistoryItem } from '$lib/global/chatbox';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import VoiceChatHistory from './VoiceChatHistory.svelte';
	import userImage from '$lib/images/sample_kid_image.png';
	import { round } from '$lib/utils/math';
	import type { ConversationHistoryItem } from '$lib/types/conversationData';
	import { profileImageLocal } from '$lib/localdb/profileLocal';

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

<div class="w-[100%] mb-5 mt-5 mx-auto rounded-xl flex flex-col bg-[#F8F8F8] border-2 pb-4">
	<div class="flex flex-row justify-between text-xl font-bold items-center px-3 mt-3">
		Dialogue {dialogueNumber}

		<div class="rounded-lg bg-black text-base text-center text-white px-2">
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

	<div class="w-full font-bold text-base mt-3 px-5">Suggestion</div>
	<div class="px-5 mt-2">
		<ReadMore textContent={dialogue.suggestion} maxChars={80} />
	</div>
</div>
