<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConversationView from './ConversationView.svelte';
	import { chatContext, currentChatboxView } from '$lib/global/chatbox';
	import RecapView from './RecapView.svelte';
	import AssistantView from './AssistantView.svelte';
</script>

<div
	transition:fly={{ y: 800, duration: 800 }}
	class={`overflow-hidden w-full h-full font-line-seed relative flex flex-col items-center shadow-2xl shadow-gray-700 border-[1px] border-black/10 border-b-0 ${
		$currentChatboxView === 'CONVERSATION'
			? 'backdrop-blur-sm backdrop-brightness-75 bg-transparent rounded-3xl'
			: 'backdrop-blur-none bg-white rounded-t-3xl'
	}`}
>
	{#if $currentChatboxView === 'CONVERSATION'}
		{#if $chatContext}
			<ConversationView
				class="text-white"
				initializingClass="text-white"
				recorderClass="bg-black/[0.5] backdrop-blur-md w-[90%]"
				finishButtonClass="border-white/[0.15]"
			/>
		{:else}
			<h3>No Data Available</h3>
		{/if}
	{:else if $currentChatboxView === 'RECAP'}
		<RecapView />
	{:else if $currentChatboxView === 'ASSISTANT'}
		<AssistantView />
	{/if}
</div>
