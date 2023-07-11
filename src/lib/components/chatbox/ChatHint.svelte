<script lang="ts">
	import { synthesize } from '$api/tts';
	import { playAudioURL } from '$lib/global/audio';
	import { blobToBase64 } from '$lib/utils/io';
	import { onMount } from 'svelte';

	export let text: string;

	let speech: string | null = null;

	// TODO: use data from api instead.
	const loadSpeech = async () => {
		const val = await synthesize(text, 'US', 'FEMALE', 0.65);
		speech = await blobToBase64(val);
	};
	onMount(() => loadSpeech());

	const playSpeechAudio = () => {
		if (speech === null) return;
		playAudioURL(speech);
	};
</script>

<div class=" flex flex-col items-end px-4">
	<h4 class=" mb-1 text-xs font-bold">Help</h4>
	<button
		on:click={playSpeechAudio}
		class="flex h-[44px] flex-row items-center justify-center rounded-full border border-white px-2 text-xs text-white opacity-50"
	>
		{text}🔉
	</button>
</div>
