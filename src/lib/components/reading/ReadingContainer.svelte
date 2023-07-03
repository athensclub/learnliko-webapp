<script lang="ts" context="module">
	export type ReadingViewType = 'READ' | 'QUIZ' | 'RECAP';
</script>

<script lang="ts">
	import ReadingTextView from './ReadingTextView.svelte';
	import ReadingQuizView from './ReadingQuizView.svelte';
	import { onMount } from 'svelte';
	import { resetReadingData, selectedQuizChoices } from '$lib/global/reading';
	import type { ReadingItem } from '$lib/types/reading';

	/**
	 * Called when the user click 'continue' button after submitting answers.
	 */
	export let onFinish = () => {};

	export let item: ReadingItem;

	let clazz = '';
	export { clazz as class };

	let currentView: ReadingViewType = 'READ';

	onMount(() => {
		resetReadingData();

		// TODO: remove this and call initialize in reading.ts global file instead (when ready)
		$selectedQuizChoices = Array(item.quiz.length).fill(null);
	});
</script>

<div class="pointer-events-auto relative overflow-hidden rounded-[2vw] bg-white p-[2vw] {clazz}">
	{#if currentView === 'READ'}
		<ReadingTextView {item} setView={(view) => (currentView = view)} />
	{:else if currentView === 'QUIZ'}
		<ReadingQuizView quiz={item.quiz} {onFinish} setView={(view) => (currentView = view)} />
	{/if}
</div>
