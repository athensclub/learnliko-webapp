<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import ReadMore from '$lib/components/ReadMore.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { showModal } from '$lib/global/modal';
	import {
		completeReadingLocal,
		getUserSubmissionLocal,
		queryAnswersLocal
	} from '$lib/localdb/readingLocal';
	import type { ReadingItem } from '$lib/types/reading';
	import { onMount } from 'svelte';

	export let data: PageData;
	let item: ReadingItem = data.item;
	let selected: (null | number)[] = Array(item.quiz.length).fill(null);

	// if not null -> user submitted
	let answers: null | number[] = null;

	// TODO: use cloud db when ready. also should move to ssr.
	onMount(async () => {
		let userSubmission = await getUserSubmissionLocal(item.id);

		if (userSubmission) {
			selected = userSubmission;
			answers = await queryAnswersLocal(item.id);
		}
	});

	const submit = () => {
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to submit your answer?',
			onConfirm: async () => {
				// TODO: use data from cloud db when ready.
				answers = (await queryAnswersLocal(item.id)) ?? null;

				// TODO: also use cloud db here
				// to submit all user answers must not be null already, safely cast selected.
				await completeReadingLocal({
					readingID: item.id,
					userAnswers: selected as number[],
					finishedTime: new Date()
				});
			}
		});
	};
</script>

<div class="w-full min-h-[100vh]">
	<div
		style="background-image: url('{item.image}');"
		class="relative bg-cover bg-center w-[100vw] h-[100vh] font-line-seed"
	>
		<div class="w-[100vw] h-[100vh] backdrop-blur-md bg-[#FFFFFF0D]" />

		<div class="absolute top-0 left-0 flex flex-col w-full px-[15vw] pt-[5vh]">
			<img
				class="max-w-[30vw] max-h-[60vh] w-auto h-auto mx-auto rounded-3xl"
				src={item.image}
				alt={item.blogName}
			/>

			<div class="flex flex-row items-center justify-center w-full gap-[4vw] mt-[5vh] font-bold">
				<div class="text-white flex items-center justify-center text-[1.6vw]">
					You will get 🧿 300 coin if you correct all quizzes
				</div>

				<button class="bg-white h-fit py-[1vh] px-[3vw] text-[1.2vw] rounded-3xl">Take Quiz</button>
			</div>
		</div>
	</div>

	<div class="bg-white px-[15vw] pt-[5vh] font-line-seed">
		<div class="font-bold text-[3.5vw]">{item.blogName}</div>
		<div class="text-[1.7vw] mt-[5vh]">{item.content}</div>
	</div>

	<!-- Bottom spacing -->
	<div class="w-full h-[15vh]"></div>
</div>

<!-- <div class="w-full h-full min-h-[100vh] bg-white">
	<Header />
	<div class="w-full h-[100px]" />

	<div class="font-line-seed w-[24vw] fixed top-[23vh] left-[6vw] flex flex-col p-4">
		<h2 class="text-xl font-bold mb-2">{item.blogName}</h2>
		<p class="text-gray-600">Topic: {item.topic}</p>
		<p class="text-gray-600">Date and Time: {item.dateTime}</p>
		<img class="mt-2 rounded-lg mb-2" src={item.image} alt="Blog" />
	</div>

	<div class="font-bold w-[32vw] mx-auto px-4 py-4 rounded-xl whitespace-pre-wrap font-line-seed">
		{item.content}
	</div>

	<div
		class="w-[28vw] h-[60vh] top-[24vh] bg-white shadow-md fixed right-[3vw] rounded-3xl font-line-seed text-lg font-bold p-5 flex flex-col overflow-y-auto"
	>
		Quiz

		{#each item.quiz as problem, index (index)}
			<div class="mt-5">
				{index + 1}. {problem.question}

				<div class="flex flex-row flex-wrap gap-5 mt-3">
					{#each problem.choices as choice, choiceIndex (choiceIndex)}
						<button
							disabled={!!answers}
							on:click={() => (selected = selected.map((v, i) => (i === index ? choiceIndex : v)))}
							class={`${
								answers
									? choiceIndex === answers[index]
										? 'bg-green-400'
										: choiceIndex === selected[index]
										? 'bg-red-400'
										: 'bg-[#B6BAFF]'
									: 'bg-[#B6BAFF]'
							}  text-start py-1 px-4 rounded-full text-[1vw] text-[#fff] outline-black outline ${
								selected[index] === choiceIndex ? 'outline-0 bg-[#FFD281]' : 'outline-0'
							}`}
						>
							{String.fromCharCode(choiceIndex + 'A'.charCodeAt(0))}. {choice}
						</button>
					{/each}
				</div>
			</div>
		{/each}

		{#if !answers}
			<button
				on:click={submit}
				disabled={selected.some((s) => s === null)}
				class="mt-7 bg-[#6C80E8] w-fit mx-auto px-5 py-1 rounded-lg shadow-md text-white"
			>
				Submit
			</button>
		{/if}
	</div>
</div> -->
