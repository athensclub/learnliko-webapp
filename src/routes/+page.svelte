<script lang="ts">
	import icon from '$lib/images/learnliko_icon.png';
	import { signInAnonymous } from '$lib/auth';
	import { goto } from '$app/navigation';
	import userSession from '$lib/stores/userSession';
	import { onMount } from 'svelte';

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
			if (session.profile) goto(`/discover`);

			loading = false;
		});
	});

	const getStarted = async () => {
		await signInAnonymous();
	};
</script>

<div
	class="flex h-full min-h-[100vh] w-[100vw] flex-col items-center justify-center bg-[#F4F4F4] font-line-seed"
>
	{#if loading}
		Loading...
	{:else}
		<img class="mt-[4vh] w-[5vw]" src={icon} alt="Learnliko" />

		<div class="mt-[2vh] text-[2.7vw] font-bold">Welcome to Learnliko Trial</div>

		<div class="mt-[1vh] text-[1.6vw] font-extrabold">Click Button Below to Get Started</div>

		<div class="mt-[3vh] flex flex-row font-extrabold text-white">
			<button
				on:click={getStarted}
				class="flex flex-row justify-between rounded-[2vw] bg-[#6C80E8] px-3 py-2"
			>
				<div>Get Started!</div>
			</button>
		</div>
	{/if}
</div>
