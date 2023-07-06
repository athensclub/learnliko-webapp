<script lang="ts">
	import AddReadingQuiz from './AddReadingQuiz.svelte';

	export let index: number;
	export let upload = () => {};

	let title = '';
	let content = '';

	let quizIDs: number[] = [];
	let quizGetters: (() => void)[] = [];
</script>

<div class="flex w-[30vw] flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={title}
		placeholder="Add Title"
	/>
	<textarea
		bind:value={content}
		class="h-[25vw] w-full border border-[#00000033] px-[1vw] py-[0.3vw]"
		placeholder="Add content"
	/>

	{#each quizIDs as id, index (id)}
		<AddReadingQuiz {index} bind:getValue={quizGetters[index]} />
	{/each}

	<button
		on:click={() => (quizIDs = [...quizIDs, quizIDs.length])}
		class="bg-black py-[0.5vw] text-white">Add Quiz</button
	>
</div>
