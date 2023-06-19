<script lang="ts">
	import ConversationCard from '$lib/components/ConversationCard.svelte';

	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { onMount } from 'svelte';
	import convButtonImage from './conversation_button_image.png';
	import locButtonImage from './location_button_image.png';
	import { queryConversationsLocal } from '$lib/localdb/conversationLocal';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';
	import { currentMode } from '$lib/global/mode';
	import { browser } from '$app/environment';

	// TODO: probably switch back to querying in ssr when we switch the db to cloud.
	// export let data: PageData;
	let data: { conversationCorouselItems: ConversationCarouselItem[] } = {
		conversationCorouselItems: []
	};
	const loadData = async () => {
		if(!browser) return;
		const result = await queryConversationsLocal();
		data = {
			conversationCorouselItems: result
		};
	};

	onMount(loadData);
	$: $currentMode, loadData();
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced />
	<div class="flex flex-col flex-1 px-[3vw] py-[2vh]">
		<div class="flex flex-row justify-between font-extrabold">
			<div class="text-[2vw]">Conversation</div>
			<button class="bg-black text-white text-[1vw] px-[2vw] rounded-full">Timeline</button>
		</div>

		<div class="w-full flex flex-row justify-between mt-[6vh] font-bold">
			<a
				href="/conversation/character"
				class="w-[48%] h-[35vh] py-[3vh] px-[3vw] flex flex-row bg-white rounded-[2vw]"
			>
				<img class="w-[30%] object-contain" src={convButtonImage} alt="Conversation" />

				<div class="flex flex-col flex-1 pl-[2vw]">
					<div
						class="flex flex-row ml-auto w-fit items-center justify-center text-[1vw] px-[1vw] py-[1vh] border border-[#00000026] rounded-full"
					>
						view all
						<svg
							class="ml-[0.5vw] w-[1.2vw]"
							viewBox="0 0 21 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.75 6.1251C1.26675 6.1251 0.875 6.51686 0.875 7.0001C0.875 7.48335 1.26675 7.8751 1.75 7.8751V6.1251ZM19.8688 7.61882C20.2104 7.27711 20.2104 6.7231 19.8688 6.38139L14.3002 0.812922C13.9585 0.471213 13.4045 0.471213 13.0628 0.812922C12.7211 1.15463 12.7211 1.70865 13.0628 2.05035L18.0126 7.0001L13.0628 11.9499C12.7211 12.2916 12.7211 12.8456 13.0628 13.1873C13.4045 13.529 13.9585 13.529 14.3002 13.1873L19.8688 7.61882ZM1.75 7.8751H19.25V6.1251H1.75V7.8751Z"
								fill="black"
							/>
						</svg>
					</div>

					<div class="text-[2.5vw] mt-[2vh]">Character</div>
					<div class="text-[1vw]">You unlocked 8/50 characters</div>
				</div>
			</a>

			<div class="w-[48%] h-[35vh] py-[3vh] px-[3vw] flex flex-row bg-white rounded-[2vw]">
				<img class="w-[40%] object-contain" src={locButtonImage} alt="Conversation" />

				<div class="flex flex-col flex-1 pl-[2vw]">
					<div
						class="flex flex-row ml-auto w-fit items-center justify-center text-[1vw] px-[1vw] py-[1vh] border border-[#00000026] rounded-full"
					>
						view all
						<svg
							class="ml-[0.5vw] w-[1.2vw]"
							viewBox="0 0 21 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M1.75 6.1251C1.26675 6.1251 0.875 6.51686 0.875 7.0001C0.875 7.48335 1.26675 7.8751 1.75 7.8751V6.1251ZM19.8688 7.61882C20.2104 7.27711 20.2104 6.7231 19.8688 6.38139L14.3002 0.812922C13.9585 0.471213 13.4045 0.471213 13.0628 0.812922C12.7211 1.15463 12.7211 1.70865 13.0628 2.05035L18.0126 7.0001L13.0628 11.9499C12.7211 12.2916 12.7211 12.8456 13.0628 13.1873C13.4045 13.529 13.9585 13.529 14.3002 13.1873L19.8688 7.61882ZM1.75 7.8751H19.25V6.1251H1.75V7.8751Z"
								fill="black"
							/>
						</svg>
					</div>

					<div class="text-[2.5vw] mt-[2vh]">Location</div>
					<div class="text-[1vw]">You unlocked 8/20 locations</div>
				</div>
			</div>
		</div>

		<div class="mt-[5vh] text-[2vw] font-bold">Today Tasks</div>
		<div class="grid gap-[2vw] grid-cols-3 mt-[5vh]">
			{#each data.conversationCorouselItems as item, index (item.id)}
				<!-- Use vw to set height to keep ratio when viewport width change -->
				<ConversationCard class="w-full h-[29vw]" conversation={item} />
			{/each}
		</div>
	</div>
</div>
