<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import type { AiFriend } from '$gql/generated/graphql';

	export const aiFriendCurrentView = writable<'Home'>('Home');

	export const aiFriends = writable<AiFriend[]>([]);

	export type Inbox = {
		friend: AiFriend;
		message: string;
	};
	export const inboxes = writable<Inbox[]>([]);
</script>

<script lang="ts">
	import AiFriendHomeView from './AIFriendHomeView.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		$aiFriendCurrentView = 'Home';

		const kiko: AiFriend = {
			name: 'KiKo',
			role: 'Assistant',
			subject: 'Assistant',
			interest: 'Helping learners archive their goals with Learnliko',
			ability: ['App Instruction'],
			prompt:
				'You are a helpful assistant that will guide the user in using Learnliko web application.'
		};
		$aiFriends = [kiko];
		$inboxes = [
			{
				friend: kiko,
				message: 'สวัสดี ยินดีต้อรับสู่ Learnliko นี่คือคำแนะนำเบื้องต้น...'
			}
		];
	});
</script>

<div class="w-full flex-1 font-line-seed">
	{#if $aiFriendCurrentView === 'Home'}
		<AiFriendHomeView />
	{/if}
</div>
