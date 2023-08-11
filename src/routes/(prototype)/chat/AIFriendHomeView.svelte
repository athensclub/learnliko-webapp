<script lang="ts">
	import type { AiFriend } from '$gql/generated/graphql';
	import { aiFriendCurrentView, aiFriends, inboxes, selectedAIFriend } from './+page.svelte';

	const select = (friend: AiFriend, targetView: typeof $aiFriendCurrentView = 'DETAILED') => {
		$selectedAIFriend = friend;
		$aiFriendCurrentView = targetView;
	};
</script>

<div class="flex flex-col p-[3vw]">
	<div class="text-[8vw] font-bold px-[6vw] pt-[6vw]">AI Friends</div>

	<div class="mb-[4vw] flex flex-row overflow-x-auto gap-[6vw] p-[4vw]">
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
		<div class="mt-[5vw] text-[6vw] font-bold ">💬Inbox</div>

		{#each $inboxes as inbox}
			<button
				on:click={() => select(inbox.friend, 'CHAT')}
				style="box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.10);"
				class="relative z-10 mt-[5vw] flex flex-row gap-[4vw] rounded-[5vw] rounded-bl-none p-[5vw]"
			>
				<div
					style="background-color: {inbox.friend.backgroundColor};
						   background-image: url('{inbox.friend.imageProfile}');"
					class="min-h-[13vw] min-w-[13vw] rounded-full bg-cover bg-center"
				/>
				<div class="text-[4.5vw] font-bold">
					{inbox.message}
				</div>
			</button>
		{/each}
		<div />
	</div>
</div>
