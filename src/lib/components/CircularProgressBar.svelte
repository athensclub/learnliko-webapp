<!-- Modified from https://github.com/stephane-vanraes/svelte-progresscircle/blob/master/src/index.svelte -->
<script>
	import { tweened } from 'svelte/motion';
	export let value = 0;
	export let max = 100;

	let clazz = '';
	export { clazz as class };

	let displayValue = tweened(0);
	$: $displayValue = value;

	$: progressPath = () => {
		if ($displayValue <= 0) {
			return '';
		} else if ($displayValue >= max) {
			return 'M50,5A45 45 0 1 1 49.9999 5';
		} else {
			const angle = Math.PI * 2 * ($displayValue / max);
			const x = 50 + Math.cos(angle - Math.PI / 2) * 45;
			const y = 50 + Math.sin(angle - Math.PI / 2) * 45;

			let path = 'M50,5';

			if (angle > Math.PI) {
				path += 'A45 45 0 0 1 50 95';
			}

			path += `A45 45 0 0 1 ${x} ${y}`;

			return path;
		}
	};
</script>

<div class={clazz}>
	<svg viewBox="0 0 100 100">
		<path d="M50,5A45 45 0 1 1 49.9999 5" />
		<path stroke="url(#circularProgressbarGradient)" d={progressPath()} />
	</svg>
	<svg width="0" height="0">
		<defs>
			<linearGradient
				id="circularProgressbarGradient"
				gradientUnits="objectBoundingBox"
				gradientTransform="rotate(90)"
			>
				<stop offset="33%" stop-color="#A431F6" />
                <stop offset="66%" stop-color="#1D8EE9" />
				<stop offset="100%" stop-color="#03DAC5" />
			</linearGradient>
		</defs>
	</svg>
	<div class="w-full h-full">
		<slot>
			<span>{value}</span>
		</slot>
	</div>
</div>

<style>
	svg {
		fill: var(--progress-fill, transparent);
		height: 100%;
		position: absolute;
		stroke-linecap: var(--progress-linecap, round);
		width: 100%;
	}
	path:first-child {
		stroke: var(--progress-trackcolor, rgb(213, 213, 213));
		stroke-width: var(--progress-trackwidth, 9px);
	}
	path:last-child {
		/* stroke: var(--progress-color, linear-gradient(to left, #5785DE, #03DAC5)); */
		stroke-width: var(--progress-width, 10px);
	}
	div {
		position: relative;
	}
	span {
		left: 50%;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
