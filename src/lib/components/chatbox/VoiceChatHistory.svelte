<script lang="ts">
	import type { ConversationHistoryItem } from '$lib/types/conversationData';
	import AudioPlayer from '../AudioPlayer.svelte';
	import Typewriter from 'svelte-typewriter';

	export let aiBackgroundColor = '#FFFFFF3D';
	export let userBackgroundColor = '#FFFFFF3D';

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
			class={`flex flex-col px-4 w-full ${
				item.chat.role === 'user' ? 'items-end' : 'items-start'
			} ${clazz}`}
		>
			<div
				class={`flex pt-[2vh] flex-row items-center  w-full ${
					item.chat.role === 'user' ? 'flex-row-reverse' : ''
				}`}
			>
				{#if item.chat.role === 'assistant'}
					<div
						class={`w-[42px] h-[42px]  bg-top bg-cover rounded-full border border-white`}
						style="background-image: url('{assistantProfileImage}');"
					/>
				{/if}

				{#if item.chat.role === 'user'}
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover  rounded-full border border-white`}
						style="background-image: url('{userProfileImage}');"
					/>
				{/if}

				<AudioPlayer
					style="background-color: {item.chat.role === 'user'
						? userBackgroundColor
						: aiBackgroundColor};"
					class={`mx-3 w-[70%] h-[44px] rounded-full ${
						item.chat.role === 'user' ? 'backdrop-blur-lg shadow-lg' : ' backdrop-blur-lg shadow-lg'
					}`}
					defaultBlockColor={item.chat.role === 'user' ? 'white' : 'black'}
					playedBlockColor={item.chat.role === 'user' ? 'black' : 'white'}
					src={item.chat.audioURL}
					type={item.chat.role === 'user' ? 'audio/ogg; codecs=opus' : 'audio/mpeg'}
				/>
			</div>
			{#if item.chat.role === 'user' || (item.chat.role === 'assistant' && showAssistantTranscription)}
				<div
					class={`mt-3 flex flex-row w-[100%] ${
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
		<div class="text-[1.5vw] flex flex-row items-center w-full px-[2vw] gap-[1vw] mt-[2vh]">
			<!-- Divider -->
			<div class="flex-1 h-[0.15vh] bg-white" />

			เสร็จสิ้นเป้าหมายที่ {item.endOfGoal}

			<!-- Divider -->
			<div class="flex-1 h-[0.15vh] bg-white" />
		</div>
	{/if}
{/each}
