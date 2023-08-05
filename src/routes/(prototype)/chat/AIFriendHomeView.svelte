<script lang="ts">
	import type { AiFriend } from '$gql/generated/graphql';
	import { aiFriendCurrentView, aiFriends, inboxes, selectedAIFriend } from './+page.svelte';

	const select = (friend: AiFriend) => {
		$selectedAIFriend = friend;
		$aiFriendCurrentView = 'DETAILED';
	};
</script>

<div class="flex flex-col p-[6vw]">
	<div class="text-[6vw] font-bold">AI Friends</div>

	<div class="mb-[4vw] flex flex-row overflow-x-auto p-[4vw]">
		{#each $aiFriends as friend}
			<button on:click={() => select(friend)} class="h-[20vw] w-[20vw] rounded-full bg-[#6C80E8]" />
		{/each}
	</div>

	<!-- Divider -->
	<div class="h-[0.3vw] w-full bg-[#0000000D]" />

	<div class="flex flex-1 flex-col overflow-y-auto p-[2vw]">
		<div class="mt-[5vw] text-[6vw] font-bold">Inbox</div>

		{#each $inboxes as inbox}
			<button
				style="box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.10);"
				class="relative z-10 mt-[5vw] flex flex-row gap-[4vw] rounded-[5vw] rounded-bl-none p-[5vw]"
			>
				<div class="min-h-[13vw] min-w-[13vw] rounded-full bg-[#6C80E8]" />
				<div class="text-[4.5vw] font-bold">
					{inbox.message}
				</div>
			</button>
		{/each}
		<div />
	</div>
</div>
