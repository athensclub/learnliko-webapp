<script lang="ts">
	import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';
	import Select from 'svelte-select/Select.svelte';
	import AddReadingQuiz from './AddReadingQuiz.svelte';
	import AddConversationGoal from './AddConversationGoal.svelte';

	export let index: number;
	export let upload = () => {};

	let mission = '';
	let prompt = '';

	let avatarName = '';
	let avatarImage = '';
	let introduction = '';

	let accents: SynthesizeAccent[] = ['Australia', 'India', 'UK', 'US'];
	let genders: SynthesizeGender[] = ['FEMALE', 'MALE'];

	let accent: SynthesizeAccent = 'US';
	let gender: SynthesizeGender = 'FEMALE';

	let goalIDs: number[] = [];
	let goalGetters: (() => void)[] = [];
</script>

<div class="flex w-[30vw] flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={mission}
		placeholder="Add mission"
	/>

	{#each goalIDs as id, index (id)}
		<AddConversationGoal {index} bind:getValue={goalGetters[index]} />
	{/each}

	<button
		on:click={() => (goalIDs = [...goalIDs, goalIDs.length])}
		class="bg-black py-[0.5vw] text-white">Add Goal</button
	>

	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={avatarName}
		placeholder="Add avatar name"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={avatarImage}
		placeholder="Add avatar image url"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={introduction}
		placeholder="Add introduction sentence"
	/>

	<textarea
		bind:value={prompt}
		class="h-[25vw] w-full border border-[#00000033] px-[1vw] py-[0.3vw]"
		placeholder="Add prompt"
	/>

	<Select items={genders} value={gender} />
	<Select items={accents} value={accent} />
</div>
