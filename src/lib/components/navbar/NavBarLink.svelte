<script lang="ts">
	import { page } from '$app/stores';

	export let text = '';
	export let href = '';
	$: focused = $page.url.pathname.startsWith(href);
</script>

<a class="flex flex-row" {href}>
	{#if focused}
		<slot name="focusedIcon" />
	{:else}
		<slot name="normalIcon" />
	{/if}

	<div
		class={` ${
			focused
				? 'bg-clip-text text-transparent bg-gradient-to-r from-[#7280FF] via-[#C698FF] to-[#FFD68D]'
				: 'text-black'
		}`}
	>
		{text}
	</div>
</a>
