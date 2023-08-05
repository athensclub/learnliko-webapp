<script lang="ts">
	import Select from 'svelte-select/Select.svelte';
	import { profileCurrentView, selectedProfileProgress } from './+page.svelte';
	import CircularProgressBar from '$lib/components/CircularProgressBar.svelte';
	import { isMobile } from '$lib/global/breakpoints';

	let selectedCourse = $selectedProfileProgress?.courseProgress[0];
</script>

<div class="relative flex flex-col items-center p-[6vw]">
	<button on:click={() => ($profileCurrentView = 'HOME')} class="absolute left-[6vw] top-[6vw]">
		<svg class="w-[5vw]" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M22.5458 10.1252C23.1483 10.1252 23.6367 9.62151 23.6367 9.00021C23.6367 8.37891 23.1483 7.87521 22.5458 7.87521L22.5458 10.1252ZM0.683482 8.20469C0.25752 8.64404 0.25752 9.35639 0.683482 9.79574L7.62603 16.9552C8.05206 17.3945 8.74276 17.3945 9.16879 16.9552C9.59483 16.5158 9.59483 15.8035 9.16879 15.3642L2.99766 9.00021L9.16879 2.63624C9.59483 2.19689 9.59483 1.48461 9.16879 1.04526C8.74275 0.605913 8.05206 0.605913 7.62603 1.04526L0.683482 8.20469ZM22.5458 7.87521L1.4549 7.87521L1.4549 10.1252L22.5458 10.1252L22.5458 7.87521Z"
				fill="black"
				fill-opacity="0.8"
			/>
		</svg>
	</button>

	{#if $selectedProfileProgress}
		<div class="mt-[10vw] text-[5.5vw] font-bold">
			{$selectedProfileProgress.subject.displayName}
		</div>

		<Select
			class="mt-[6vw] w-[40vw]"
			value={$selectedProfileProgress?.courseProgress[0].course.displayName}
			on:change={(e) => (selectedCourse = $selectedProfileProgress.courseProgress[e.detail.index])}
			items={$selectedProfileProgress?.courseProgress.map((c) => c.course.displayName)}
		/>

		{#key selectedCourse}
			<CircularProgressBar
				max={1}
				class="mt-[10vw] {$isMobile ? 'h-[55vw] w-[55vw]' : 'h-[12vw] w-[12vw]'}"
				value={selectedCourse?.progress}
			>
				<div class="flex h-full flex-col items-center justify-center font-bold">
					<div class={$isMobile ? 'text-[3.5vw]' : 'text-[0.3vw]'}>
						{$selectedProfileProgress.subject.indicatorLabel}
					</div>
					<div class={$isMobile ? 'text-[9vw]' : 'text-[2vw]'}>
						{selectedCourse?.course.displayName}
					</div>
				</div>
			</CircularProgressBar>
		{/key}
	{/if}
</div>
