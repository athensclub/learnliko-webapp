<script>
	import '../app.css';
	import Chatbox from '$lib/components/chatbox/Chatbox.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import { onMount } from 'svelte';
	import { initializeAudioRecording, resetRecordingData } from '$lib/global/recording';
	import Modal from 'svelte-simple-modal';
	import { modal } from '$lib/global/modal';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/global/breakpoints';

	onMount(() => {
		initializeAudioRecording();
	});

	$: if (!$showChatbox) {
		resetRecordingData();
	}
</script>

<div class="w-full max-w-[100vw] h-full overflow-x-hidden">
	<slot />

	{#if $showChatbox}
		<div
			class={`fixed bottom-0 ${
				$isMobile ? 'w-[100vw] h-[90vh]' : 'w-[40vw] h-[calc(100vh-48px)] left-[30%]'
			} z-30`}
		>
			<Chatbox />
		</div>
	{/if}

	{#if browser}
		<Modal show={$modal} />
	{/if}
</div>
