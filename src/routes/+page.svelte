<script lang="ts">
	import icon from '$lib/images/learnliko_icon.png';
	import { goto } from '$app/navigation';
	import userSession from '$lib/stores/userSession';
	import { onMount } from 'svelte';

	let loading = false;

	onMount(() => {
		// Subscribe on user's session
		// userSession.subscribe((session) => {
		// 	// ensure the initialization is completed
		// 	if (!session.initialized) {
		// 		loading = true;
		// 		return;
		// 	}
		// 	// navigate to homepage if user is already has account
		// 	if (session.accountData?.profile) goto(`/discover`);
		// 	// navigate to login page if user hasnt' sign in
		// 	if (!session.isLoggedIn) goto(`/login`);
		// 	loading = false;
		// });
	});

	const getStarted = async () => {
		goto(`/feed`);
	};
</script>

<div
	class="flex h-full min-h-[100vh] w-[100vw] flex-col items-center justify-center bg-[#F4F4F4] font-line-seed"
>
	{#if loading}
		Loading...
	{:else}
		<img class="h-[6.5rem] w-[6.5rem]" src={icon} alt="Learnliko" />

		<div class="mt-3 text-5xl font-bold">Learnliko</div>

		<button
			on:click={getStarted}
			class="mt-16 flex flex-row justify-between rounded-[2.4rem] bg-[#6C80E8] px-12 py-4"
		>
			<div class="font-extrabold text-white text-2xl">Start Demo</div>
		</button>
	{/if}
</div>
