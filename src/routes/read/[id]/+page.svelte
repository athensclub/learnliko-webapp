<script lang="ts">
	import ReadingQuizModal from '$lib/components/modals/ReadingQuizModal.svelte';
	import { showModal } from '$lib/global/modal';
	import {
		initializeReadingData,
		readingAnswers,
		resetReadingData,
		selectedQuizChoices
	} from '$lib/global/reading';
	import type { ReadingItem } from '$lib/types/reading';
	import { onMount } from 'svelte';

	export let data: PageData;
	let item: ReadingItem = data.item;
	let coin = 300;

	const goBack = () => window.history.back();
	const showQuiz = () => showModal(ReadingQuizModal, { item });

	$: correct = $readingAnswers
		? $readingAnswers.filter((v, i) => $selectedQuizChoices[i] === v).length
		: null;

	resetReadingData();
	onMount(() => initializeReadingData(item));
</script>

<div class="w-full min-h-[100vh]">
	<div
		style="background-image: url('{item.image}');"
		class="relative bg-cover bg-center w-[100vw] h-[100vh] font-line-seed"
	>
		<div class="w-[100vw] h-[100vh] backdrop-blur-md bg-[#FFFFFF0D]" />

		<div class="absolute top-0 left-0 flex flex-col w-full px-[15vw] pt-[5vh]">
			<button on:click={goBack} class="bg-black rounded-full h-[5vh] px-[2vw] w-fit">
				<svg class="h-[50%]" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M46.08 15.8758C47.1404 15.8758 48 15.0363 48 14.0008C48 12.9653 47.1404 12.1258 46.08 12.1258V15.8758ZM0.562355 12.675C-0.187452 13.4072 -0.187452 14.5944 0.562355 15.3266L12.7812 27.2591C13.531 27.9913 14.7466 27.9913 15.4965 27.2591C16.2463 26.5267 16.2463 25.3397 15.4965 24.6075L4.63528 14.0008L15.4965 3.39419C16.2463 2.66195 16.2463 1.47477 15.4965 0.742534C14.7466 0.0103012 13.531 0.0103012 12.7812 0.742534L0.562355 12.675ZM46.08 12.1258H1.92V15.8758H46.08V12.1258Z"
						fill="white"
					/>
				</svg>
			</button>

			<img
				class="max-w-[60vw] max-h-[70vh] w-auto h-auto mx-auto rounded-3xl"
				src={item.image}
				alt={item.blogName}
			/>

			<div class="flex flex-row items-center justify-center w-full gap-[4vw] mt-[5vh] font-bold">
				<div class="text-white flex items-center justify-center text-[2vw]">
					{#if $readingAnswers && correct}
						You correct {correct}/{item.quiz.length} of quizzes and got 🧿{(correct /
							item.quiz.length) *
							coin} coin
					{:else}
						You will get 🧿 {coin} coin if you correct all quizzes
					{/if}
				</div>

				<button
					on:click={showQuiz}
					class="bg-white h-fit py-[1vh] px-[3vw] text-[1.35vw] rounded-3xl">Take Quiz</button
				>
			</div>
		</div>
	</div>

	<div class="bg-white px-[15vw] pt-[5vh] font-line-seed">
		<div class="font-bold text-[3.5vw]">{item.blogName}</div>
		<div class="whitespace-pre-wrap text-[1.7vw] mt-[5vh]">{item.content}</div>
	</div>

	<!-- Bottom spacing -->
	<div class="w-full h-[15vh]" />
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
