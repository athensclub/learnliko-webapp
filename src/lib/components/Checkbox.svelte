<script lang="ts">
	export let checked = false;

	let clazz = '';
	export { clazz as class };
</script>

<button
	on:click={() => (checked = !checked)}
	style="box-shadow: 0px 2px 2px 0px #00000040 inset;"
	class={`flex items-center justify-center aspect-square bg-white ${clazz}`}
>
	{#if checked}
		<div class="w-[60%] rounded-full aspect-square bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]" />
	{/if}
</button>
