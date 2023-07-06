<script lang="ts">
	import type { ReadingQuestionDataInput } from '$gql/generated/graphql';
	import { shuffle } from '$lib/utils/array';
	import { randomIntInclusive } from '$lib/utils/math';

	export let coin: number;
	export let exp: number;

	export let index: number;

	export const getValue = (): ReadingQuestionDataInput => {
		let ch = shuffle([...choices]);
		let answerIndex = randomIntInclusive(0, ch.length);
		ch = [...ch.slice(0, answerIndex), answer, ...ch.slice(answerIndex)];

		return {
			answerIndex,
			choices: ch,
			coin,
			exp,
			question
		};
	};

	let question = '';
	let answer = '';
	let choices = ['', '', ''];
</script>

<div class="mb-[3vw] flex flex-col gap-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={question}
		placeholder="Add Question {index + 1}"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={answer}
		placeholder="Add answer"
	/>
	{#each choices as choice, index}
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={choice}
			placeholder="Add choice {index + 1}"
		/>
	{/each}
</div>
