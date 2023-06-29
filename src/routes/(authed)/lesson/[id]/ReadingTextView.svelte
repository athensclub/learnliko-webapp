<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ReadingViewType } from './ReadingView.svelte';

	export let title = 'My family';
	export let content =
		"Hi! I'm Andy. I'm 9 years old and this is my family. We live in a small house in the beautiful garden. My father's name is Aaron. He's a teacher. He's 42 years old. My mother's name is Clare. She's a teacher. She's 40. My parents work in a school in the center of town. I have got 2 brother. their names are Sam and Max. Sam is the middle child and max is our little brother. We haven't got a pet.";
	export let image =
		'https://cdn.discordapp.com/attachments/842737146321174558/1124045015631528038/image.png';
	export let setView: (view: ReadingViewType) => void;
</script>

<!-- https://github.com/sveltejs/svelte/issues/544#issuecomment-586417387 -->
<div in:fade={{ delay: 500 }} out:fade class="w-full h-full flex flex-row gap-[2vw]">
	<img class="max-w-[50%] max-h-full" src={image} alt={title} />

	<div class="flex-1 h-full overflow-y-auto flex flex-col font-bold relative">
		<div class="text-[2vw]">{title}</div>
		<div class="text-[1.2vw] mt-[2vw]">{content}</div>

		<button
			class="absolute top-0 right-0 px-[1vw] py-[0.5vw] border border-black flex flex-row items-center rounded-full text-[1.2vw]"
		>
			<svg
				class="w-[1vw] mr-[0.6vw]"
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
			class="absolute right-0 bottom-0 px-[1vw] py-[0.5vw] border border-black flex flex-row items-center rounded-full text-[1.2vw]"
		>
			? คำถาม
		</button>
	</div>
</div>
