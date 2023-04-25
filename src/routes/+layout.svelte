<script>
	import '../app.css';
	import Chatbox from '$lib/components/chatbox/Chatbox.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import { onMount } from 'svelte';
	import { audioRecording, initializeAudioRecording, resetRecordingData } from '$lib/global/recording';
	import Modal from 'svelte-simple-modal';
	import { modal } from '$lib/global/modal';
	import { browser } from '$app/environment';

	onMount(() => {
		initializeAudioRecording();
	});

	$: if(!$showChatbox){
		resetRecordingData();
	}
</script>

<div class="w-[100vw] h-[1px] min-h-[100vh]">
	<slot />

	{#if $showChatbox}
		<div class="fixed right-0 bottom-0 w-[40vw] h-[calc(100vh-48px)]">
			<Chatbox />
		</div>
	{/if}

	{#if browser}
		<Modal show={$modal} />
	{/if}
</div>
