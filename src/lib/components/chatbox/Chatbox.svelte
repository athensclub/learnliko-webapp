<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConversationView from './ConversationView.svelte';
	import type { ChatboxView } from '$lib/global/chatbox';
	import RecapView from './RecapView.svelte';

	let currentView: ChatboxView = 'CONVERSATION';

	const setView = (view: ChatboxView) => (currentView = view);
</script>

<div
	transition:fly={{ y: 800, duration: 500 }}
	class="w-full h-full bg-white z-[1000] font-line-seed relative flex flex-col items-center"
>
	{#if currentView === 'CONVERSATION'}
		<ConversationView {setView} />
	{:else if currentView === 'RECAP'}
		<RecapView />
	{/if}
</div>
