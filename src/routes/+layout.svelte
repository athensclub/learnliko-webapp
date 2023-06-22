<script lang="ts">
	import '../app.scss';
	import Chatbox from '$lib/components/chatbox/Chatbox.svelte';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import { onMount } from 'svelte';
	import { initializeAudioRecording, resetRecordingData } from '$lib/global/recording';
	import Modal from 'svelte-simple-modal';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/global/breakpoints';
	import { auth } from '$lib/configs/firebase.config';
	import type { User } from 'firebase/auth';
	import userSession from '$lib/stores/userSession';
	import { goto } from '$app/navigation';
	import { getCurrentUserProfile } from '$lib/temp/user';

	const OnAuthStateChanged = async function (user: User | null) {
		userSession.set({
			initialized: false,
			isLoggedIn: user !== null,
			authUser: user,
			profile: null
		});

		if ($userSession.isLoggedIn) {
			const profileData = await getCurrentUserProfile();
			if (!profileData) {
				goto('/get-started');
			} else {
				userSession.update({ profile: profileData });
			}
		} else {
			goto('/');
		}

		userSession.update({ initialized: true });
	};

	onMount(() => {
		initializeAudioRecording();

		// Subscribe on firebase auth state change
		auth.onAuthStateChanged(OnAuthStateChanged);
	});

	$: if (!$showChatbox) {
		resetRecordingData();
	}
</script>

<div class="w-full max-w-[100vw] h-full overflow-x-hidden">
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
		<Modal>
			<slot />
		</Modal>
	{/if}
</div>
