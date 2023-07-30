<script lang="ts">
	import type { Activity, ClozeCard } from '$gql/generated/graphql';
	import { fade, scale } from 'svelte/transition';
	import restartIcon from '$asset/icons/restart.png';

	export let data: Activity;
	export let onFinish: () => void;

	const cards = data.cards as ClozeCard[];

	let currentIndex = 0;
	// store user's answer(choice's index)
	let userAnswers: (number | undefined)[] = [];

	// keep track of current card
	$: currentCard = cards[currentIndex];

	// create an array of blank, then split each line by '\n' for text's line.
	$: textParts = currentCard.text.split('_').map((line) => line.split('\n'));

	// duplicate choices array, each element contain orinal index and status
	$: choices = currentCard.choices.map((choice, originalIndex) =>
		Object.create({ choice, originalIndex, selected: false })
	);

	/**
	 * find the first `undefined` element then append the selected choice to the answer array
	 * if the userAnswers array isn't initialize yet, init it by length of `choices`
	 * @param choiceIndex
	 */
	const selectChoice = function (choiceIndex: number) {
		if (userAnswers.length === 0) {
			userAnswers = Array(choices.length);
			userAnswers[0] = choiceIndex;
			choices[choiceIndex].selected = true;
		} else {
			const index = userAnswers.findIndex((val) => val === undefined);
			if (index > -1) {
				userAnswers[index] = choiceIndex;
				choices[choiceIndex].selected = true;
			}
		}

		userAnswers = userAnswers;
	};

	/**
	 * Deselect choice, remove target index from answer array
	 * @param targetIndex
	 */
	const deselectChoice = function (targetIndex: number) {
		const choiceIndex = userAnswers[targetIndex];
		if (choiceIndex === undefined) return;

		choices[choiceIndex].selected = false;
		userAnswers[targetIndex] = undefined;
		userAnswers = userAnswers;
	};

	/**
	 * Reset selected answer
	 */
	const resetAnswer = function () {
		userAnswers.forEach((choiceIndex) => {
			if (choiceIndex !== undefined) choices[choiceIndex].selected = false;
		});
		userAnswers = Array(choices.length);
	};

	const checkAnswer = function () {
		/**
		 * check result
		 * -1 not finished
		 *  0 not correct all
		 *  1 correct all
		 */
		let result = 1;

		for (let index = 0; index < userAnswers.length; index++) {
			const choiceIndex = userAnswers[index];

			// not fisnished yet
			if (choiceIndex === undefined) {
				result = -1;
				break;
			}

			if (choices[choiceIndex].originalIndex !== currentCard.answerIndexes[index]) {
				result = 0;
				break;
			}
		}

		console.log(result);
	};
</script>

<div transition:fade class="rounded-[8.21vw] bg-white">
	<!-- title -->
	<div
		class="flex min-h-[13vh] flex-col justify-center border-b border-[#EAEAEA] text-center text-[4.1vw] font-normal"
	>
		{currentCard.title}
	</div>

	<!-- text renderer -->
	<div
		class=" h-[28.79vh] w-full overflow-x-hidden overflow-y-scroll border-b border-[#EAEAEA] px-[8.21vw] py-[1.78vh]"
	>
		<div
			class="flex h-fit w-full flex-wrap items-center justify-start gap-y-[0.65vh] text-[4.1vw] font-bold"
		>
			{#each textParts as part, index}
				{#each part as line, lineIndex}
					{line}

					{#if lineIndex !== part.length - 1}
						<!-- 
							Return full-width container to new line
							Note: Using <br/>, will cause a new line in the same element without actaully wrap element to the new line
						-->
						<div class="w-full" />
					{/if}
				{/each}

				{#if index !== textParts.length - 1}
					{@const answerIndex = userAnswers[index]}
					{#if answerIndex !== undefined}
						<button
							transition:scale
							on:click={() => deselectChoice(index)}
							class="mx-[3vw] flex h-[8.46vw] cursor-pointer items-center rounded-[2.56vw] border border-[#D9D9D9] px-[5.9vw] py-[1.28vh] text-[4.1vw] font-bold"
						>
							{choices[answerIndex].choice}
						</button>
					{:else}
						<div
							in:scale={{ delay: 400 }}
							class="mx-[3vw] h-[8.46vw] w-[8.46vw] rounded-[2vw] bg-[#EAEAEA]"
						/>
					{/if}
				{/if}
			{/each}
		</div>
	</div>

	<!-- choice -->
	<div
		class="flex h-[14.81vh] w-full flex-wrap gap-x-[4.1vw] gap-y-[1.3vh] overflow-x-hidden overflow-y-scroll border-b border-[#EAEAEA] px-[5.38vw] py-[1.9vh]"
	>
		{#each choices as { choice, selected }, index}
			{#if !selected}
				<button
					transition:scale
					on:click={() => selectChoice(index)}
					class="flex h-[4.15vh] cursor-pointer items-center rounded-[2.56vw] border border-[#D9D9D9] px-[5.9vw] py-[1.28vh] text-[4.1vw] font-bold"
				>
					{choice}
				</button>
			{/if}
		{/each}
	</div>

	<!-- bottom button -->
	<div
		class="flex h-[8.77vh] flex-row items-center justify-between px-[5.38vw] pb-[2.13vh] pt-[1.3vh]"
	>
		<button class="h-fit rounded-full bg-[#EAEAEA] p-[2.56vw]" on:click={resetAnswer}>
			<img class="h-[6.41vw] w-[6.41vw]" src={restartIcon} alt="restart icon" />
		</button>
		<button
			class="rounded-[5.77vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[8.97vw] py-[1.18vh] text-[4.1vw] font-bold text-white"
			on:click={checkAnswer}>ตรวจ</button
		>
	</div>
</div>
