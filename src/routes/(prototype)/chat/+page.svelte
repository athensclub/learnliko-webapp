<script lang="ts" context="module">
	import { derived, writable } from 'svelte/store';
	import type { AiFriend } from '$gql/generated/graphql';

	export const aiFriendCurrentView = writable<'HOME' | 'DETAILED' | 'CHAT'>('HOME');

	export const aiFriends = writable<AiFriend[]>([]);

	export const selectedAIFriend = writable<AiFriend | null>(null);

	export const selectedAIFriendIntro = writable<string | null>(null);

	export type Inbox = {
		friend: AiFriend;
		message: string;
	};
	export const inboxes = writable<Inbox[]>([]);
</script>

<script lang="ts">
	import AIFriendHomeView from './AIFriendHomeView.svelte';
	import { onMount } from 'svelte';
	import AIFriendDetailedView from './AIFriendDetailedView.svelte';
	import AIFriendChatView from './AIFriendChatView.svelte';
	import { getAIFriends } from '$api/aiFriends';
	import { getRandomItem, shuffle } from '$lib/utils/array';

	onMount(async () => {
		$aiFriendCurrentView = 'HOME';
		$selectedAIFriend = null;

		$aiFriends = await getAIFriends();
		$inboxes = shuffle([...$aiFriends])
			.slice(0, 3)
			.map((friend) => ({ friend, message: getRandomItem(friend.intro) }));
	});
</script>

<div class="w-full flex-1 font-line-seed">
	{#if $aiFriendCurrentView === 'HOME'}
		<AIFriendHomeView />
	{:else if $aiFriendCurrentView === 'DETAILED'}
		<AIFriendDetailedView />
	{:else if $aiFriendCurrentView === 'CHAT'}
		<AIFriendChatView />
	{/if}
</div>
