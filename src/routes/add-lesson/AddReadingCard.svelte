<script lang="ts">
	import type { LanguageLevel, ReadingQuestionDataInput } from '$gql/generated/graphql';
	import { CREATE_READING_CARD } from '$gql/schema/mutations';
	import { graphqlClient } from '$lib/graphql';
	import AddReadingQuiz from './AddReadingQuiz.svelte';

	export let level: LanguageLevel;
	export let coin: number;
	export let exp: number;

	export let index: number;

	export const upload = async () => {
		const result = await graphqlClient
			.mutation(CREATE_READING_CARD, {
				data: {
					fromLesson: 'unknown',
					level,
					// TODO: support multiple paragraphs
					pages: [
						{
							illustrationUrl: imageURL,
							text: content
						}
					],
					title,
					totalCoin: quizGetters.length * coin,
					totalExp: quizGetters.length * exp,
					topics: ['unknown'],
					questions: quizGetters.map((g) => g())
				}
			})
			.toPromise();
		return {
			id: result.data?.readingCardCreate.id,
			totalCoin: quizGetters.length * coin,
			totalExp: quizGetters.length * exp
		};
	};

	let title = '';
	let content = '';
	let imageURL = '';

	let quizIDs: number[] = [];
	let quizGetters: (() => ReadingQuestionDataInput)[] = [];
</script>

<div class="flex w-[30vw] flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={title}
		placeholder="Add Title"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={imageURL}
		placeholder="Add image url"
	/>
	<textarea
		bind:value={content}
		class="h-[25vw] w-full border border-[#00000033] px-[1vw] py-[0.3vw]"
		placeholder="Add content"
	/>

	{#each quizIDs as id, index (id)}
		<AddReadingQuiz {coin} {exp} {index} bind:getValue={quizGetters[index]} />
	{/each}

	<button
		on:click={() => (quizIDs = [...quizIDs, quizIDs.length])}
		class="bg-black py-[0.5vw] text-white">Add Quiz</button
	>
</div>
