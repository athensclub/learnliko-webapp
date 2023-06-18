<script>
	import '../app.css';
	import Chatbox from '$lib/components/chatbox/Chatbox.svelte';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
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
			class={`fixed ${
				$isMobile
					? `w-[100vw] ${$currentChatboxView === 'CONVERSATION' ? 'h-[40vh]' : 'h-[65vh]'} bottom-0`
					: 'w-[37vw] ' +
					  ($currentChatboxView === 'CONVERSATION'
							? 'h-[70vh] bottom-[15vh] right-[3vw]'
							: 'h-[85vh] bottom-0 left-[50%] translate-x-[-50%]')
			} z-[600]`}
		>
			<Chatbox />
		</div>
	{/if}

	{#if browser}
		<Modal show={$modal} />
	{/if}
</div>
