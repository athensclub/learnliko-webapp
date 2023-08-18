<script lang="ts">
	import type { Course } from '$gql/generated/graphql';
	import CircularProgressBar from '$lib/components/CircularProgressBar.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { round } from '$lib/utils/math';
	import { getContext, onMount } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	export let exp: number = 200;
	export let coin: number = 800;
	export let progress: number = 50;
	export let course: Course;

	/**
	 * Called when the height of shown component of this activity changes.
	 */
	export let updateHeight: (pixels: number) => {};
	let height = 0;
	$: updateHeight(height);


	let displayExp = tweened(0);
	let displayCoin = tweened(0);

	// TODO: use actual data
	onMount(() => {
		$displayExp = exp;
		$displayCoin = coin;

	});
</script>

<div
	transition:fade
	class="pointer-events-none absolute flex h-full w-full items-center justify-center overflow-hidden"
>
	<div
		class="pointer-events-auto flex flex-row justify-center overflow-hidden bg-white p-[8vw] {$isMobile
			? 'rounded-[5vw]'
			: 'h-[30vw] w-[60vw] rounded-[2vw]'}"
		bind:clientHeight={height}
	>
		<div class="flex h-full flex-col items-center justify-center font-bold">
			<div class={$isMobile ? 'text-[7vw]' : 'text-[2.5vw]'}>Congratulation 🎉</div>

			<div class="mt-[3vw] flex items-center {$isMobile ? 'flex-col' : 'flex-row'}">
				<CircularProgressBar
					class={$isMobile ? 'h-[42vw] w-[42vw]' : 'h-[12vw] w-[12vw]'}
					value={progress}
				>
					<div class="flex h-full flex-col items-center justify-center">
						<div class="text-[2.5vw]">
							{course.subject.indicatorLabel}
						</div>
						<div class="text-[4.6vw]">{course.displayName}</div>
					</div>
				</CircularProgressBar>

				
				<div
					class="flex flex-row items-center gap-[3vw] {$isMobile
						? 'mt-[3vw] text-[6vw]'
						: 'ml-[4vw] text-[3vw]'}"
				>
					<div class="mt-[1vw] flex flex-row items-center">
						<div class="bg-gradient-to-r from-[#C698FF] to-[#6C80E8] bg-clip-text text-transparent">
							
						</div>
						
					</div>

					<div class="mt-[1vw] flex flex-row items-center">
						<div
							class="bg-gradient-to-t from-[#FFE08F] via-[#E4AE24] to-[#FFE08F] bg-clip-text text-transparent"
						>
	
						</div>

						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
