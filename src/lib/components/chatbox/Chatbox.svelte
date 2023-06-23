<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConversationView from './ConversationView.svelte';
	import { chatContext, currentChatboxView } from '$lib/global/chatbox';
	import RecapView from './RecapView.svelte';
	import AssistantView from './AssistantView.svelte';
</script>

<div
	transition:fly={{ y: 800, duration: 800 }}
	class={`overflow-hidden w-full h-full font-line-seed relative flex flex-col items-center shadow-2xl shadow-gray-700 border-[1px] backdrop-blur-none bg-white rounded-t-3xl`}
>
	{#if $currentChatboxView === 'RECAP'}
		<RecapView />
	{:else if $currentChatboxView === 'ASSISTANT'}
		<AssistantView />
	{/if}
</div>
