<script lang="ts">
	import { aiFriendCurrentView, selectedAIFriend } from './+page.svelte';
	import { hideBottomNavBar } from '../+layout.svelte';
	import { onDestroy, onMount } from 'svelte';
	import ChatView from '$lib/components/chatbox/ChatView.svelte';

	onMount(async () => {
		$hideBottomNavBar = true;
	});

	onDestroy(async () => {
		$hideBottomNavBar = false;
	});
</script>

<div class="relative flex h-full max-h-[100vh] w-full flex-col">
	{#if $selectedAIFriend}
		<div
			style="box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);"
			class="flex w-full flex-row items-center gap-[4vw] p-[6vw]"
		>
			<button on:click={() => ($aiFriendCurrentView = 'HOME')} class="">
				<svg class="w-[5vw]" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M22.5458 10.1252C23.1483 10.1252 23.6367 9.62151 23.6367 9.00021C23.6367 8.37891 23.1483 7.87521 22.5458 7.87521L22.5458 10.1252ZM0.683482 8.20469C0.25752 8.64404 0.25752 9.35639 0.683482 9.79574L7.62603 16.9552C8.05206 17.3945 8.74276 17.3945 9.16879 16.9552C9.59483 16.5158 9.59483 15.8035 9.16879 15.3642L2.99766 9.00021L9.16879 2.63624C9.59483 2.19689 9.59483 1.48461 9.16879 1.04526C8.74275 0.605913 8.05206 0.605913 7.62603 1.04526L0.683482 8.20469ZM22.5458 7.87521L1.4549 7.87521L1.4549 10.1252L22.5458 10.1252L22.5458 7.87521Z"
						fill="black"
						fill-opacity="0.8"
					/>
				</svg>
			</button>

			<div
				style="background-color: {$selectedAIFriend.backgroundColor};
					   background-image: url('{$selectedAIFriend.imageProfile}');"
				class="min-h-[17vw] min-w-[17vw] rounded-full bg-cover bg-center"
			/>

			<div class="flex flex-col">
				<div class="text-[4vw] font-bold">{$selectedAIFriend.role}</div>
				<div class="text-[6vw] font-bold">{$selectedAIFriend.name}</div>
			</div>
		</div>

		<!-- Can't typecast :( -->
		<ChatView
			gender={$selectedAIFriend.gender}
			accent={$selectedAIFriend.accent}
			aiName={$selectedAIFriend.name}
			aiBackground={$selectedAIFriend.backgroundColor}
			prompt={$selectedAIFriend.prompt}
			intro={'Hello'}
			aiImage={$selectedAIFriend.imageProfile}
		/>
	{/if}
</div>
