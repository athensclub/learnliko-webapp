<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	export let progress: number;
	export let activityNames: string[];

	let expanded = false;
</script>

<div
	transition:fade
	class="absolute bottom-0 left-0 flex w-full flex-col items-center bg-black/10 p-[4vw] backdrop-blur-md"
>
	<button
		on:click={() => (expanded = true)}
		class="flex flex-col items-center text-[4.5vw] font-bold text-white"
	>
		<svg class="w-[4vw]" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8.70711 0.292893C8.31658 -0.097631 7.68342 -0.097631 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 2V1H7V2H9Z"
				fill="white"
			/>
		</svg>
		Progress
	</button>

	<div class="mt-[4vw] h-[3vw] w-full rounded-full bg-white">
		<div
			style="width: {progress * 100}%;"
			class="h-full rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] transition-size"
		/>
	</div>
</div>

{#if expanded}
	<div
		transition:fly={{ y: 800, duration: 800 }}
		class="absolute bottom-0 left-0 flex w-full flex-col items-center rounded-[5vw] rounded-b-none bg-white p-[4vw]"
	>
		<button
			on:click={() => (expanded = false)}
			class="absolute right-[3vw] top-[3vw] flex h-[7.5vw] w-[7.5vw] items-center justify-center rounded-full border border-[#BBBBBB]"
		>
			<svg class="w-[50%] m-auto" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
				<line x1="7.77055" y1="1.35355" x2="0.353357" y2="8.77074" stroke="#BBBBBB" />
				<line x1="0.353553" y1="1.22945" x2="7.77074" y2="8.64664" stroke="#BBBBBB" />
			</svg>
		</button>

		<div class="flex flex-row text-[4vw]">
			<div
				class="flex flex-col items-end gap-[15vw] font-bold {activityNames.length % 2 === 0
					? 'pb-[15vw]'
					: 'pb-0'}"
			>
				{#each activityNames.filter((_, index) => index % 2 === 0) as activity}
					<div>{activity}</div>
				{/each}
			</div>

			<div class="mx-[4vw] w-[3vw] rounded-full bg-black/[0.06]">
				<div
					style="height: {progress * 100}%;"
					class="w-full rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] transition-size"
				/>
			</div>

			<div class="flex flex-col items-end gap-[15vw] pt-[10vw] font-bold">
				{#each activityNames.filter((_, index) => index % 2 === 1) as activity}
					<div>{activity}</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
