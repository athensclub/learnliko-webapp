<script lang="ts" context="module">
	import type { SvelteComponent } from 'svelte';
	import { get, writable } from 'svelte/store';

	let runningID = 0;
	let toasts = writable<
		{ type: typeof SvelteComponent; props: Record<string, unknown>; id: number }[]
	>([]);

	export const toast = (component: typeof SvelteComponent, props: Record<string, unknown> = {}) => {
		let currentID = runningID++;
		toasts.set([...get(toasts), { type: component, props, id: currentID }]);
		setTimeout(() => {
			toasts.set(get(toasts).filter((v) => v.id !== currentID));
		}, 3000);
	};
</script>

{#each $toasts as toast (toast.id)}
	<svelte:component this={toast.type} {...toast.props} />
{/each}
