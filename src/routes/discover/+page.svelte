<script lang="ts">
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import ReadingCard from '$lib/components/ReadingCard.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { queryDiscoverItemsLocal } from '$lib/localdb/discoverLocal';
	import type { DiscoverItem } from '$lib/types/discover';
	import { onMount } from 'svelte';

	let items: DiscoverItem[] = [];
	onMount(async () => {
		// TODO: use cloud db and probably move this to ssr.
		items = await queryDiscoverItemsLocal();
		console.log(items);
	});
</script>

<div class="w-[100vw] h-full min-h-[100vh] bg-[#F4F4F4] font-line-seed">
	<NavBar />

	<div class="flex flex-col w-fit mx-auto gap-[6vh] px-[3vw] py-[6vh]">
		{#each items as item, index (index)}
			{#if item.conversation}
				<ConversationCard class="w-[27vw] h-[38vw]" conversation={item.conversation} />
			{:else if item.reading}
				<ReadingCard class="w-[27vw] h-[38vw]" item={item.reading} />
			{/if}
		{/each}
	</div>
</div>
