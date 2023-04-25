<script lang="ts">
	import { fly } from 'svelte/transition';
	import ConversationView from './ConversationView.svelte';

	let currentView: 'CONVERSATION' | 'RECAP' = 'CONVERSATION';
</script>

<div
	transition:fly={{ y: 800, duration: 500 }}
	class="w-full h-full bg-white z-[1000] font-line-seed relative flex flex-col items-center"
>
	{#if (currentView = 'CONVERSATION')}
		<ConversationView />
	{/if}
</div>
