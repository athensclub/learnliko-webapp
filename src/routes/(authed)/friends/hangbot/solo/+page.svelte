<!-- Modified from https://github.com/taw/svelte-hangbot/blob/master/src/App.svelte -->
<script lang="ts">
	import RobotGallows from './RobotGallows.svelte';
	import Keyboard from './Keyboard.svelte';
	import WordGuessed from './WordGuessed.svelte';
	import { dictionary } from './dictionary';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	let lettersChosen: string[] = [];
	let word = randomDictionaryWord();
	let stage = 0;
	let enabled = true;
	let gamestat = true;

	function restart() {
		lettersChosen = [];
		word = randomDictionaryWord();
		stage = 0;
		enabled = true;
	}

	function randomElement<T>(array: T[]) {
		return array[Math.floor(Math.random() * array.length)];
	}

	// Get another one if word contains numbers or special characters
	// like $
	function randomDictionaryWord() {
		while (true) {
			let word = randomElement(dictionary);
			if (!/[^A-Za-z]/.test(word)) {
				return word;
			}
		}
	}

	function badGuess(letter: string) {
		return !word.toUpperCase().includes(letter.toUpperCase());
	}

	function isGameWon() {
		let characters = word.toUpperCase().split('');
		return characters.every((c) => lettersChosen.includes(c));
	}

	function onLetter(letter: string) {
		lettersChosen = [...lettersChosen, letter];
		if (badGuess(letter)) {
			stage += 1;
		}
		// alert is blocking so we need to put it in setTimeout 0
		// so the page can update what's displayed
		if (isGameWon()) {
			enabled = false;
			gamestat = true;
		}
		if (stage == 10) {
			enabled = false;
			gamestat = false;
		}
		console.log('letter', stage, lettersChosen);
	}

	function handleKeydown(event: KeyboardEvent) {
		let key = event.key.toUpperCase();
		if (!/^[A-Z_]$/.test(key)) {
			return; // not A-Z or _
		}
		if (lettersChosen.includes(key)) {
			return; // already chosen this letter, so ignore it
		}
		onLetter(key);
	}
</script>

<div class=" rounded-b-[2vw] bg-gradient-to-br from-[#C698FF] to-[#6C80E8] pb-[2vw]">
	<h1 class=" pt-[1vw] text-center font-line-seed text-[3.5vw] text-white">Hangbot</h1>

	<RobotGallows {stage} />

	<WordGuessed {word} {lettersChosen} />
</div>

<svelte:window on:keydown={handleKeydown} />

{#if enabled}
	<Keyboard {lettersChosen} {onLetter} />
{:else}
	<div class=" mt-[3vw] text-center">
		{#if gamestat}
			<div class="font-line-seed text-[2vw] text-[#6C80E8]">
				<Typewriter>🎉GAME WON!</Typewriter>
			</div>
		{:else}
			<div class="font-line-seed text-[2vw]">
				<Typewriter>🥲GAME LOST! Word was "{word}"</Typewriter>
			</div>
		{/if}

		<button class="restart mt-[1.5vw] bg-gradient-to-br from-[#C698FF] to-[#6C80E8] text-center px-[1vw] rounded-md" on:click={restart}>🔄️ Play Again</button>
	</div>
{/if}

<style>
	h1 {
		font-size: 400%;
		font-family: Bradley Hand;
	}
	h2 {
		font-size: 150%;
	}
	footer {
		flex-grow: 1;
		height: 50px;
		padding: 10px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
	.restart {
		flex: 0;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
		margin: auto;
		padding: 5px;
	}
</style>
