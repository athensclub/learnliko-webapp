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
	class="w-[100vw] h-full min-h-[100vh] bg-[#F4F4F4] font-line-seed flex flex-col items-center justify-center"
>
	{#if loading}
		Loading...
	{:else}
		<img class="mt-[4vh] w-[5vw]" src={icon} alt="Learnliko" />

		<div class="mt-[2vh] text-[2.7vw] font-bold">Welcome to Learnliko Trial</div>

		<div class="mt-[1vh] text-[1.6vw] font-extrabold">Click Button Below to Get Started</div>

		<div class="flex flex-row mt-[3vh] text-white font-extrabold">
			<button
				on:click={getStarted}
				class="bg-[#6C80E8] rounded-[2vw] flex flex-row justify-between px-3 py-2"
			>
				<div>Get Started!</div>
			</button>
		</div>
	{/if}
</div>
