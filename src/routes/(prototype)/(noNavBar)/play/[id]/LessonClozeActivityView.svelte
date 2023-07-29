<script lang="ts">
	import type { Activity, ClozeCard } from '$gql/generated/graphql';

	export let data: Activity;
	export let onFinish: () => void;

	const cards = data.cards as ClozeCard[];

	let currentIndex = 0;

	// keep track of current card
	$: currentCard = cards[currentIndex];

	// create an array of text's line, then split each line by '_'.
	$: textLines = currentCard.text.split('\n').map((line) => line.split('_'));
</script>

<div class="rounded-[8.21vw] bg-white">
	<!-- title -->
	<div
		class="flex min-h-[13vh] flex-col justify-center border-b border-[#EAEAEA] text-center text-[4.1vw] font-normal"
	>
		{data.title}
	</div>

	<div class=" h-[28.79vh] w-full px-[8.21vw] py-[1.78vh]">
		<div class="flex h-fit w-full flex-wrap justify-start text-[4.1vw] font-bold">
			{#each textLines as line}
				<div class="mb-[1.3vh]">
					<div class=" flex items-center">
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
</div>
