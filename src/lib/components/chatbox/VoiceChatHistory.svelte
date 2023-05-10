<script lang="ts">
	import AudioPlayer from '../AudioPlayer.svelte';
	import Typewriter from 'svelte-typewriter';
	export let history: {
		role: 'user' | 'assistant';
		audioURL: string;
		transcription: string | null;
	}[];

	export let showAssistantTranscription = false;

	export let assistantProfileImage: string;
	export let userProfileImage: string;
</script>

{#each history as chat, index (index)}

	<div class={`flex flex-col px-4 w-full ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
		<div
			class={`flex pt-6 flex-row items-center lg:w-[85%] w-[100%] ${
				chat.role === 'user' ? 'justify-end' : 'justify-start'
			}`}
		>
			{#if chat.role === 'assistant'}
				<div
					class={`w-[42px] h-[42px]  bg-center bg-cover rounded-full border border-white`}
					style="background-image: url('{assistantProfileImage}');"
				/>
			{/if}
		
			{#if chat.role === 'user'}
				<div
					class={`w-[42px] h-[42px] bg-center bg-cover  rounded-full border border-white`}
					style="background-image: url('{userProfileImage}');"
				/>
			{/if}
		</div>
		<div class="w-[-75%] pt-3 ">
			<AudioPlayer src={chat.audioURL} />
		</div>
		{#if chat.role === 'user' || (chat.role === 'assistant' && showAssistantTranscription)}
			<div
				class={`mt-3 flex flex-row w-[100%] ${
					chat.role === 'assistant' ? ' justify-start' : 'justify-end'
				}`}
			>
				{#if chat.transcription === null}
					Transcribing<Typewriter mode="loop">...</Typewriter>
				{:else}
					{chat.transcription}
				{/if}
			</div>
		{/if}
	</div>
{/each}
