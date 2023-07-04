<script lang="ts">
	import '../app.scss';
	import Chatbox from '$lib/components/chatbox/Chatbox.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import { onMount } from 'svelte';
	import { initializeAudioRecording, resetRecordingData } from '$lib/global/recording';
	import Modal from 'svelte-simple-modal';
	import { browser } from '$app/environment';
	import { isMobile } from '$lib/global/breakpoints';
	import { auth } from '$lib/configs/firebase.config';
	import type { User } from 'firebase/auth';
	import userSession from '$lib/stores/userSession';
	import ToastManager from '$lib/components/toasts/ToastManager.svelte';
	import { getCurrentUserData } from '$lib/temp/user';
	import { currentMode } from '$lib/global/mode';
	import { graphqlClient } from '$lib/graphql';
	import { setContextClient } from '@urql/svelte';
	import { goto } from '$app/navigation';

	let loading = true;

	const OnAuthStateChanged = async function (user: User | null) {
		loading = true;

		userSession.set({
			initialized: false,
			isLoggedIn: user !== null,
			authUser: user,
			accountData: null
		});

		if ($userSession.isLoggedIn) {
			const profileData = await getCurrentUserData();
			if (!profileData) {
				goto('/setup-profile');
			} else {
				userSession.update({ accountData: profileData });
				currentMode.set('Student');
			}
		}

		userSession.update({ initialized: true });
		loading = false;
	};

	// Setup urql client
	setContextClient(graphqlClient);

	onMount(() => {
		initializeAudioRecording();

		// Subscribe on firebase auth state change
		auth.onAuthStateChanged(OnAuthStateChanged);
	});

	$: if (!$showChatbox) {
		resetRecordingData();
	}
</script>

<div class="h-full w-full max-w-[100vw] overflow-x-hidden">
	{#if browser}
		<Modal>
			{#if $showChatbox}
				<div
					class={`fixed ${
						$isMobile
							? `bottom-0 h-[65vh] w-[100vw]`
							: 'bottom-0 left-[50%] h-[85vh] w-[37vw] translate-x-[-50%]'
					} z-[600]`}
				>
					<Chatbox />
				</div>
			{/if}

			<ToastManager />

			{#if !loading}
				<slot />
			{/if}
		</Modal>
	{/if}
</div>
