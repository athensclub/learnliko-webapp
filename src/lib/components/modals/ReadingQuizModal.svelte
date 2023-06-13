<script lang="ts">
	import { showModal } from '$lib/global/modal';
	import { readingAnswers, selectedQuizChoices } from '$lib/global/reading';
	import { completeReadingLocal, queryAnswersLocal } from '$lib/localdb/readingLocal';
	import type { ReadingItem } from '$lib/types/reading';
	import ConfirmModal from './ConfirmModal.svelte';

	export let item: ReadingItem;

	const submit = async () => {
		// TODO: use data from cloud db when ready.
		$readingAnswers = (await queryAnswersLocal(item.id)) ?? null;

		// TODO: also use cloud db here
		// to submit all user answers must not be null already, safely cast selected.
		await completeReadingLocal({
			readingID: item.id,
			userAnswers: $selectedQuizChoices as number[],
			finishedTime: new Date()
		});
	};
</script>

<div
	class="h-[70vh] top-[24vh] bg-white right-[3vw] rounded-3xl font-line-seed text-lg font-bold p-5 flex flex-col overflow-y-auto"
>
	<div class="text-[2vw]">Quiz</div>

	{#each item.quiz as problem, index (index)}
		<div class="mt-[3vh]">
			{index + 1}. {problem.question}

			<div class="flex flex-row flex-wrap gap-[2vw] mt-[2vh]">
				{#each problem.choices as choice, choiceIndex (choiceIndex)}
					<button
						disabled={!!$readingAnswers}
						on:click={() =>
							($selectedQuizChoices = $selectedQuizChoices.map((v, i) =>
								i === index ? choiceIndex : v
							))}
						class={`${
							$readingAnswers
								? choiceIndex === $readingAnswers[index]
									? 'bg-green-400'
									: choiceIndex === $selectedQuizChoices[index]
									? 'bg-red-400'
									: 'bg-[#B6BAFF]'
								: 'bg-[#B6BAFF]'
						}  text-start py-[1vh] px-[1vw] rounded-full text-[1vw] text-[#fff] outline-black outline ${
							$selectedQuizChoices[index] === choiceIndex ? 'outline-0 bg-[#FFD281]' : 'outline-0'
						}`}
					>
						{String.fromCharCode(choiceIndex + 'A'.charCodeAt(0))}. {choice}
					</button>
				{/each}
			</div>
		</div>
	{/each}

	{#if !$readingAnswers}
		<button
			on:click={submit}
			disabled={$selectedQuizChoices.some((s) => s === null)}
			class="mt-7 bg-[#6C80E8] w-fit mx-auto px-5 py-1 rounded-lg shadow-md text-white"
		>
			Submit
		</button>
	{/if}
</div>
