<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Activity, ReadingCard } from '$gql/generated/graphql';
	import { isMobile } from '$lib/global/breakpoints';
	import LessonSelectionActivityView from './LessonSelectionActivityView.svelte';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	/**
	 * Called when the height of shown component of this activity changes.
	 */
	export let updateHeight: (pixels: number) => {};
	let height = 0;
	$: updateHeight(height);

	export let data: Activity;
	let item: ReadingCard = data.cards[0] as ReadingCard;

	let quiz = item.questions;
	let initialQuizLength = quiz.length;

	let currentView: 'READING' | 'QUIZ' = 'READING';

	let pageIndex = 0;
	$: currentPage = item.pages[pageIndex];

	$: if (quiz.length === 0) {
		onFinish();
	}
</script>

{#if currentView === 'READING'}
	<div
		transition:fade
		class="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"
	>
		<div class="pointer-events-auto mt-[16vw] flex flex-col" bind:clientHeight={height}>
			<div class="relative h-[57vh] w-[85vw] overflow-hidden rounded-[8.2vw] bg-white">
				{#key pageIndex}
					<!-- absolute positioning to do proper transition -->
					<div transition:fade class="absolute left-0 top-0 flex h-full w-full flex-col p-[7.7vw]">
						<div class="flex-1 flex-col overflow-y-auto">
							<img
								class="h-[23.7vh] w-full rounded-[4.6vw] object-cover"
								src={currentPage.illustrationUrl}
								alt="Illustration"
							/>

							<div class="mt-[2vh] text-[5.8vw] font-bold">{item.title}</div>
							<div class="mt-[1vh] text-[4.8vw]">{currentPage.text}</div>

							<!-- Bottom spacing -->
							<div class="h-[8vw] w-full" />
						</div>
					</div>
				{/key}

				<div
					class="absolute bottom-0 left-0 flex w-full flex-row items-center justify-center gap-[3vw] bg-white py-[4vw]"
				>
					{#each item.pages as _, index}
						<button
							on:click={() => (pageIndex = index)}
							class="aspect-[37/10] w-[9.5vw] rounded-full {pageIndex === index
								? 'bg-black'
								: 'bg-[#D9D9D9]'}"
						/>
					{/each}
				</div>
			</div>

			<button
				on:click={() => (currentView = 'QUIZ')}
				class="mx-auto mt-[4vw] w-fit rounded-full bg-white px-[6.9vw] py-[0.8vh] text-[3.8vw] font-bold"
			>
				ตอบคำถาม
			</button>
		</div>
	</div>
{:else if currentView === 'QUIZ'}
	<!-- Use this view's onFinish trigger, so no op for selection activity onFinish.
		 Also use this view's addProgress, ignore the argument in addProgresss -->
	<LessonSelectionActivityView
		{updateHeight}
		addProgress={(_) => addProgress(1 / initialQuizLength)}
		onFinish={() => {}}
		items={quiz}
		updateItems={(items) => (quiz = items)}
	>
		<button
			on:click={() => (currentView = 'READING')}
			class="pointer-events-auto mx-auto mt-[4vw] w-fit rounded-full bg-white px-[6.9vw] py-[0.8vh] text-[3.8vw] font-bold"
			slot="bottom"
		>
			อ่านเนื้อหา
		</button>
	</LessonSelectionActivityView>
{/if}
