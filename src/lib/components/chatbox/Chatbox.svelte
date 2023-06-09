<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConversationView from './ConversationView.svelte';
	import { chatContext, currentChatboxView } from '$lib/global/chatbox';
	import RecapView from './RecapView.svelte';
	import AssistantView from './AssistantView.svelte';
</script>

<div
	transition:fly={{ y: 800, duration: 800 }}
	class={`w-full h-full z-30 font-line-seed relative flex flex-col items-center shadow-2xl rounded-t-3xl shadow-gray-700 border-[1px] border-black/10 border-b-0 px-2 ${
		$currentChatboxView === 'CONVERSATION' ? 'backdrop-blur-sm backdrop-brightness-75 bg-transparent' : 'backdrop-blur-none bg-white'
	}`}
>
	{#if $currentChatboxView === 'CONVERSATION'}
		{#if $chatContext}
			<ConversationView />
		{:else}
			<h3>No Data Available</h3>
		{/if}
	{:else if $currentChatboxView === 'RECAP'}
		<RecapView />
	{:else if $currentChatboxView === 'ASSISTANT'}
		<AssistantView />
	{/if}
</div>
