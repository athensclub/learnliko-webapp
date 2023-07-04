<script lang="ts">
	import type {
		FillInTheBlankMultipleChoicesQuestion,
		ImageMatchingMultipleChoicesQuestion
	} from '$lib/types/pretest';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import AnimatedCheckmark from '../animated_assets/AnimatedCheckmark.svelte';
	import AnimatedCross from '../animated_assets/AnimatedCross.svelte';
	import { onMount } from 'svelte';
	import { getPretestQuizAnswer } from '$api/pretest';

	export let quiz: FillInTheBlankMultipleChoicesQuestion | ImageMatchingMultipleChoicesQuestion;
	export let userAnswer: number;
	export let nextClicked: () => void;
	export let onUserCorrect: () => void;

	let answer: number | null = null;
	onMount(async () => {
		answer = await getPretestQuizAnswer(quiz.id);
		if (answer === userAnswer) onUserCorrect();
	});
</script>

<div class="w-full h-[80vh] bg-white font-line-seed flex flex-col">
	<!-- Explicitly check non-null because 0 evaluated to false -->
	{#if answer !== null}
		{#if answer === userAnswer}
			<AnimatedCheckmark class="w-[10vw] mt-[5vh] mx-auto" />

			<div class="text-[#73AF55] text-[2vw] mx-auto font-bold mt-[2vh]">คำตอบของคุณถูกต้อง</div>
		{:else}
			<AnimatedCross class="w-[10vw] mt-[5vh] mx-auto" />

			<div class="text-[#D06079] text-[2vw] mx-auto font-bold mt-[2vh]">คำตอบของคุณผิด</div>
		{/if}

		<div class="text-[1.6vw] mx-auto mt-[6vh] font-bold text-center">
			"{quiz.choices[answer]}" <br />
			เป็นคำตอบที่ถูกต้องสำหรับคำถามนี้
		</div>

		<button
			on:click={nextClicked}
			class="mx-auto rounded-full w-[40%] h-[4vw] px-[2vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] flex flex-row items-center justify-between font-bold text-white text-[1.5vw] mt-[15vh]"
		>
			Next question

			<svg class="h-[50%]" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM38.0607 13.0607C38.6464 12.4749 38.6464 11.5251 38.0607 10.9393L28.5147 1.3934C27.9289 0.807611 26.9792 0.807611 26.3934 1.3934C25.8076 1.97919 25.8076 2.92893 26.3934 3.51472L34.8787 12L26.3934 20.4853C25.8076 21.0711 25.8076 22.0208 26.3934 22.6066C26.9792 23.1924 27.9289 23.1924 28.5147 22.6066L38.0607 13.0607ZM2 13.5H37V10.5H2V13.5Z"
					fill="white"
				/>
			</svg>
		</button>
	{:else}
		<div class="flex flex-row w-full h-full items-center justify-center font-bold text-[2.2vw]">
			Checking Answer <Typewriter mode="loop">...</Typewriter>
		</div>
	{/if}
</div>
