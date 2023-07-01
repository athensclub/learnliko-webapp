<script lang="ts" context="module">
	export type ReadingViewType = 'READ' | 'QUIZ' | 'RECAP';
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import ReadingTextView from './ReadingTextView.svelte';
	import ReadingQuizView from './ReadingQuizView.svelte';
	import { onMount } from 'svelte';
	import { resetReadingData } from '$lib/global/reading';

	export let onFinish: () => void;

	let currentView: ReadingViewType = 'READ';

	onMount(() => {
		resetReadingData();
	});
</script>

<div
	transition:fade
	class="absolute w-full h-full flex items-center justify-center overflow-hidden pointer-events-none"
>
	<div
		class="w-[60vw] h-[30vw] p-[2vw] bg-white rounded-[2vw] relative pointer-events-auto overflow-hidden"
	>
		{#if currentView === 'READ'}
			<ReadingTextView setView={(view) => (currentView = view)} />
		{:else if currentView === 'QUIZ'}
			<ReadingQuizView {onFinish} setView={(view) => (currentView = view)} />
		{/if}
	</div>
</div>
