<script lang="ts">
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import ReadingCard from '$lib/components/ReadingCard.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import convTaskImage from './coversation_task_image.png';
	import readingTaskImage from './reading_task_image.png';
	import icon from '$lib/images/learnliko_icon.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { queryDiscoverItemsLocal } from '$lib/localdb/discoverLocal';
	import type { DiscoverItem } from '$lib/types/discover';
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { currentMode } from '$lib/global/mode';
	import { browser } from '$app/environment';

	let items: DiscoverItem[] = [];
	const loadData = async () => {
		if (!browser) return;
		items = await queryDiscoverItemsLocal();
	};

	onMount(loadData);
	$: $currentMode, loadData();
</script>

<div class="w-[100vw] h-full min-h-[100vh] bg-[#F4F4F4] font-line-seed">
	<NavBar />

	<div
		class={`fixed ${
			$isMobile
				? 'top-[0] w-[100vw] px-[5vw] py-[1vh] z-[1000] gap-[1.6vh]'
				: 'top-0 right-0 w-[23vw] h-[100vh] px-[2vw] py-[4vh] gap-[7vh] '
		} flex flex-col bg-white font-bold`}
	>
		{#if $isMobile}
			<div class="flex flex-row justify-between w-full">
				<img class="w-[8vw] h-[8vw]" src={icon} alt="Learnliko" />

				<a href="/profile">
					<div
						style="background-image: url('{userProfileImage}');"
						class="w-[8vw] h-[8vw] bg-cover bg-center rounded-full"
					/>
				</a>
			</div>

			<div class="text-[4vw]">Today Tasks</div>

			<div class="flex flex-row text-[1vw] justify-between">
				<div class="flex flex-row gap-[2vw]">
					<img class="h-[4vh]" src={convTaskImage} alt="Conversation" />

					<div class="flex flex-col">
						Talk with 3 AI friends
						<svg
							class="w-[30vw] mt-[0.5vh]"
							viewBox="0 0 142 13"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M135.729 0.679688H6.27129C2.80775 0.679688 0 3.43761 0 6.83969C0 10.2418 2.80775 12.9997 6.27129 12.9997H135.729C139.192 12.9997 142 10.2418 142 6.83969C142 3.43761 139.192 0.679688 135.729 0.679688Z"
								fill="#EEEEEE"
							/>
							<path
								d="M86.0063 0.679688H6.27129C2.80775 0.679688 0 3.43761 0 6.83969C0 10.2418 2.80775 12.9997 6.27129 12.9997H86.0063C89.4698 12.9997 92.2776 10.2418 92.2776 6.83969C92.2776 3.43761 89.4698 0.679688 86.0063 0.679688Z"
								fill="url(#paint0_linear_0_1)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_0_1"
									x1="-9.03097e-07"
									y1="6.89949"
									x2="92.2776"
									y2="6.89949"
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

				<div class="flex flex-row gap-[2vw]">
					<img class="h-[4vh]" src={readingTaskImage} alt="Conversation" />

					<div class="flex flex-col">
						Read 5 Stories
						<svg
							class="w-[30vw] mt-[0.5vh]"
							viewBox="0 0 120 13"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M114.7 1H5.29968C2.37275 1 0 3.68629 0 7C0 10.3137 2.37275 13 5.29968 13H114.7C117.627 13 120 10.3137 120 7C120 3.68629 117.627 1 114.7 1Z"
								fill="#EEEEEE"
							/>
							<path
								d="M100.341 0.679688H6.27129C2.80775 0.679688 0 3.43761 0 6.83969C0 10.2418 2.80775 12.9997 6.27129 12.9997H100.341C103.804 12.9997 106.612 10.2418 106.612 6.83969C106.612 3.43761 103.804 0.679688 100.341 0.679688Z"
								fill="url(#paint0_linear_0_1)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_0_1"
									x1="-1.04338e-06"
									y1="6.89949"
									x2="106.612"
									y2="6.89949"
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
			</div>
		{:else}
			<div class="text-[2vw]">Today Tasks</div>

			<div
				class="flex flex-col py-[2vh] w-full items-center text-[1.5vw] bg-[#F8F8F8] rounded-[2vw]"
			>
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

			<div
				class="flex flex-col py-[2vh] w-full items-center text-[1.5vw] bg-[#F8F8F8] rounded-[2vw]"
			>
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
		{/if}
	</div>

	{#if $isMobile}
		<!-- Top spacing (because of topbar) -->
		<div class="w-full h-[15vh]" />
	{/if}

	<div
		class={`fixed z-[100] top-0 left-0 w-[100vw] h-[100vh] overflow-y-auto snap-y snap-mandatory pointer-events-none`}
	>
		<div class={`pointer-events-auto mx-auto ${$isMobile ? 'w-full py-[15vh]' : 'w-[54vw] pt-0 pb-[10vh]'}`}>
			{#each items as item, index (index)}
				{#if item.conversation}
					<ConversationCard
						class={`snap-center mx-auto ${
							$isMobile ? 'w-[80vw] h-[110vw] mt-[5vh]' : 'w-[27vw] h-[38vw] mt-[7vh]'
						}`}
						conversation={item.conversation}
					/>
				{:else if item.reading}
					<ReadingCard
						class={`snap-center mx-auto ${
							$isMobile ? 'w-[80vw] h-[110vw] mt-[5vh]' : 'w-[27vw] h-[38vw] mt-[7vh]'
						}`}
						item={item.reading}
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>
