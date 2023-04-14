<script lang="ts">
	import { audioRecording, toggleRecording } from '$lib/global/audio/recording';
	import { showChatbox } from '$lib/global/chatbox';
	import { fly } from 'svelte/transition';
	import { Player, DefaultUi, Audio } from '@vime/svelte';

	const hide = () => ($showChatbox = false);

	let history: { role: 'user' | 'assistant'; audioURL: string }[] = [];

	$: if ($audioRecording !== null) {
		history = [
			...history,
			{
				role: 'user',
				audioURL: $audioRecording
			}
		];
	}
</script>

<div
	transition:fly={{ y: 800, duration: 500 }}
	class="w-full h-full bg-white z-[1000] font-line-seed relative flex flex-col items-center"
>
	<div
		class="flex items-center justify-center w-full h-[48px] font-bold text-lg border-b border-black/[0.15] relative"
	>
		Voice Chat

		<button
			on:click={hide}
			class="absolute right-4 rounded-full border border-black/[0.15] h-[28px] aspect-square"
			>x</button
		>
	</div>

	<!-- <div class="w-full h-[calc(100%-48px)] overflow-y-auto"> -->
	{#each history as chat, index (index)}
		<div class="w-[80%]">
			<Player>
				<Audio>
					<source data-src={chat.audioURL} type="audio/ogg;" />
				</Audio>

				<DefaultUi noSettings />
			</Player>
		</div>
	{/each}
	<!-- </div> -->

	<button
		on:click={toggleRecording}
		class="absolute mx-auto bottom-4 w-[44px] h-[44px] shadow-all rounded-xl flex items-center justify-center"
	>
		<svg class="w-[35%]" viewBox="0 0 41 56" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M20.5 35.25C18.1042 35.25 16.0677 34.4115 14.3906 32.7344C12.7135 31.0573 11.875 29.0208 11.875 26.625V9.375C11.875 6.97917 12.7135 4.94271 14.3906 3.26562C16.0677 1.58854 18.1042 0.75 20.5 0.75C22.8958 0.75 24.9323 1.58854 26.6094 3.26562C28.2865 4.94271 29.125 6.97917 29.125 9.375V26.625C29.125 29.0208 28.2865 31.0573 26.6094 32.7344C24.9323 34.4115 22.8958 35.25 20.5 35.25ZM17.625 55.375V46.5344C12.6417 45.8635 8.52083 43.6354 5.2625 39.85C2.00417 36.0646 0.375 31.6562 0.375 26.625H6.125C6.125 30.6021 7.52704 33.9917 10.3311 36.7939C13.1333 39.598 16.5229 41 20.5 41C24.4771 41 27.8677 39.598 30.6718 36.7939C33.4739 33.9917 34.875 30.6021 34.875 26.625H40.625C40.625 31.6562 38.9958 36.0646 35.7375 39.85C32.4792 43.6354 28.3583 45.8635 23.375 46.5344V55.375H17.625Z"
				fill="black"
			/>
		</svg>
	</button>
</div>
