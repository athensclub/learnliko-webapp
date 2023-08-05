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

	onMount(() => {
		$profileCurrentView = 'HOME';
		$selectedProfileProgress = null;
		// TODO: user userSession data.
		$profileProgresses = [
			{
				courseProgress: [
					{
						progress: 0.6,
						course: {
							displayName: 'Pre A1',
							subject: {
								displayName: 'English',
								indicatorLabel: 'CEFR',
								id: 'english'
							},
							id: 'prea1'
						}
					}
				],
				subject: {
					displayName: 'English',
					indicatorLabel: 'CEFR',
					id: 'english'
				}
			}
		];
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
