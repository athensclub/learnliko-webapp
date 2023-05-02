<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConversationView from './ConversationView.svelte';
	import { chatContext, type ChatboxView } from '$lib/global/chatbox';
	import RecapView from './RecapView.svelte';

	let currentView: ChatboxView = 'CONVERSATION';

	const setView = (view: ChatboxView) => (currentView = view);
</script>

<div
	transition:fly={{ y: 800, duration: 500 }}
	class="w-full h-full bg-white z-[1000] font-line-seed relative flex flex-col items-center shadow-2xl shadow-gray-700 rounded-t-md border-[1px] border-black/10 border-b-0 px-4"
>
	{#if currentView === 'CONVERSATION'}
		{#if $chatContext}
			<ConversationView {setView} conversationDetails={$chatContext.details} />
		{:else}
			<h3>No Data Available</h3>
		{/if}
	{:else if currentView === 'RECAP'}
		<RecapView />
	{/if}
</div>
