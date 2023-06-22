<!-- Modified from https://codepen.io/elevaunt/pen/VvKdVa -->
<script lang="ts">
	let clazz = '';
	export { clazz as class };
</script>

<svg class={clazz} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
	<circle
		class="path circle"
		fill="none"
		stroke="#73AF55"
		stroke-width="6"
		stroke-miterlimit="10"
		cx="65.1"
		cy="65.1"
		r="62.1"
	/>
	<polyline
		class="path check"
		fill="none"
		stroke="#73AF55"
		stroke-width="6"
		stroke-linecap="round"
		stroke-miterlimit="10"
		points="100.2,40.2 51.5,88.8 29.8,67.5 "
	/>
</svg>

<style lang="scss">
	.path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 0;
		&.circle {
			-webkit-animation: dash 0.9s ease-in-out;
			animation: dash 0.9s ease-in-out;
		}
		&.check {
			stroke-dashoffset: -100;
			-webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
			animation: dash-check 0.9s 0.35s ease-in-out forwards;
		}
	}

	@-webkit-keyframes dash {
		0% {
			stroke-dashoffset: 1000;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	@keyframes dash {
		0% {
			stroke-dashoffset: 1000;
		}
		100% {
			stroke-dashoffset: 0;
		}
	}

	@-webkit-keyframes dash-check {
		0% {
			stroke-dashoffset: -100;
		}
		100% {
			stroke-dashoffset: 900;
		}
	}

	@keyframes dash-check {
		0% {
			stroke-dashoffset: -100;
		}
		100% {
			stroke-dashoffset: 900;
		}
	}
</style>
