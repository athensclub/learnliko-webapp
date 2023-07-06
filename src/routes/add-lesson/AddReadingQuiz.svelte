<script lang="ts">
	export let index: number;
	export let getValue = () => {};

	let question = '';
	let answer = '';
	let choices = ['', '', ''];
</script>

<div class="flex flex-col gap-[2vw] mb-[3vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={question}
		placeholder="Add Question {index+1}"
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
