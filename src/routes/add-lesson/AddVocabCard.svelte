<script lang="ts">
	export let index: number;
	export let upload = () => {};

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
