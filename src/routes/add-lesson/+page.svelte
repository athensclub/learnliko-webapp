<script lang="ts">
	import { LanguageLevel, QuizType, type NarrativeDataInput } from '$gql/generated/graphql';
	import Select from 'svelte-select/Select.svelte';
	import AddNarrativeCard from './AddNarrativeCard.svelte';
	import AddVocabCard from './AddVocabCard.svelte';
	import AddWritingCard from './AddWritingCard.svelte';
	import AddReadingCard from './AddReadingCard.svelte';
	import AddConversationCard from './AddConversationCard.svelte';
	import { CREATE_LESSON_CARD } from '$gql/schema/mutations';
	import { graphqlClient } from '$lib/graphql';
	import { synthesize, type SynthesizeAccent, type SynthesizeGender } from '$api/tts';
	import { blobToBase64 } from '$lib/utils/io';

	const levels = [LanguageLevel.PreA1, LanguageLevel.A1, LanguageLevel.A2];

	let data = {
		[LanguageLevel.PreA1]: {
			vocab: {
				exp: 50,
				coin: 10
			},
			sentence: {
				exp: 50,
				coin: 10
			},
			reading: {
				exp: 20,
				coin: 5
			},
			conver: {
				exp: 100,
				coin: 20
			}
		},
		[LanguageLevel.A1]: {
			vocab: {
				exp: 60,
				coin: 10
			},
			sentence: {
				exp: 60,
				coin: 10
			},
			reading: {
				exp: 30,
				coin: 5
			},
			conver: {
				exp: 120,
				coin: 20
			}
		},
		[LanguageLevel.A2]: {
			vocab: {
				exp: 70,
				coin: 10
			},
			sentence: {
				exp: 70,
				coin: 10
			},
			reading: {
				exp: 40,
				coin: 5
			},
			conver: {
				exp: 130,
				coin: 20
			}
		}
	};

	let level = LanguageLevel.PreA1;
	let title = '';
	let imageURL = '';
	let description = '';
	let botMessage = '';
	let ambient = '';

	let narrativeIDs: number[] = [];
	let narrativesGetter: (() => NarrativeDataInput)[] = [];

	let vocabIDs: number[] = [];
	let vocabsUploader: (() => Record<string, unknown>)[] = [];

	let writingIDs: number[] = [];
	let writingsUploader: (() => Record<string, unknown>)[] = [];

	let readingIDs: number[] = [];
	let readingsUploader: (() => Record<string, unknown>)[] = [];

	let conversationIDs: number[] = [];
	let conversationsUploader: (() => Record<string, unknown>)[] = [];

	const upload = async () => {
		alert(
			'Hide this alert box to start uploading. Please do not touch any input fields and buttons.'
		);

		let vocabs = [];
		let writings = [];
		let readings = [];
		let conversations = [];
		for (let u of vocabsUploader) vocabs.push(await u());
		for (let u of writingsUploader) writings.push(await u());
		for (let u of readingsUploader) readings.push(await u());
		for (let u of conversationsUploader) conversations.push(await u());
		console.log(vocabs, writings, readings, conversations);

		const sum = (arr: Record<string, unknown>[], key: string) => {
			let ans = 0;
			for (let val of arr) ans += val[key] as number;
			return ans;
		};

		const botIntroTranscription = await blobToBase64(
			await synthesize(
				botMessage,
				conversations[0].accent as SynthesizeAccent,
				conversations[0].gender as SynthesizeGender,
				0.7
			)
		);

		console.log(
			'narratives',
			narrativesGetter.map((g) => g())
		);

		const result = await graphqlClient
			.mutation(CREATE_LESSON_CARD, {
				data: {
					ambientAudio: ambient,
					backgroundUrl: 'unknown',
					coin:
						sum(vocabs, 'totalCoin') +
						sum(writings, 'totalCoin') +
						sum(readings, 'totalCoin') +
						sum(conversations, 'totalCoin'),
					exp:
						sum(vocabs, 'totalExp') +
						sum(writings, 'totalExp') +
						sum(readings, 'totalExp') +
						sum(conversations, 'totalExp'),
					description,
					intro: {
						bot: conversations[0].botId as string,
						message: botMessage,
						transcription: botIntroTranscription
					},
					level: level.value,
					narratives: narrativesGetter.map((g) => g()),
					quizeSections: [
						{
							title: 'unknown',
							type: QuizType.Vocabulary,
							cards: vocabs.map((v) => v.id as string)
						},
						{
							title: 'unknown',
							type: QuizType.Sentence,
							cards: writings.map((v) => v.id as string)
						},
						{
							title: 'unknown',
							type: QuizType.Reading,
							cards: readings.map((v) => v.id as string)
						},
						{
							title: 'unknown',
							type: QuizType.Conversation,
							cards: conversations.map((v) => v.id as string)
						}
					],
					title
				}
			})
			.toPromise();
		console.log(result);

		alert('Upload Finished');
	};
</script>

<div class="flex min-h-[100vh] w-full flex-col gap-[2vw] p-[2vw] font-line-seed text-[1.5vw]">
	<div class="flex flex-row gap-[2vw]">
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={title}
			placeholder="Add Title"
		/>
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={imageURL}
			placeholder="Add Image cover url"
		/>
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={ambient}
			placeholder="Add ambient url"
		/>

		<button on:click={upload} class="ml-auto bg-black px-[1vw] py-[0.3vw] text-white">Upload</button
		>
	</div>

	<div class="flex flex-row gap-[2vw]">
		<Select class="w-[13vw]" bind:value={level} items={levels} />
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={description}
			placeholder="Add card description"
		/>
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw]"
			bind:value={botMessage}
			placeholder="Add bot intro message"
		/>
	</div>

	<div class="mt-[2vw] flex flex-row items-center gap-[2vw]">
		Narrative
		<button
			on:click={() => (narrativeIDs = [...narrativeIDs, narrativeIDs.length])}
			class="bg-black px-[1vw] py-[0.3vw] text-white"
		>
			Add Narrative
		</button>
	</div>

	<div class="flex flex-row gap-[2vw] overflow-x-auto py-[2vw]">
		{#each narrativeIDs as id, index (id)}
			<AddNarrativeCard {index} bind:getValue={narrativesGetter[index]} />
		{/each}
	</div>

	<div class="mt-[2vw] flex flex-row items-center gap-[2vw]">
		Vocabs
		<button
			on:click={() => (vocabIDs = [...vocabIDs, vocabIDs.length])}
			class="bg-black px-[1vw] py-[0.3vw] text-white"
		>
			Add Vocabs
		</button>
	</div>

	<div class="flex flex-row gap-[2vw] overflow-x-auto py-[2vw]">
		{#each vocabIDs as id, index (id)}
			<AddVocabCard
				level={level.value}
				coin={data[level.value].vocab.coin}
				exp={data[level.value].vocab.exp}
				{index}
				bind:upload={vocabsUploader[index]}
			/>
		{/each}
	</div>

	<div class="mt-[2vw] flex flex-row items-center gap-[2vw]">
		Writings
		<button
			on:click={() => (writingIDs = [...writingIDs, writingIDs.length])}
			class="bg-black px-[1vw] py-[0.3vw] text-white"
		>
			Add Writings
		</button>
	</div>

	<div class="flex flex-row gap-[2vw] overflow-x-auto py-[2vw]">
		{#each writingIDs as id, index (id)}
			<AddWritingCard
				level={level.value}
				coin={data[level.value].sentence.coin}
				exp={data[level.value].sentence.exp}
				{index}
				bind:upload={writingsUploader[index]}
			/>
		{/each}
	</div>

	<div class="mt-[2vw] flex flex-row items-center gap-[2vw]">
		Reading (** CURRENTLY ONLY SUPPORT 1 READING PER LESSON **)
		<button
			on:click={() => (readingIDs = [...readingIDs, readingIDs.length])}
			class="bg-black px-[1vw] py-[0.3vw] text-white"
		>
			Add Reading
		</button>
	</div>

	<div class="flex flex-row gap-[2vw] overflow-x-auto py-[2vw]">
		{#each readingIDs as id, index (id)}
			<AddReadingCard
				level={level.value}
				coin={data[level.value].reading.coin}
				exp={data[level.value].reading.exp}
				{index}
				bind:upload={readingsUploader[index]}
			/>
		{/each}
	</div>

	<div class="mt-[2vw] flex flex-row items-center gap-[2vw]">
		Conversation (** CURRENTLY ONLY SUPPORT 1 CONVERSATION PER LESSON **)
		<button
			on:click={() => (conversationIDs = [...conversationIDs, conversationIDs.length])}
			class="bg-black px-[1vw] py-[0.3vw] text-white"
		>
			Add Conversation
		</button>
	</div>

	<div class="flex flex-row gap-[2vw] overflow-x-auto py-[2vw]">
		{#each conversationIDs as id, index (id)}
			<AddConversationCard
				level={level.value}
				coin={data[level.value].conver.coin}
				exp={data[level.value].conver.exp}
				{index}
				bind:upload={conversationsUploader[index]}
			/>
		{/each}
	</div>
</div>
