<script lang="ts" context="module">
	export const profileCurrentView = writable<'HOME' | 'DETAILED'>('HOME');

	export const profileProgresses = writable<SubjectProgress[]>([]);

	export const selectedProfileProgress = writable<SubjectProgress | null>(null);
</script>

<script lang="ts">
	import type { SubjectProgress } from '$gql/generated/graphql';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import ProfileHomeView from './ProfileHomeView.svelte';
	import ProfileDetailedView from './ProfileDetailedView.svelte';
	import userSession from '$lib/stores/userSession';

	onMount(() => {
		$profileCurrentView = 'HOME';
		$selectedProfileProgress = null;
		$profileProgresses = $userSession.accountData?.subjectProgress ?? [];
	});

	// $userSession.accountData?.subjectProgress[0].
</script>

<div class="flex flex-1 flex-col overflow-y-auto font-line-seed">
	{#if $profileCurrentView === 'HOME'}
		<ProfileHomeView />
	{:else if $profileCurrentView === 'DETAILED'}
		<ProfileDetailedView />
	{/if}

	<!-- Bottom spacing -->
	<div class="h-[10vh] w-full" />
</div>
