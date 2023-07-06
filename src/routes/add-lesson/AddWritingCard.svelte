<script lang="ts">
	import type { LanguageLevel } from '$gql/generated/graphql';
	import { CREATE_SENTENCE_CARD } from '$gql/schema/mutations';
	import { graphqlClient } from '$lib/graphql';
	import { shuffle } from '$lib/utils/array';
	import { randomIntInclusive } from '$lib/utils/math';

	export let level: LanguageLevel;
	export let coin: number;
	export let exp: number;

	export let index: number;

	export const upload = async () => {
		let ch = shuffle([...choices]);
		let answerIndex = randomIntInclusive(0, ch.length);
		ch = [...ch.slice(0, answerIndex), answer, ...ch.slice(answerIndex)];

		const result = await graphqlClient
			.mutation(CREATE_SENTENCE_CARD, {
				data: {
					answerIndex,
					choices: ch,
					fromLesson: 'unknown',
					level,
					question: `${startSentence} _ ${endSentence}`,
					totalCoin: coin,
					totalExp: exp
				}
			})
			.toPromise();
		return { id: result.data?.sentenceCardCreate.id, totalCoin: coin, totalExp: exp };
	};

	let startSentence = '';
	let endSentence = '';
	let answer = '';
	let choices = ['', '', ''];
</script>

<div class="flex w-fit flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<div class="flex flex-row gap-[2vw]">
		<input
			class="w-[13vw] border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={startSentence}
			placeholder="Start sentence"
		/>
		<input
			class="w-[13vw] border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={endSentence}
			placeholder="End sentence"
		/>
	</div>

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
