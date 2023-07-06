<script lang="ts" context="module">
	export type ReadingViewType = 'READ' | 'QUIZ' | 'RECAP';
</script>

<script lang="ts">
	import ReadingTextView from './ReadingTextView.svelte';
	import ReadingQuizView from './ReadingQuizView.svelte';
	import type { ReadingItem } from '$lib/types/reading';
	import type { ReadingCard } from '$gql/generated/graphql';

	/**
	 * Called when the user click 'continue' button after submitting answers.
	 */
	export let onFinish = () => {};

	export let showFinishButton = true;

	export let item: ReadingCard;

	let selected = Array(item.questions.length).fill(null);

	let clazz = '';
	export { clazz as class };
	export let scale = 1;

	/**
	 * Set to non-null value to render this reading item as played reading container.
	 */
	export let correctAnswers: number[] | null = null;

	let currentView: ReadingViewType = 'READ';

	// onMount(() => {
	// 	resetReadingData();

	// 	//TODO: remove this and call initialize in reading.ts global file instead (when ready)
	// 	$selectedQuizChoices = Array(item.quiz.length).fill(null);
	// });
</script>

<div
	style="box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);"
	class="pointer-events-auto relative overflow-hidden rounded-[2vw] bg-white p-[2vw] {clazz}"
>
	{#if currentView === 'READ'}
		<ReadingTextView {scale} {item} setView={(view) => (currentView = view)} />
	{:else if currentView === 'QUIZ'}
		<!-- bind data to persist data in container when switched to other view. -->
		<ReadingQuizView
			bind:correctAnswers
			bind:selected
			{scale}
			{showFinishButton}
			quiz={item.questions}
			{onFinish}
			setView={(view) => (currentView = view)}
		/>
	{/if}
</div>
