<script lang="ts" context="module">
	export type ReadingViewType = 'READ' | 'QUIZ' | 'RECAP';
</script>

<script lang="ts">
	import ReadingTextView from './ReadingTextView.svelte';
	import ReadingQuizView from './ReadingQuizView.svelte';
	import { onMount } from 'svelte';
	import { resetReadingData, selectedQuizChoices } from '$lib/global/reading';

	/**
	 * Called when the user click 'continue' button after submitting answers.
	 */
	export let onFinish = () => {};

	let clazz = '';
	export { clazz as class };

	let currentView: ReadingViewType = 'READ';

	onMount(() => {
		resetReadingData();

		// TODO: remove this and call initialize in reading.ts global file instead (when ready)
		$selectedQuizChoices = [null];
	});
</script>

<div class="p-[2vw] bg-white rounded-[2vw] relative pointer-events-auto overflow-hidden {clazz}">
	{#if currentView === 'READ'}
		<ReadingTextView setView={(view) => (currentView = view)} />
	{:else if currentView === 'QUIZ'}
		<ReadingQuizView {onFinish} setView={(view) => (currentView = view)} />
	{/if}
</div>
