<script lang="ts">
	import {
		conversationFinished,
		transcribing,
		waitingForAIResponse,
		initializedConversation,
		currentRecording,
		submitUserReply,
		isConversationFriendSpeakSlower
	} from '$lib/global/conversation';
	import {
		toggleRecording,
		isRecording,
		startRecording,
		stopRecording
	} from '$lib/global/recording';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import AudioPlayer from '../AudioPlayer.svelte';
	import { chatContext } from '$lib/global/chatbox';
	import Checkbox from '../Checkbox.svelte';
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import DialogueHintModal from '../modals/DialogueHintModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';

	let clazz = '';
	export { clazz as class };

	export let allowHint: boolean;
	/**
	 * Get called when a user finished recording audio, and confirm it by clicking submit icon.
	 * Default behavior is to call submitUserReply global function of conversation.ts.
	 * @param recording the recording audio that the user confirm.
	 */
	export let submitRecording = (recording: { data: Blob; url: string }) =>{
		console.log("recorder")
		submitUserReply(recording);
	}

	const { open }: Context = getContext('simple-modal');
	const showHintModal = () => open(DialogueHintModal, {});
</script>

<div
	style="box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.25);"
	class={`flex items-center justify-center font-line-seed 
	${$isMobile ? 'rounded-[3vw] p-[2vw]' : 'rounded-[1vw] p-[0.8vw] '} ${clazz}`}
>
	{#if $waitingForAIResponse || $transcribing}
		<div
			class="flex h-full w-full flex-row items-center justify-between gap-[7%] px-[5%] text-black"
		>
			<div class="flex flex-row font-bold {$isMobile ? 'text-[4vw]' : 'text-[1.3vw] '}">
				{$chatContext?.conversation.avatar.name} กำลังคิด<Typewriter mode="loop">...</Typewriter>
			</div>
		</div>
	{:else if $currentRecording}
		<div class="item flex h-full w-full flex-row items-center justify-between px-[2%] text-white">
			<div class="flex-1 flex-row items-center justify-center">
				<AudioPlayer
					class={`rounded-full bg-[#EFEFEF] ${$isMobile ? 'h-[5.6vh]' : 'h-[7vh] '}`}
					pauseColor="#6C80E8"
					playColor="#6C80E8"
					defaultBlockColor="#A9A9A9"
					playedBlockColor="#6C80E8"
					src={$currentRecording.url}
					type="audio/webm"
				/>
			</div>

			<div
				class="flex flex-row items-center justify-between pl-[2vw] {$isMobile
					? 'w-[16vw] gap-[1.5vw]'
					: 'w-[9vw]'}"
			>
				<button
					on:click={() => ($currentRecording = null)}
					class="rounded-full {$isMobile ? 'min-w-[7vw] max-w-[7vw]' : 'min-w-[3vw] max-w-[3vw]'}"
				>
					<svg class="w-full" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M26.0197 20.8002C26.1642 20.5073 26.5226 20.3852 26.8171 20.526L27.9887 21.0864C27.9887 21.0864 24.6488 29.0278 15.2973 29.3989C6.39104 29.1762 0.954215 22.1809 0.898848 15.0747C0.843481 7.96835 6.39104 0.89887 15.0746 0.824651C23.6098 0.676213 26.8836 7.50493 26.8836 7.50493C27.043 7.79142 27.1723 7.75698 27.1723 7.43057V3.71874C27.1724 3.56134 27.235 3.41043 27.3463 3.29918C27.4577 3.18793 27.6086 3.12543 27.766 3.12543H28.7309C29.0588 3.12543 29.3246 3.39262 29.3246 3.72037V10.9914C29.3248 11.0695 29.3096 11.1468 29.2799 11.219C29.2501 11.2912 29.2065 11.3568 29.1513 11.412C29.0962 11.4673 29.0307 11.5111 28.9586 11.5411C28.8865 11.571 28.8092 11.5864 28.7312 11.5864H21.2343C21.1565 11.5864 21.0793 11.5711 21.0073 11.5414C20.9354 11.5116 20.8699 11.468 20.8148 11.4129C20.7597 11.3579 20.716 11.2925 20.6862 11.2206C20.6563 11.1487 20.6409 11.0715 20.6409 10.9937V10.101C20.6409 9.77365 20.9064 9.50424 21.2357 9.49934L25.0186 9.44293C25.3471 9.43803 25.497 9.19371 25.3425 8.9044C25.3425 8.9044 22.6448 2.68012 15.1487 2.75434C7.87526 2.82856 2.86535 8.97817 2.90261 15.1106C3.34792 23.3129 9.58229 27.3207 15.2971 27.1723C23.387 27.1723 26.0195 20.8002 26.0195 20.8002H26.0197Z"
							fill="#6C80E8"
						/>
						<path
							d="M14 17.2105C13.4048 17.2105 12.8988 17.011 12.4821 16.6118C12.0655 16.2127 11.8571 15.7281 11.8571 15.1579V11.0526C11.8571 10.4825 12.0655 9.99781 12.4821 9.59868C12.8988 9.19956 13.4048 9 14 9C14.5952 9 15.1012 9.19956 15.5179 9.59868C15.9345 9.99781 16.1429 10.4825 16.1429 11.0526V15.1579C16.1429 15.7281 15.9345 16.2127 15.5179 16.6118C15.1012 17.011 14.5952 17.2105 14 17.2105ZM13.2857 22V19.8961C12.0476 19.7364 11.0238 19.2061 10.2143 18.3053C9.40476 17.4044 9 16.3553 9 15.1579H10.4286C10.4286 16.1044 10.7769 16.9111 11.4736 17.5779C12.1698 18.2453 13.0119 18.5789 14 18.5789C14.9881 18.5789 15.8305 18.2453 16.5271 17.5779C17.2233 16.9111 17.5714 16.1044 17.5714 15.1579H19C19 16.3553 18.5952 17.4044 17.7857 18.3053C16.9762 19.2061 15.9524 19.7364 14.7143 19.8961V22H13.2857Z"
							fill="#6C80E8"
						/>
					</svg>
				</button>

				<!-- $currentRecording should always exist in this block :( -->
				<button
					on:click={() => {
						submitRecording($currentRecording);
						$currentRecording = null;
					}}
					class="flex aspect-square flex-1 items-center justify-center rounded-full bg-white {$isMobile
						? 'min-w-[7vw] max-w-[7vw]'
						: 'min-w-[3vw] max-w-[3vw]'}"
				>
					<svg class="w-[50%]" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M47.468 1.38637L15.9101 11.8742C-5.30336 18.9709 -5.30336 30.5425 15.9101 37.6043L25.2761 40.7157L28.3864 50.0848C35.4459 71.3051 47.0486 71.3051 54.1081 50.0848L64.6275 18.5514C69.3105 4.39287 61.6219 -3.33314 47.468 1.38637ZM48.5863 20.1945L35.3061 33.549C34.7819 34.0734 34.1179 34.3181 33.4538 34.3181C32.7898 34.3181 32.1258 34.0734 31.6016 33.549C30.5881 32.5352 30.5881 30.8572 31.6016 29.8433L44.8818 16.4888C45.8953 15.475 47.5728 15.475 48.5863 16.4888C49.5998 17.5026 49.5998 19.1807 48.5863 20.1945Z"
							fill="#6C80E8"
						/>
					</svg>
				</button>
			</div>
		</div>
	{:else if $isRecording}
		<div class="flex h-full w-full flex-row items-center justify-between px-[5%] text-black">
			<div
				class="flex h-full flex-row items-center justify-center font-bold {$isMobile
					? 'text-[5.5vw]'
					: 'text-[1.5vw]'}"
			>
				<div
					class="mr-[2vw] aspect-square w-[4vw] animate-pulse rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
				/>
				Recording..
			</div>

			<button
				on:click={stopRecording}
				class="bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] font-bold text-white {$isMobile
					? 'rounded-[4vw] px-[5vw] py-[1vw] text-[4vw]'
					: 'rounded-[1.6vw] px-[1.5vw] py-[0.35vw] text-[1.3vw] '}"
			>
				Done
			</button>
		</div>
	{:else}
		<div class="flex w-full flex-row items-center justify-between">
			<div class="flex flex-row gap-[2vw]">
				<div
					class="flex w-full flex-row items-center justify-center rounded-full bg-[#EFEFEF] px-[4vw] py-[1.5vw] font-bold {$isMobile
						? 'gap-[2vw] text-[4vw]'
						: 'gap-[1vw] text-[1.3vw]'}"
				>
					<Checkbox
						class={$isMobile ? 'w-[6vw] rounded-full' : 'w-[2vw] rounded-[0.5vw]'}
						bind:checked={$isConversationFriendSpeakSlower}
					/>
					พูดช้าลง
				</div>
				{#if allowHint}
					<button
						disabled={$waitingForAIResponse ||
							$transcribing ||
							$conversationFinished ||
							!$initializedConversation}
						on:click={showHintModal}
						class="flex h-fit items-center justify-center whitespace-nowrap rounded-full bg-[#EFEFEF] font-bold text-black {$isMobile
							? 'px-[4vw] py-[1.5vw] text-[4vw]'
							: 'px-[1.5vw] py-[0.5vw] text-[1.3vw]'}"
					>
						? คำใบ้
					</button>
				{/if}
			</div>

			<button
				disabled={$waitingForAIResponse ||
					$transcribing ||
					$conversationFinished ||
					!$initializedConversation}
				on:click={startRecording}
				class="flex h-fit w-fit items-center justify-center rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[8vw] py-[2vw] {$isMobile
					? 'py-[1.5vw] text-[4vw]'
					: 'py-[0.5vw] text-[1.3vw]'}"
			>
				<svg
					class={$isMobile ? 'w-[4vw]' : 'mr-[0.5vw] w-[1.2vw]'}
					viewBox="0 0 41 56"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M20.5 35.25C18.1042 35.25 16.0677 34.4115 14.3906 32.7344C12.7135 31.0573 11.875 29.0208 11.875 26.625V9.375C11.875 6.97917 12.7135 4.94271 14.3906 3.26562C16.0677 1.58854 18.1042 0.75 20.5 0.75C22.8958 0.75 24.9323 1.58854 26.6094 3.26562C28.2865 4.94271 29.125 6.97917 29.125 9.375V26.625C29.125 29.0208 28.2865 31.0573 26.6094 32.7344C24.9323 34.4115 22.8958 35.25 20.5 35.25ZM17.625 55.375V46.5344C12.6417 45.8635 8.52083 43.6354 5.2625 39.85C2.00417 36.0646 0.375 31.6562 0.375 26.625H6.125C6.125 30.6021 7.52704 33.9917 10.3311 36.7939C13.1333 39.598 16.5229 41 20.5 41C24.4771 41 27.8677 39.598 30.6718 36.7939C33.4739 33.9917 34.875 30.6021 34.875 26.625H40.625C40.625 31.6562 38.9958 36.0646 35.7375 39.85C32.4792 43.6354 28.3583 45.8635 23.375 46.5344V55.375H17.625Z"
						fill="white"
					/>
				</svg>
			</button>
		</div>
	{/if}
</div>
