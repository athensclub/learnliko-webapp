<script lang="ts">
	import { fade } from 'svelte/transition';
	import ReadingContainer from '$lib/components/reading/ReadingContainer.svelte';
	import type { Activity, ReadingCard } from '$gql/generated/graphql';
	import { isMobile } from '$lib/global/breakpoints';
	import LessonSelectionActivityView from './LessonSelectionActivityView.svelte';

	export let onFinish: () => void;

	export let data: Activity;
	let item: ReadingCard = data.cards[0] as ReadingCard;

	let quiz = item.questions;

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
		<div class="pointer-events-auto mt-[20vw] flex flex-col">
			<div
				class="relative overflow-hidden bg-white {$isMobile
					? 'h-[62vh] w-[85vw] rounded-[4vw]'
					: 'h-[30vw] w-[60vw]'}"
			>
				{#key pageIndex}
					<!-- absolute positioning to do proper transition -->
					<div transition:fade class="absolute left-0 top-0 flex h-full w-full flex-col p-[6vw]">
						<div class="flex-1 flex-col overflow-y-auto">
							<img
								class="max-w-full rounded-[4vw]"
								src={currentPage.illustrationUrl}
								alt="Illustration"
							/>

							<div class="mt-[5vw] text-[5.5vw] font-bold">{item.title}</div>
							<div class="mt-[2vw] text-[4vw]">{currentPage.text}</div>

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
							class="h-[4vw] w-[12vw] rounded-full {pageIndex === index
								? 'bg-black'
								: 'bg-[#D9D9D9]'}"
						/>
					{/each}
				</div>
			</div>

			<button
				on:click={() => (currentView = 'QUIZ')}
				class="mx-auto mt-[4vw] w-fit rounded-full bg-white px-[6vw] py-[1vw] text-[4.5vw] font-bold"
			>
				ตอบคำถาม
			</button>
		</div>
	</div>
{:else if currentView === 'QUIZ'}
	<!-- Use this view's onFinish trigger, so no op for selection activity onFinish -->
	<LessonSelectionActivityView
		onFinish={() => {}}
		items={quiz}
		updateItems={(items) => (quiz = items)}
	>
		<button
			on:click={() => (currentView = 'READING')}
			class="pointer-events-auto mx-auto mt-[4vw] w-fit rounded-full bg-white px-[6vw] py-[1vw] text-[4.5vw] font-bold"
			slot="bottom"
		>
			อ่านเนื้อหา
		</button>
	</LessonSelectionActivityView>
{/if}
