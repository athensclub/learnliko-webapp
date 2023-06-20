<script lang="ts">
	import AudioPlayer from '../AudioPlayer.svelte';
	import Typewriter from 'svelte-typewriter';

	export let aiBackgroundColor = '#FFFFFF3D';
	export let userBackgroundColor = '#FFFFFF3D';

	let clazz = '';
	export { clazz as class };

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
	<div
		class={`flex flex-col px-4 w-full ${
			chat.role === 'user' ? 'items-end' : 'items-start'
		} ${clazz}`}
	>
		<div
			class={`flex pt-6 flex-row items-center  w-full ${
				chat.role === 'user' ? 'flex-row-reverse' : ''
			}`}
		>
			{#if chat.role === 'assistant'}
				<div
					class={`w-[42px] h-[42px]  bg-top bg-cover rounded-full border border-white`}
					style="background-image: url('{assistantProfileImage}');"
				/>
			{/if}

			{#if chat.role === 'user'}
				<div
					class={`w-[42px] h-[42px] bg-center bg-cover  rounded-full border border-white`}
					style="background-image: url('{userProfileImage}');"
				/>
			{/if}

			<AudioPlayer
				style="background-color: {chat.role === 'user' ? userBackgroundColor : aiBackgroundColor};"
				class={`mx-3 w-[70%] h-[44px] rounded-full ${
					chat.role === 'user' ? 'backdrop-blur-lg shadow-lg' : ' backdrop-blur-lg shadow-lg'
				}`}
				defaultBlockColor={chat.role === 'user' ? 'white' : 'black'}
				playedBlockColor={chat.role === 'user' ? 'black' : 'white'}
				src={chat.audioURL}
				type={chat.role === 'user' ? 'audio/ogg; codecs=opus' : 'audio/mpeg'}
			/>
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
