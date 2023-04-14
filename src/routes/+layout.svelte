<script>
	import '../app.css';
	import Chatbox from '$lib/components/Chatbox.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import { onMount } from 'svelte';
	import { audioRecording, initializeAudioRecording } from '$lib/global/audio/recording';

	onMount(() => {
		initializeAudioRecording();
	});
</script>

<div class="w-[100vw] h-[1px] min-h-[100vh]">
	<slot />

	{#if $showChatbox}
		<div class="fixed right-0 bottom-0 w-[40vw] h-[65vh]">
			<Chatbox />
		</div>
	{/if}
</div>
