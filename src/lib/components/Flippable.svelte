<!-- Modified from https://github.com/aeonyxio/svelte-flip/blob/main/src/lib/Flippable.svelte -->
<script lang="ts">
	export let flip = false;

	let clazz = '';
	export { clazz as class };
</script>

<div class="flip-card {clazz}">
	<div class:flip class="flip-card-inner">
		<div class="flip-card-front">
			<slot name="front" />
		</div>
		<div class="flip-card-back">
			<slot name="back" />
		</div>
	</div>
</div>

<style>
	.flip-card {
		background-color: transparent;
		perspective: 1000px; /* Remove this if you don't want the 3D effect */
	}

	/* This container is needed to position the front and back side */
	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.8s;
		transform-style: preserve-3d;
	}

	/* Do an horizontal flip when you move the mouse over the flip box container */
	.flip {
		transform: rotateY(-180deg);
	}

	/* Position the front and back side */
	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden; /* Safari */
		backface-visibility: hidden;
	}

	/* Default is facing away */
	.flip-card-back {
		transform: rotateY(180deg);
	}
</style>
