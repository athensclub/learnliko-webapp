<!-- Ref: https://help.rive.app/runtimes/overview/web-js -->
<!-- src is (most probably) relative to static folder (/rives/...) -->
<script lang="ts">
	import * as rive from '@rive-app/canvas';
	import { onDestroy } from 'svelte';

	export let src: string;
	export let autoplay = false;

	let clazz = '';
	export { clazz as class };

	let canvas: HTMLCanvasElement | null = null;
	let riveInstance: rive.Rive | null = null;

	console.log(rive);

	onDestroy(() => {
		riveInstance?.cleanup();
	});

	$: if (canvas) {
		riveInstance = new rive.Rive({
			src,
			canvas,
			autoplay,
			stateMachines: 'bumpy',
			onLoad: () => {
				riveInstance!.resizeDrawingSurfaceToCanvas();
			}
		});
	}
</script>

<canvas class={clazz} bind:this={canvas} />
