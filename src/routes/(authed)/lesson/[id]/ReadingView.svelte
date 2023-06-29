<script lang="ts" context="module">
	export type ReadingViewType = 'READ' | 'QUIZ' | 'RECAP';
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import ReadingTextView from './ReadingTextView.svelte';
	import ReadingQuizView from './ReadingQuizView.svelte';

	let currentView: ReadingViewType = 'READ';
</script>

<div transition:fade class="w-full flex items-center justify-center overflow-hidden">
	<div class="w-[60vw] h-[30vw] p-[2vw] bg-white rounded-[2vw] relative">
		{#if currentView === 'READ'}
			<ReadingTextView setView={(view) => (currentView = view)} />
		{:else if currentView === 'QUIZ'}
			<ReadingQuizView setView={(view) => (currentView = view)} />
		{/if}
	</div>
</div>
