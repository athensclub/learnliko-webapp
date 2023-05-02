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
	<div class={`flex flex-col w-full mt-3 ${chat.role === 'user' ? 'items-end' : 'items-start'}`}>
		<div class={`flex pt-4 flex-row items-center w-[85%] ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
			{#if chat.role === 'assistant'}
				<div
					class={`w-[48px] h-[48px] mr-2 bg-center bg-cover rounded-full border border-white`}
					style="background-image: url('{assistantProfileImage}');"
				/>
			{/if}
			<div class="w-[75%] mx-2 z-50">
				<AudioPlayer src={chat.audioURL} />
			</div>
			{#if chat.role === 'user'}
				<div
					class={`w-[48px] h-[48px] bg-center bg-cover ml-2 rounded-full border border-white`}
					style="background-image: url('{userProfileImage}');"
				/>
			{/if}
		</div>
		{#if chat.role === 'user' || (chat.role === 'assistant' && showAssistantTranscription)}
			<div class={`mt-1 flex flex-row w-[70%] ${chat.role === 'assistant' ? "pl-16 justify-start" : "pr-16 justify-end"}`}>
				{#if chat.transcription === null}
					Transcribing<Typewriter mode="loop">...</Typewriter>
				{:else}
					{chat.transcription}
				{/if}
			</div>
		{/if}
	</div>
{/each}
