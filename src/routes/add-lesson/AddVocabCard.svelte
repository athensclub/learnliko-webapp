<script lang="ts">
	import { synthesize } from '$api/tts';
	import { graphql } from '$gql/generated';
	import type {
		CefrLevelProgress,
		LanguageLevel,
		VocabularyCardCreateDataInput,
		VocabularyChoiceDataInput
	} from '$gql/generated/graphql';
	import { CREATE_VOCAB_CARD } from '$gql/schema/mutations';
	import { graphqlClient } from '$lib/graphql';
	import { shuffle } from '$lib/utils/array';
	import { blobToBase64 } from '$lib/utils/io';
	import { randomIntInclusive } from '$lib/utils/math';

	export let level: LanguageLevel;
	export let coin: number;
	export let exp: number;

	export let index: number;
	export const upload = async () => {
		let ch = shuffle([...choices]);
		let answerIndex = randomIntInclusive(0, ch.length);
		ch = [...ch.slice(0, answerIndex), answer, ...ch.slice(answerIndex)];

		let synthesizedChoices: VocabularyChoiceDataInput[] = [];
		for (let i = 0; i < ch.length; i++) {
			synthesizedChoices[i] = {
				transcriptionUrl: await blobToBase64(await synthesize(ch[i], 'US', 'FEMALE', 0.7)),
				vocab: ch[i]
			};
		}

		let val: VocabularyCardCreateDataInput = {
			choices: synthesizedChoices,
			answerIndex,
			fromLesson: 'unknown',
			imageUrl: imageURL,
			level,
			totalCoin: coin,
			totalExp: exp
		};

		const result = await graphqlClient.mutation(CREATE_VOCAB_CARD, { data: val }).toPromise();
		return { id: result.data?.vocabularyCardCreate.id, totalCoin: coin, totalExp: exp };
	};

	let imageURL = '';
	let answer = '';
	let choices = ['', '', ''];
</script>

<div class="flex w-fit flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={imageURL}
		placeholder="Add image url"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={answer}
		placeholder="Add answer"
	/>
	{#each choices as choice, index}
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={choices[index]}
			placeholder="Add choice {index + 1}"
		/>
	{/each}
</div>
