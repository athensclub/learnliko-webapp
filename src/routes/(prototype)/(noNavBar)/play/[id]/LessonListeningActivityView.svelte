<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Activity, ListeningCard } from '$gql/generated/graphql';
	import { isMobile } from '$lib/global/breakpoints';
	import LessonSelectionActivityView from './LessonSelectionActivityView.svelte';
	import { Howl } from 'howler';
	import { secondsToHHMM } from '$lib/utils/time';
	import { onDestroy } from 'svelte';

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	export let data: Activity;
	let item: ListeningCard = data.cards[0] as ListeningCard;

	let currentTimeTracker: NodeJS.Timer | null = null;

	let currentTime = 0;
	let duration = 0;
	let audio = new Howl({
		src: item.audioUrl,
		onplay: () => {
			if (currentTimeTracker) clearInterval(currentTimeTracker);
			currentTimeTracker = setInterval(() => (currentTime = audio.seek()), 1000);
		},
		onseek: () => {
			currentTime = audio.seek();
		},
		onpause: () => {
			if (currentTimeTracker) clearInterval(currentTimeTracker);
		},
		onstop: () => {
			if (currentTimeTracker) clearInterval(currentTimeTracker);
		},
		onload: () => {
			duration = audio.duration();
		}
	});

	let progressBar: HTMLDivElement;
	const onProgressBarClicked = (
		e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }
	) => {
		const rect = progressBar.getBoundingClientRect();
		audio.seek(((e.clientX - rect.left) / rect.width) * duration);
	};

	let isPlaying = false;
	$: if (isPlaying) {
		audio.play();
	} else {
		audio.pause();
	}

	let quiz = item.questions;
	let initialQuizLength = quiz.length;

	let currentView: 'LISTENING' | 'QUIZ' = 'LISTENING';

	$: if (quiz.length === 0) {
		onFinish();
	}

	onDestroy(() => {
		if (currentTimeTracker) clearInterval(currentTimeTracker);
		audio.unload();
	});
</script>

{#if currentView === 'LISTENING'}
	<div
		transition:fade
		class="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"
	>
		<div class="pointer-events-auto mt-[16vw] flex flex-col">
			<div
				class="flex flex-col justify-between overflow-hidden bg-white p-[6vw] {$isMobile
					? 'h-[57vh] w-[85vw] rounded-[4vw]'
					: 'h-[30vw] w-[60vw]'}"
			>
				<div class="mx-auto text-[5.5vw] font-bold">{item.title}</div>

				<img
					class="max-h-[50%] max-w-full rounded-[4vw]"
					src={item.illustrationUrl}
					alt="Podcast Illustration"
				/>

				<div class="flex w-full flex-col">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						bind:this={progressBar}
						on:click={onProgressBarClicked}
						class="h-[4vw] w-full rounded-full bg-[#F0F0F0]"
					>
						<div
							style="width: {duration === 0 ? 0 : (currentTime / duration) * 100}%;"
							class="h-full rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] transition-size"
						/>
					</div>

					<div class="flex w-full flex-row justify-between text-[3.5vw] font-bold">
						<div>00:00</div>
						<div>{secondsToHHMM(duration)}</div>
					</div>

					<button
						on:click={() => (isPlaying = !isPlaying)}
						class="mx-auto flex w-[15vw] items-center justify-center rounded-full shadow-all"
					>
						{#if isPlaying}
							<svg
								class="h-[40%]"
								fill="#9BA1FD"
								viewBox="0 0 32 32"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>pause</title>
								<path
									d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"
								/>
							</svg>
						{:else}
							<svg
								class="h-[40%]"
								fill="#9BA1FD"
								viewBox="0 0 32 32"
								version="1.1"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>play</title>
								<path
									d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"
								/>
							</svg>
						{/if}
					</button>
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
	<!-- Use this view's onFinish trigger, so no op for selection activity onFinish.
		 Also use this view's addProgress, ignore the argument in addProgresss -->
	<LessonSelectionActivityView
		addProgress={(_) => addProgress(1 / initialQuizLength)}
		onFinish={() => {}}
		items={quiz}
		updateItems={(items) => (quiz = items)}
	>
		<button
			on:click={() => (currentView = 'LISTENING')}
			class="pointer-events-auto mx-auto mt-[4vw] w-fit rounded-full bg-white px-[6vw] py-[1vw] text-[4.5vw] font-bold"
			slot="bottom"
		>
			ฟังเนื้อหา
		</button>
	</LessonSelectionActivityView>
{/if}
