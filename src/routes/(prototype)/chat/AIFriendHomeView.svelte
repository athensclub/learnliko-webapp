<script lang="ts">
	import type { AiFriend } from '$gql/generated/graphql';
	import { getRandomItem } from '$lib/utils/array';
	import {
		aiFriendCurrentView,
		aiFriends,
		inboxes,
		selectedAIFriend,
		selectedAIFriendIntro
	} from './+page.svelte';

	const select = (
		friend: AiFriend,
		intro: string | null = null,
		targetView: typeof $aiFriendCurrentView = 'DETAILED'
	) => {
		$selectedAIFriend = friend;
		$selectedAIFriendIntro = intro ?? getRandomItem(friend.intro);
		$aiFriendCurrentView = targetView;
	};
</script>

<div class="flex flex-col p-[3vw]">
	<div class="px-[6vw] pt-[6vw] text-[8vw] font-bold">AI Friends</div>

	<div class="mb-[4vw] flex flex-row gap-[6vw] overflow-x-auto p-[4vw]">
		{#each $aiFriends as friend}
			<button
				on:click={() => select(friend)}
				style="background-color: {friend.backgroundColor};
					   background-image: url('{friend.imageProfile}');"
				class="h-[20vw] w-[20vw] rounded-full bg-cover bg-center"
			/>
		{/each}
	</div>

	<!-- Divider -->
	<div class="h-[0.3vw] w-full bg-[#0000000D]" />

	<div class="flex flex-1 flex-col overflow-y-auto p-[2vw] px-[6vw] pt-[6vw]">
		<div class="mt-[5vw] text-[6vw] font-bold">💬Inbox</div>

		{#each $inboxes as inbox}
			<button
				on:click={() => select(inbox.friend, inbox.message, 'CHAT')}
				style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);"
				class="relative z-10 mt-[5vw] flex flex-row gap-[4vw] rounded-[5vw] rounded-bl-none p-[5vw]"
			>
				<div
					style="background-color: {inbox.friend.backgroundColor};
						   background-image: url('{inbox.friend.imageProfile}');"
					class="min-h-[13vw] min-w-[13vw] rounded-full bg-cover bg-center"
				/>
				<div class="text-[4vw] font-bold text-start line-clamp-2">
					{inbox.message}
				</div>
			</button>
		{/each}
		<div />
	</div>
</div>
