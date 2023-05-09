<script lang="ts">
	import type { RecapHistoryItem } from '$lib/global/chatbox';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import VoiceChatHistory from './VoiceChatHistory.svelte';
	import userImage from '$lib/images/sample_kid_image.png';
	import { round } from '$lib/utils/math';

	export let dialogueNumber: number;
	export let assistantProfileImage: string;
	export let dialogue: RecapHistoryItem;

	dialogue.suggestion = dialogue.suggestion
		? dialogue.suggestion
		: "There's no suggestion for this dialogue.";

	console.log(dialogue);

	const mockHistory = [dialogue.assistant, dialogue.user!];
</script>

<div class="w-[95%] mx-auto mt-3 rounded-xl flex flex-col bg-[#F8F8F8] pb-4">
	<div class="flex flex-row justify-between text-xl font-bold items-center px-3 mt-3">
		Dialogue {dialogueNumber}

		<div class="rounded-lg bg-black text-base text-center text-white px-2">
			<!-- round to 2 decimal places https://stackoverflow.com/a/11832950 -->
			{round(dialogue.score * 100, 2).toLocaleString()}%
		</div>
	</div>

	<div class="w-full px-3">
		<VoiceChatHistory
			showAssistantTranscription
			history={mockHistory}
			assistantProfileImage={assistantProfileImage}
			userProfileImage={userImage}
		/>
	</div>

	<div class="w-full font-bold text-base mt-3">Suggestion</div>
	<div class="px-3 mt-2">
		<ReadMore textContent={dialogue.suggestion} maxChars={80} />
	</div>
</div>
