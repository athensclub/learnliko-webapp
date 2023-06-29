<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ReadingViewType } from './ReadingView.svelte';

	export let quiz = [
		{
			question: 'พ่อของ Andy ทำงานอะไร?',
			choices: ['Teacher', 'Doctor', 'Police', 'Soldier']
		}
	];
	export let setView: (view: ReadingViewType) => void;

	let answers: (number | null)[] = Array(quiz.length).fill(null);

	$: submittable = answers.every((val) => val !== null);
</script>

<!-- https://github.com/sveltejs/svelte/issues/544#issuecomment-586417387 -->
<div in:fade={{delay:500}} out:fade class="w-full h-full font-bold">
	<div class="flex flex-col overflow-y-auto">
		<div class="text-[2.25vw]">คำถาม</div>

		<div class="flex flex-col px-[4vw]">
			{#each quiz as q, index (index)}
				<div class="text-[1.5vw] mt-[2vw]">{index + 1}. {q.question}</div>

				<div class="grid grid-cols-2 gap-[2vw] mt-[2vw]">
					{#each q.choices as choice, i (choice)}
						<button
							on:click={() => (answers[index] = i)}
							class="w-full py-[0.7vw] text-[1.35vw] rounded-full {answers[index] === i
								? 'text-white bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]'
								: 'text-black border-[0.2vw] border-[#6C80E8]'}"
						>
							{choice}
						</button>
					{/each}
				</div>
			{/each}
		</div>
		<!-- Bottom spacing -->
		<div class="w-full h-[10vh]" />
	</div>

	<div
		style="box-shadow: 0 4px 10px #454545;"
		class="absolute w-full bottom-0 left-0 px-[4vw] py-[2vw] flex flex-row justify-between items-center"
	>
		<button
			on:click={() => setView('READ')}
			class="text-[1.3vw] px-[1vw] py-[0.5vw] border border-black flex flex-row items-center rounded-full"
		>
			<svg
				class="w-[1.3vw] mr-[0.5vw]"
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

		<button
			class="text-[1.3vw] px-[2vw] py-[0.5vw] rounded-full {submittable
				? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] text-white'
				: 'bg-[#D9D9D9] text-[#454545]'}"
		>
			ตรวจ
		</button>
	</div>
</div>
