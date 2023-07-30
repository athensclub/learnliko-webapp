<script lang="ts">
	import type { Activity, ClozeCard } from '$gql/generated/graphql';
	import { fade } from 'svelte/transition';
	import restartIcon from '$asset/icons/restart.png';

	export let data: Activity;
	export let onFinish: () => void;

	const cards = data.cards as ClozeCard[];

	let currentIndex = 0;

	// keep track of current card
	$: currentCard = cards[currentIndex];

	// create an array of text's line, then split each line by '_'.
	$: textLines = currentCard.text.split('\n').map((line) => line.split('_'));
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
		<div class="flex h-fit w-full flex-wrap justify-start text-[4.1vw] font-bold">
			{#each textLines as line}
				<div class="mb-[1.3vh]">
					<div class="flex items-center">
						{#each line as part, index}
							{part}

							{#if index !== line.length - 1}
								<div class="mx-[3vw] h-[8.46vw] w-[8.46vw] rounded-[2vw] bg-[#EAEAEA]" />
							{/if}
						{/each}
					</div>

					<!-- 
                        Return full-width container to new line
                        Note: Using <br/>, will cause a new line in the same element without actaully wrap element to the new line
                    -->
					<div class="w-full" />
				</div>
			{/each}
		</div>
	</div>

	<!-- choice -->
	<div
		class="flex h-[14.81vh] w-full flex-wrap overflow-x-hidden overflow-y-scroll border-b border-[#EAEAEA] px-[5.38vw] py-[1.9vh]"
	>
		{#each currentCard.choices as choice}
			<div
				class="mb-[1.3vh] mr-[4.1vw] flex h-[4.15vh] items-center rounded-[2.56vw] border border-[#D9D9D9] px-[5.9vw] py-[1.28vh] text-[4.1vw] font-bold"
			>
				{choice}
			</div>
		{/each}
	</div>

	<div
		class="flex h-[8.77vh] flex-row items-center justify-between px-[5.38vw] pb-[2.13vh] pt-[1.3vh]"
	>
		<button class="h-fit rounded-full bg-[#EAEAEA] p-[2.56vw]" on:click={() => {}}>
			<img class="h-[6.41vw] w-[6.41vw]" src={restartIcon} alt="restart icon" />
		</button>
		<button
			class="rounded-[5.77vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[8.97vw] py-[1.18vh] text-[4.1vw] font-bold text-white"
			on:click={() => {}}>ตรวจ</button
		>
	</div>
</div>
