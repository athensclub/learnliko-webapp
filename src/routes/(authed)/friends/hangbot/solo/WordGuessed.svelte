<!-- Modified from https://github.com/taw/svelte-hangbot/blob/master/src/WordGuessed.svelte -->
<script lang="ts">
	export let word: string;
	export let lettersChosen: string[];
</script>

<div class="word">
	{#each word as char}
		{#if lettersChosen.includes(char.toUpperCase())}
			<div class="letter guessed bg-white text-[#6C80E8]">{char}</div>
		{:else}
			<div class="letter todo animate-pulse">?</div>
		{/if}
	{/each}
</div>

<style>
	.word {

		font-size: 30px;
		display: flex;
		justify-content: center;
		text-align: center;
		flex-wrap: wrap;
		line-height: 30px;
		margin: auto;
		max-width: 80vw;
	}
	.letter {
		margin: 10px;
		height: 50px;
		width: 50px;
		color: white;
		border: 1px solid white;
		text-align: center;
		line-height: 50px;
	}
</style>
