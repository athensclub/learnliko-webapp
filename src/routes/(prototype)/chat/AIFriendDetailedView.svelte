<script lang="ts">
	import { aiFriendCurrentView, selectedAIFriend } from './+page.svelte';
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center">
	<button on:click={() => ($aiFriendCurrentView = 'HOME')} class="absolute left-[6vw] top-[6vw]">
		<svg class="w-[5vw]" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M22.5458 10.1252C23.1483 10.1252 23.6367 9.62151 23.6367 9.00021C23.6367 8.37891 23.1483 7.87521 22.5458 7.87521L22.5458 10.1252ZM0.683482 8.20469C0.25752 8.64404 0.25752 9.35639 0.683482 9.79574L7.62603 16.9552C8.05206 17.3945 8.74276 17.3945 9.16879 16.9552C9.59483 16.5158 9.59483 15.8035 9.16879 15.3642L2.99766 9.00021L9.16879 2.63624C9.59483 2.19689 9.59483 1.48461 9.16879 1.04526C8.74275 0.605913 8.05206 0.605913 7.62603 1.04526L0.683482 8.20469ZM22.5458 7.87521L1.4549 7.87521L1.4549 10.1252L22.5458 10.1252L22.5458 7.87521Z"
				fill="black"
				fill-opacity="0.8"
			/>
		</svg>
	</button>

	{#if $selectedAIFriend}
		<div
			style="box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.15);"
			class="relative flex w-[85%] flex-col rounded-[5vw] p-[5vw]"
		>
			<div
				class="absolute left-[50%] top-[-12.5vw] min-h-[25vw] min-w-[25vw] translate-x-[-50%] rounded-full bg-[#6C80E8]"
			/>

			<div class="mx-auto mt-[15vw] text-[5vw] font-bold">{$selectedAIFriend.role}</div>

			<div class="mx-auto mt-[2vw] text-[7vw] font-bold">{$selectedAIFriend.name}</div>

			<div
				class="mx-auto mt-[2vw] rounded-full bg-black px-[4vw] py-[1vw] text-[4.5vw] font-bold text-white"
			>
				{$selectedAIFriend.subject}
			</div>

			<div class="mt-[8vw] text-[4.5vw] font-bold">Interest</div>
			<div class="mt-[3vw] w-full rounded-[4vw] bg-[#F6F6F6] p-[4vw] text-[4vw] font-bold">
				{$selectedAIFriend.interest}
			</div>

			<div class="mt-[8vw] text-[4.5vw] font-bold">Ability</div>
			<div class="mt-[3vw] flex w-full flex-row flex-wrap gap-[4vw]">
				{#each $selectedAIFriend.ability as ab}
					<div class="rounded-[4vw] bg-[#F6F6F6] px-[4.5vw] py-[2vw] text-[4.5vw] font-bold">
						{ab}
					</div>
				{/each}
			</div>
		</div>

		<button
			class="mt-[8vw] rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[12vw] py-[1.5vw] text-[5vw] font-bold text-white"
		>
			Talk
		</button>
	{/if}
</div>
