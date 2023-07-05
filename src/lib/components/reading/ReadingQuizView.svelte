<script lang="ts">
	import { fade } from 'svelte/transition';
	import { readingAnswers, selectedQuizChoices } from '$lib/global/reading';
	import finishedImage from './reading_quiz_finished_image.png';
	import type { ReadingViewType } from './ReadingContainer.svelte';
	import AnswerCorrectToast from '../toasts/AnswerCorrectToast.svelte';
	import { toast } from '../toasts/ToastManager.svelte';
	import type { MultipleChoicesQuestion } from '$lib/types/reading';

	export let quiz: MultipleChoicesQuestion[];

	export let setView: (view: ReadingViewType) => void;
	export let onFinish: () => void;

	export let scale = 1;

	$: submittable = $selectedQuizChoices.every((val) => val !== null);
	const submit = () => {
		// TODO: implement better way of showing answer (this is very cheese)
		$readingAnswers = quiz.map((q) => q.answer);

		// TODO: display actual amount.
		toast(AnswerCorrectToast, { exp: 25, coin: 100 });
	};
</script>

<!-- https://github.com/sveltejs/svelte/issues/544#issuecomment-586417387 -->
{#key $readingAnswers}
	<div in:fade={{ delay: 500 }} out:fade class="h-full w-full font-bold">
		<div class="flex h-full w-full flex-col overflow-y-auto">
			{#if $readingAnswers === null}
				<div style="font-size: {scale * 2.25}vw;">คำถาม</div>
			{:else}
				<div
					class="mx-auto flex min-h-[13vw] w-[90%] flex-row justify-between rounded-[2vw] bg-gradient-to-br from-[#C698FF] to-[#6C80E8] px-[4vw]"
				>
					<img src={finishedImage} class="mt-auto h-[90%]" alt="Happy Kid" />

					<div style="font-size: {scale * 2.2}vw;" class="my-auto text-white">
						คุณตอบถูก {$selectedQuizChoices.filter((c, i) => c === $readingAnswers[i])
							.length}/{quiz.length} ข้อ
					</div>
				</div>
			{/if}

			<div class="flex flex-col px-[4vw]">
				{#each quiz as q, index (index)}
					<div style="font-size: {scale * 1.5}vw;" class="mt-[2vw]">{index + 1}. {q.question}</div>

					<div class="mt-[2vw] grid grid-cols-2 gap-[2vw]">
						{#each q.choices as choice, i (choice)}
							<button
								disabled={$readingAnswers !== null}
								on:click={() => ($selectedQuizChoices[index] = i)}
								style="font-size: {scale * 1.35}vw;"
								class="w-full rounded-full py-[0.7vw] {$readingAnswers &&
								$readingAnswers[index] === i
									? 'bg-[#14AE5C] text-white'
									: $selectedQuizChoices[index] === i
									? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] text-white'
									: 'border-[0.2vw] border-[#6C80E8] text-black'}"
							>
								{choice}
							</button>
						{/each}
					</div>
				{/each}
			</div>
			<!-- Bottom spacing -->
			<div class="min-h-[20vh] w-full bg-white" />
		</div>

		<div
			style="box-shadow: 0 4px 10px #454545;"
			class="absolute bottom-0 left-0 z-10 flex w-full flex-row items-center justify-between bg-white px-[4vw] py-[2vw]"
		>
			<button
				on:click={() => setView('READ')}
				style="font-size: {scale * 1.3}vw;"
				class="flex flex-row items-center rounded-full border border-black px-[1vw] py-[0.5vw]"
			>
				<svg
					class="mr-[0.5vw] w-[1.3vw]"
					viewBox="0 0 24 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M23 9C23.5523 9 24 8.55228 24 8C24 7.44772 23.5523 7 23 7L23 9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM23 7L1 7L1 9L23 9L23 7Z"
						fill="black"
					/>
				</svg>
				อ่านใหม่
			</button>

			{#if $readingAnswers === null}
				<button
					on:click={submit}
					disabled={!submittable}
					style="font-size: {scale * 1.3}vw;"
					class="rounded-full px-[2vw] py-[0.5vw] {submittable
						? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] text-white'
						: 'bg-[#D9D9D9] text-[#454545]'}"
				>
					ตรวจ
				</button>
			{:else}
				<button
					on:click={onFinish}
					style="font-size: {scale * 1.3}vw;"
					class="rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[2vw] py-[0.5vw] text-white"
				>
					ต่อไป
				</button>
			{/if}
		</div>
	</div>
{/key}
