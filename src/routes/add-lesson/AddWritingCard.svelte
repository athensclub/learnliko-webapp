<script lang="ts">
	export let index: number;
	export let upload = () => {};

	let startSentence = '';
	let endSentence = '';
	let answer = '';
	let choices = ['', '', ''];
</script>

<div class="flex w-fit flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<div class="flex flex-row gap-[2vw]">
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw] w-[13vw]"
			bind:value={startSentence}
			placeholder="Start sentence"
		/>
		<input
			class="border border-[#00000033] px-[1vw] py-[0.3vw] w-[13vw]"
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
