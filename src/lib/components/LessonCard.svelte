<script lang="ts">
	import { synthesize, type SynthesizeAccent, type SynthesizeGender } from '$api/tts';
	import type { Lesson } from '$gql/generated/graphql';
	import { playAudioURL } from '$lib/global/audio';
	import { isMobile } from '$lib/global/breakpoints';
	import { blobToBase64 } from '$lib/utils/io';
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	export let item: Lesson;
	export let scale = 1;
	export let progress = 0;

	let speech: string | null = null;
	// TODO: use data from api instead.
	const loadSpeech = async () => {
		const val = await synthesize(
			item.intro.message,
			item.intro.accent as SynthesizeAccent,
			item.intro.gender as SynthesizeGender,
			0.7
		);
		speech = await blobToBase64(val);
	};
	onMount(() => loadSpeech());

	let clazz = '';
	export { clazz as class };
</script>

<!-- Specify the size(width, height) of the card in the user of the component, not in the component itself. -->
<div
	style="background-image: url('{item.backgroundUrl}');"
	class={`relative flex flex-col justify-between  overflow-hidden bg-cover bg-center shadow-sm  ${
		$isMobile ? 'rounded-[8vw]' : 'rounded-[2vw] '
	} ${clazz}`}
>
	<a
		href="/play/{item.id}"
		style="padding: {scale * ($isMobile ? 6 : 2)}vw;"
		class="relative flex w-full flex-col bg-[#0000008C] font-bold text-white backdrop-blur-sm"
	>
		<svg
			class="absolute w-[7%] {$isMobile ? 'right-[6vw] top-[6vw]' : 'right-[2vw] top-[2vw]'}"
			viewBox="0 0 39 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Frame" clip-path="url(#clip0_1176_2309)">
				<path
					id="Vector"
					d="M1.95 14C0.873044 14 9.41505e-08 14.8955 0 16C-9.41505e-08 17.1046 0.873044 18 1.95 18V14ZM38.4288 17.4142C39.1903 16.6332 39.1903 15.3669 38.4288 14.5858L26.019 1.85788C25.2576 1.07683 24.023 1.07683 23.2614 1.85788C22.4999 2.63893 22.4999 3.90525 23.2614 4.68631L34.2923 16L23.2614 27.3138C22.4999 28.0948 22.4999 29.361 23.2614 30.1422C24.023 30.9232 25.2576 30.9232 26.019 30.1422L38.4288 17.4142ZM1.95 18H37.05V14H1.95V18Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1176_2309">
					<rect width="39" height="32" fill="white" />
				</clipPath>
			</defs>
		</svg>

	<div
		style="font-size: {scale * ($isMobile ? 3.2 : 1)}vw;"
		class="mb-[2vh] flex flex-row {$isMobile ? 'gap-[3vw]' : 'gap-[1vw]'}"
	>
		<div
			style="padding-left: {scale * ($isMobile ? 5 : 2)}vw; 
				padding-right: {scale * ($isMobile ? 5 : 2)}vw;
				 padding-top: {scale * ($isMobile ? 0.5 : 1)}vh;
				  padding-bottom: {scale * ($isMobile ? 0.5 : 1)}vh;"
			class="flex items-center justify-center rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
		>
			{item.course.displayName}
		</div>

		<div
			style="padding-left: {scale * ($isMobile ? 3 : 1)}vw; 
				padding-right: {scale * ($isMobile ? 3 : 1)}vw;
				 padding-top: {scale * ($isMobile ? 0.5 : 1)}vh;
				  padding-bottom: {scale * ($isMobile ? 0.5 : 1)}vh;"
			class="rounded-full bg-white"
		>
			<div
				class="flex flex-row bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] bg-clip-text text-transparent"
			>
				{item.course.subject.displayName}
			</div>
		</div>
	</div>

		<div style="font-size: {scale * ($isMobile ? 4.2 : 1.5)}vw;" class="max-w-[90%]">
			{item.title}
		</div>
		<div style="font-size: {scale * ($isMobile ? 3 : 1.05)}vw;" class="mt-[0.5vh] max-w-[90%]">
			{item.description}
		</div>



		<div
			style="height: {scale * ($isMobile ? 3.6 : 1.35)}vw;"
			class="mt-[2vh] w-full overflow-hidden rounded-full bg-[#FFFFFF29]"
		>
			<div
				style="width: {progress}%;"
				class="h-full rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
			/>
		</div>
	</a>

	<div class="flex h-[50%] flex-row items-center">
		<div class="ml-[5%] flex h-full animate-slideInLeft flex-col justify-end">
			<img class="max-h-full max-w-[33vw] object-contain" src={item.intro.bot} alt="Avatar" />
		</div>

		<div
			style="font-size: {scale * ($isMobile ? 3 : 1)}vw; padding: {scale *
				($isMobile ? 1.5 : 1)}vw;"
			class="relative bottom-[30%] right-[3%] h-fit animate-wiggle py-[3vw] px-[2.5vw] rounded-bl-none bg-white font-bold {$isMobile
				? 'rounded-[6vw]'
				: 'rounded-[2vw]'}"
		>
			<button
				on:click={() => {
					speech && playAudioURL(speech);
				}}
				class="animate-pulse"
			>
				{item.intro.message}🔉
			</button>
		</div>
	</div>
</div>
