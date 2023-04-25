<script lang="ts">
	import type { RecapHistoryItem } from "$lib/global/chatbox";

	export let dialogueNumber: number;
    export let dialogue: RecapHistoryItem;
</script>

<div class="w-[95%] mx-auto mt-3 rounded-xl flex flex-col bg-[#F8F8F8]">
	<div class="flex flex-row justify-between text-xl font-bold items-center px-3">
		Dialogue {dialogueNumber}

		<div class="rounded-lg bg-black text-base text-center text-white px-2">{dialogue.score} Point</div>
	</div>
</div>
