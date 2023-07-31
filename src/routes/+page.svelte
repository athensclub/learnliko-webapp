<script lang="ts">
	import icon from '$lib/images/learnliko_icon.png';
	import { goto } from '$app/navigation';
	import userSession from '$lib/stores/userSession';
	import { onMount } from 'svelte';
	import { signInAnonymous } from '$lib/auth';
	import { createGuestProfile } from '$lib/temp/user';
	import { fade } from 'svelte/transition';

	let loading = true;

	onMount(() => {
		// Subscribe on user's session
		userSession.subscribe((session) => {
			// ensure the initialization is completed
			if (!session.initialized) {
				loading = true;
				return;
			}
			// navigate to homepage if user is already has account
			if (session.isLoggedIn) goto(`/feed`);

			// navigate to login page if user hasnt' sign in
			// if (!session.isLoggedIn) goto(`/login`);
			loading = false;
		});
	});

	const getStarted = async () => {
		loading = true;
		await signInAnonymous();
		goto(`/feed`);
	};
</script>

<div
	class="flex h-full min-h-[100vh] w-[100vw] flex-col items-center justify-center bg-[#F4F4F4] font-line-seed"
>
	{#if loading}
		<div transition:fade class="relative h-[9rem] w-[8.1rem]">
			<img
				class="absolute right-0 top-0 h-[6.5rem] w-[6.5rem] opacity-20"
				src={icon}
				alt="Learnliko"
			/>
			<img class="absolute bottom-0 left-0 h-[6.5rem] w-[6.5rem]" src={icon} alt="Learnliko" />
		</div>

		<div class="mt-[4vh] text-[6.41vw] font-bold">Preparing...</div>
	{:else}
		<img class="h-[6.5rem] w-[6.5rem]" src={icon} alt="Learnliko" />

		<div class="mt-3 text-5xl font-bold">Learnliko</div>

		<button
			on:click={getStarted}
			class="mt-16 flex flex-row justify-between rounded-[2.4rem] bg-[#6C80E8] px-12 py-4"
		>
			<div class="text-2xl font-extrabold text-white">Start Demo</div>
		</button>
	{/if}
</div>
