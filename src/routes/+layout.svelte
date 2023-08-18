<script lang="ts">
	import '../app.scss';
	import icon from '$lib/images/learnliko_icon.png';
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
	import { createGuestProfile, getCurrentUserData } from '$lib/temp/user';
	import { currentMode } from '$lib/global/mode';
	import { graphqlClient } from '$lib/graphql';
	import { setContextClient } from '@urql/svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { addDailyUser } from '$lib/temp/analytic';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	let loading = false;

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
				goto('/');
			} else {
				userSession.update({ accountData: profileData });
			}

			addActiveUser();
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

	const addActiveUser = async () => {
		const lastActive = localStorage.getItem('lastActive');
		if (lastActive) {
			const lastTimestamp = Number(lastActive);
			if (isNaN(lastTimestamp)) return;

			const diff = Date.now() - lastTimestamp;
			const hours = diff / 3600000;

			if (hours >= 24) {
				await addDailyUser();
				localStorage.setItem('lastActive', Date.now().toString());
			}
		} else {
			localStorage.setItem('lastActive', Date.now().toString());
		}
	};

	$: if (!$showChatbox) {
		resetRecordingData();
	}
</script>

<div class="h-full w-full max-w-[100vw] overflow-x-hidden">
	{#if browser}
		<!-- TODO: remove mobile check when desktop support is ready -->
		{#if $isMobile}
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
		{:else}
			<div
				transition:fade
				class="mx-auto flex h-[100vh] flex-col items-center justify-center font-line-seed"
			>
				<div class="flex flex-row">
					<img class="h-[6.5rem] w-[6.5rem] opacity-20" src={icon} alt="Learnliko" />
					<img
						class="relative right-[3rem] top-[1.5rem] h-[6.5rem] w-[6.5rem]"
						src={icon}
						alt="Learnliko"
					/>
				</div>

				<div class="mt-[8vw] max-w-[60%] text-center text-[3.5vw]">
					<Typewriter>Learnliko currently only support <strong>mobile device📱</strong>.</Typewriter>
				</div>
			</div>
		{/if}
	{/if}
</div>
