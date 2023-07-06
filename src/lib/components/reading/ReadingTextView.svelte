<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ReadingViewType } from './ReadingContainer.svelte';
	import type { ReadingItem } from '$lib/types/reading';
	import { synthesize } from '$api/tts';
	import { blobToBase64 } from '$lib/utils/io';
	import { onMount } from 'svelte';
	import { playAudioURL } from '$lib/global/audio';
	import type { ReadingCard } from '$gql/generated/graphql';

	export let item: ReadingCard;

	export let scale = 1;

	let speech: string | null = null;
	// TODO: use data from api instead.
	const loadSpeech = async () => {
		const val = await synthesize(item.pages[0].text, 'US', 'FEMALE', 0.7);
		speech = await blobToBase64(val);
		console.log('finish tts');
	};
	onMount(() => loadSpeech());

	export let setView: (view: ReadingViewType) => void;
</script>

<!-- https://github.com/sveltejs/svelte/issues/544#issuecomment-586417387 -->
<div in:fade={{ delay: 500 }} out:fade class="flex h-full w-full flex-row gap-[2vw]">
	<!-- TODO: support multiple pages -->
	<img class="max-h-full max-w-[50%]" src={item.pages[0].illustrationUrl} alt={item.title} />

	<div class="relative flex h-full flex-1 flex-col overflow-y-auto font-bold">
		<div style="font-size: {scale*2}vw;">{item.title}</div>
		<!-- TODO: support multiple pages -->
		<div style="font-size: {scale*1.2}vw;" class="mt-[2vw]">{item.pages[0].text}</div>

		<button
			on:click={() => {
				speech && playAudioURL(speech);
			}}
			style="font-size: {scale*1.2}vw;"
			class="absolute right-0 top-0 flex flex-row items-center rounded-full border border-black px-[1vw] py-[0.5vw]"
		>
			<svg
				class="mr-[0.6vw] w-[1vw]"
				viewBox="0 0 9 9"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_1176_3032)">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M5.625 1.125C7.48912 1.125 9 2.63981 9 4.5C9 6.36412 7.48519 7.875 5.625 7.875V6.75C6.86531 6.75 7.875 5.74312 7.875 4.5C7.875 3.25969 6.86812 2.25 5.625 2.25V1.125ZM5.625 3.375C6.24656 3.375 6.75 3.8745 6.75 4.5C6.75 5.12156 6.2505 5.625 5.625 5.625V3.375ZM0 1.6875H1.125L4.5 0V9L1.125 7.3125H0V1.6875ZM1.125 2.8125V6.1875L3.375 7.3125V1.6875L1.125 2.8125Z"
						fill="black"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1176_3032">
						<rect width="9" height="9" fill="white" />
					</clipPath>
				</defs>
			</svg>
			อ่าน
		</button>

		<button
			on:click={() => setView('QUIZ')}
			style="font-size: {scale*1.2}vw;"
			class="ml-auto mt-auto flex flex-row items-center rounded-full border border-black px-[1vw] py-[0.5vw]"
		>
			? คำถาม
		</button>
	</div>
</div>
