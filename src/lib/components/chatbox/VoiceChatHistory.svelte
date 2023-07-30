<script lang="ts">
	import { isConversationFriendSpeakSlower } from '$lib/global/conversation';
	import type { ConversationHistoryItem } from '$lib/types/conversationData';
	import AudioPlayer from '../AudioPlayer.svelte';
	import Typewriter from 'svelte-typewriter';
	import ChatHint from './ChatHint.svelte';
	import { isMobile } from '$lib/global/breakpoints';

	export let aiBackgroundColor = '#FFFFFF3D';
	export let userBackgroundColor = '#FFFFFF3D';

	export let allowFriendSpeakSlower = false;

	let clazz = '';
	export { clazz as class };

	export let history: ConversationHistoryItem[];

	export let showAssistantTranscription = false;

	export let assistantProfileImage: string;
	export let userProfileImage: string;
</script>

{#each history as item, index (index)}
	{#if item.chat}
		<div
			class={`flex w-full flex-col px-4 ${
				item.chat.role === 'user' ? 'items-end' : 'items-start'
			} ${clazz}`}
		>
			<div
				class={`flex w-full flex-row items-center pt-[2vh] ${
					item.chat.role === 'user' ? 'flex-row-reverse' : ''
				}`}
			>
				{#if item.chat.role === 'assistant'}
					<div
						class={`rounded-full border border-white bg-cover bg-top ${
							$isMobile ? 'h-[10vw] w-[10vw]' : 'h-[3.4vw] w-[3.4vw]'
						}`}
						style="background-color: #766A78; background-image: url('{assistantProfileImage}');"
					/>
				{/if}

				{#if item.chat.role === 'user'}
					<div
						class={`rounded-full border border-white bg-cover bg-center ${
							$isMobile ? 'h-[10vw] w-[10vw]' : 'h-[3.4vw] w-[3.4vw]'
						}`}
						style="background-image: url('{userProfileImage}');"
					/>
				{/if}

				<AudioPlayer
					pauseColor="#6C80E8"
					playColor="#6C80E8"
					playbackRate={allowFriendSpeakSlower && $isConversationFriendSpeakSlower ? 0.65 : 1}
					style="background-color: {item.chat.role === 'user'
						? userBackgroundColor
						: aiBackgroundColor};"
					class={`mx-[1vw] w-[70%]  rounded-full
					${$isMobile ? 'h-[10vw]' : 'h-[3vw]'} 
					${item.chat.role === 'user' ? 'shadow-lg backdrop-blur-lg' : ' shadow-lg backdrop-blur-lg'}`}
					defaultBlockColor="#A9A9A9"
					playedBlockColor="#6C80E8"
					src={item.chat.audioURL}
					type={item.chat.role === 'user' ? 'audio/ogg; codecs=opus' : 'audio/mpeg'}
				/>
			</div>
			{#if item.chat.role === 'user' || (item.chat.role === 'assistant' && showAssistantTranscription)}
				<div
					class={`mt-3 flex w-[100%] flex-row ${$isMobile ? 'text-[4.2vw]' : 'text-[1.3vw]'} ${
						item.chat.role === 'assistant' ? ' justify-start' : 'justify-end'
					}`}
				>
					{#if item.chat.transcription === null}
						Transcribing<Typewriter mode="loop">...</Typewriter>
					{:else}
						{item.chat.transcription}
					{/if}
				</div>
			{/if}
		</div>
	{:else if item.endOfGoal !== undefined}
		<div
			class="mt-[2vh] flex w-full flex-row items-center gap-[1vw] {$isMobile
				? 'px-[6vw] text-[4vw]'
				: 'px-[2vw] text-[1.5vw] '}"
		>
			<!-- Divider -->
			<div class="h-[0.15vh] flex-1 bg-black" />

			เสร็จสิ้นเป้าหมายที่ {item.endOfGoal}

			<!-- Divider -->
			<div class="h-[0.15vh] flex-1 bg-black" />
		</div>
	{:else if item.hint !== undefined}
		<ChatHint text={item.hint} />
	{/if}
{/each}
