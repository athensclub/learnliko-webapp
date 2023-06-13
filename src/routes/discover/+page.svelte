<script lang="ts">
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import ReadingCard from '$lib/components/ReadingCard.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import convTaskImage from './coversation_task_image.png';
	import readingTaskImage from './reading_task_image.png';
	import { queryDiscoverItemsLocal } from '$lib/localdb/discoverLocal';
	import type { DiscoverItem } from '$lib/types/discover';
	import { onMount } from 'svelte';

	let items: DiscoverItem[] = [];
	onMount(async () => {
		// TODO: use cloud db and probably move this to ssr.
		items = await queryDiscoverItemsLocal();
		console.log(items);
	});
</script>

<div class="w-[100vw] h-full min-h-[100vh] bg-[#F4F4F4] font-line-seed">
	<NavBar />

	<div
		class="fixed top-0 right-0 w-[25vw] h-[100vh] flex flex-col bg-white font-bold px-[2vw] py-[4vh] gap-[7vh]"
	>
		<div class="text-[2vw]">Today Tasks</div>

		<div class="flex flex-col py-[2vh] w-full items-center text-[1.5vw] bg-[#F8F8F8] rounded-[2vw]">
			Talk with 3 AI friends
			<img class="w-[50%]" src={convTaskImage} alt="Conversation" />

			<svg
				class="mt-[2vh] w-[80%]"
				viewBox="0 0 261 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="261" height="23" rx="11.5" fill="#EEEEEE" />
				<rect width="170" height="23" rx="11.5" fill="url(#paint0_linear_0_1)" />
				<defs>
					<linearGradient
						id="paint0_linear_0_1"
						x1="-1.66375e-06"
						y1="11.6117"
						x2="170"
						y2="11.6116"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#7280FF" />
						<stop offset="0.4375" stop-color="#C698FF" />
						<stop offset="1" stop-color="#FFD68D" />
					</linearGradient>
				</defs>
			</svg>
		</div>

		<div class="flex flex-col py-[2vh] w-full items-center text-[1.5vw] bg-[#F8F8F8] rounded-[2vw]">
			Read 5 Stories
			<img class="w-[50%]" src={readingTaskImage} alt="Conversation" />

			<svg
				class="mt-[2vh] w-[80%]"
				viewBox="0 0 261 23"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect width="261" height="23" rx="11.5" fill="#EEEEEE" />
				<rect width="82" height="23" rx="11.5" fill="url(#paint0_linear_0_1)" />
				<defs>
					<linearGradient
						id="paint0_linear_0_1"
						x1="-8.02513e-07"
						y1="11.6117"
						x2="82"
						y2="11.6116"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#7280FF" />
						<stop offset="0.4375" stop-color="#C698FF" />
						<stop offset="1" stop-color="#FFD68D" />
					</linearGradient>
				</defs>
			</svg>
		</div>
	</div>

	<div class="flex flex-col w-fit mx-auto gap-[6vh] px-[3vw] py-[6vh]">
		{#each items as item, index (index)}
			{#if item.conversation}
				<ConversationCard class="w-[27vw] h-[38vw]" conversation={item.conversation} />
			{:else if item.reading}
				<ReadingCard class="w-[27vw] h-[38vw]" item={item.reading} />
			{/if}
		{/each}
	</div>
</div>
