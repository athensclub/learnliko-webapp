<script lang="ts">
	import { LanguageLevel } from '$gql/generated/graphql';
	import Select from 'svelte-select/Select.svelte';
	import AddNarrativeCard from './AddNarrativeCard.svelte';
	import AddVocabCard from './AddVocabCard.svelte';
	import AddWritingCard from './AddWritingCard.svelte';
	import AddReadingCard from './AddReadingCard.svelte';
	import AddConversationCard from './AddConversationCard.svelte';

	const levels = [LanguageLevel.PreA1, LanguageLevel.A1, LanguageLevel.A2];

	let level = LanguageLevel.PreA1;
	let title = '';
	let imageURL = '';
	let description = '';
	let botMessage = '';
	let ambient = '';

	let narrativeIDs: number[] = [];
	let narrativesUploader: (() => string)[] = [];

	let vocabIDs: number[] = [];
	let vocabsUploader: (() => string)[] = [];

	let writingIDs: number[] = [];
	let writingsUploader: (() => string)[] = [];

	let readingIDs: number[] = [];
	let readingsUploader: (() => string)[] = [];

	let conversationIDs: number[] = [];
	let conversationsUploader: (() => string)[] = [];
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

		<button class="ml-auto bg-black px-[1vw] py-[0.3vw] text-white">Upload</button>
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
			<AddNarrativeCard {index} bind:upload={narrativesUploader[index]} />
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
			<AddVocabCard {index} bind:upload={vocabsUploader[index]} />
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
			<AddWritingCard {index} bind:upload={writingsUploader[index]} />
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
			<AddReadingCard {index} bind:upload={readingsUploader[index]} />
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
			<AddConversationCard {index} bind:upload={conversationsUploader[index]} />
		{/each}
	</div>
</div>
