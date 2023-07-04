<script lang="ts">
	import { page } from '$app/stores';
	import { isMobile } from '$lib/global/breakpoints';

	export let text = '';
	export let href = '';
	$: focused = $page.url.pathname.startsWith(href);
</script>

<a class={`flex flex-row`} {href}>
	{#if !$isMobile}
		<div
			class={`w-[0.65vw] mr-[2vw] h-full ${
				focused ? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]' : 'bg-transparent'
			}`}
		/>
	{/if}

	{#if focused}
		<slot name="focusedIcon" />
	{:else}
		<slot name="normalIcon" />
	{/if}

	<div
		class={`${
			focused
				? 'bg-clip-text text-transparent bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]'
				: 'text-black'
		}`}
	>
		{text}
	</div>
</a>
