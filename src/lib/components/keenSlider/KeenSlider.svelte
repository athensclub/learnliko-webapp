<!-- Modified from https://www.npmjs.com/package/svelte-keen-slider?activeTab=code -->
<script context="module">
	export const KEENSLIDER = {};
</script>

<script lang="ts">
	import { onMount, setContext, onDestroy } from 'svelte';
	import KeenSlider, {
		type KeenSliderHooks,
		type KeenSliderInstance,
		type KeenSliderOptions,
		type WebOptions
	} from 'keen-slider';
	import KeenSlide from './KeenSlide.svelte';

	let sliderNode: HTMLElement;
	let sliderSlides: number = 0;
	let slideClass: string;
	let selectedSlide: number = 0;

	type classes = {
		keen?: string;
		container?: string;
		slidesWrapper?: string;
		slide?: string;
		dotsWrapper?: string;
		dot?: string;
		arrowLeft?: string;
		arrowRight?: string;
	};

	let slider: KeenSliderInstance;
	export let arrows: boolean = true;
	export let breakpoints: {
		[key: string]: Omit<KeenSliderOptions<{}, {}, KeenSliderHooks>, 'breakpoints'>;
	} = {};
	export let centered: boolean = true;
	export let drag: boolean = true;
	export let dots: boolean = true;
	export let dragSpeed: number = 1;
	export let duration: number = 500;
	export let initial: number = 0;
	export let classes: classes = {};
	export let loop: boolean = false;
	export let mode: 'snap' | 'free' | 'free-snap' = 'snap';
	export let rubberband: boolean = true;
	export let slidesPerView: number = 1;
	export let spacing: number = 0;
	export let vertical: boolean = false;
	export let created = (slider: KeenSliderInstance) => {};
	export let slideChanged = (slider: KeenSliderInstance) => {
		selectedSlide = slider.track.details.rel;
	};
	export let dragEnded = (slider: KeenSliderInstance) => {};
	export let dragStarted = (slider: KeenSliderInstance) => {};
	export let destroyed = (slider: KeenSliderInstance) => {};

	$: keenClasses = {
		keen: 'keen-slider',
		container: 'keen-slider__container',
		slidesWrapper: 'keen-slider__slides-wrapper',
		slide: 'keen-slider__slide',
		dotsWrapper: 'keen-slider__dots',
		dot: 'keen-slider__dot',
		arrowLeft: 'keen-slider__arrow keen-slider__arrow--left',
		arrowRight: 'keen-slider__arrow keen-slider__arrow--right',
		...classes
	};

	$: sliderSlides;
	$: slideClass = keenClasses.slide;

	let slides: { origin: 'center' | 'auto' };
	$: slides = { origin: centered ? 'center' : 'auto', perView: slidesPerView, spacing };

	$: defaultAnimation = { duration };

	onMount(async () => {
		slider = new KeenSlider(sliderNode, {
			breakpoints,
			drag,
			dragSpeed,
			defaultAnimation,
			initial,
			loop,
			mode,
			rubberband,
			slides,
			vertical,
			created,
			slideChanged,
			dragEnded,
			dragStarted,
			destroyed
		});

		return () => {
			slider.destroy();
		};
	});
	setContext(KEENSLIDER, {
		registerSlide() {
			sliderSlides++;
			onDestroy(() => {
				sliderSlides--;
			});
		},
		getSlideClass() {
			return slideClass;
		}
	});
</script>

<div class={keenClasses.keen}>
	<div class={keenClasses.container}>
		{#if arrows}
			<button
				class="keen-slider__prev"
				on:click={() => {
					slider.prev();
				}}
			>
				<svg
					class="keen-slider__prev-icon bg-black p-2 rounded-md"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
				</svg>
				<span class="keen-slider__prev-sr-text">Previous</span>
			</button>
			<button
				class="keen-slider__next"
				on:click={() => {
					slider.next();
				}}
			>
				<svg
					class="keen-slider__next-icon bg-black p-2 rounded-md"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
				</svg>
				<span class="keen-slider__next-sr-text">Next</span>
			</button>
		{/if}

		<ul class={keenClasses.slidesWrapper} bind:this={sliderNode}>
			<slot />
		</ul>
	</div>

	{#if dots}
		<div class={keenClasses.dotsWrapper}>
			{#each Array(sliderSlides) as _, idx}
				<button
					class={keenClasses.dot}
					class:is-selected={idx === selectedSlide}
					on:click={() => slider.moveToIdx(idx)}
				/>
			{/each}
		</div>
	{/if}
</div>

<style>
	.keen-slider {
		position: relative;
	}

	.keen-slider__container {
		position: relative;
	}

	.keen-slider__slides-wrapper {
		display: flex;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-touch-callout: none;
		-khtml-user-select: none;
		touch-action: pan-y;
		-webkit-tap-highlight-color: transparent;
		overflow: hidden;
		position: relative;
		margin: 0;
		padding: 0;
	}

	.keen-slider__dots {
		display: flex;
		justify-content: center;
	}

	.keen-slider__dot {
		background-color: transparent;
		cursor: pointer;
		position: relative;
		padding: 0;
		outline: 0;
		border: 0;
		width: 30px;
		height: 30px;
		margin-right: 7.5px;
		margin-left: 7.5px;
		display: flex;
		align-items: center;
	}

	.keen-slider__dot:focus::after {
		border: 2px dotted black;
	}

	.keen-slider__dot::after {
		background-color: #efefef;
		transition: background-color 0.2s linear;
		width: 100%;
		height: 4px;
		border-radius: 2px;
		content: '';
	}

	.keen-slider__dot.is-selected::after {
		background-color: red;
	}

	.keen-slider__dot:hover::after {
		background-color: blue;
	}

	.keen-slider__prev,
	.keen-slider__next {
		height: 80px;
		width: 80px;
		border: 0;
		background: none;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
		z-index: 1;
		outline: none;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.keen-slider__prev:focus .keen-slider__prev-icon,
	.keen-slider__next:focus .keen-slider__next-icon {
		outline: 2px dashed #17171d;
	}

	.keen-slider__prev:hover .keen-slider__prev-icon,
	.keen-slider__next:hover .keen-slider__next-icon {
		transform: scale(1.1);
	}

	.keen-slider__prev::-moz-focus-inner,
	.keen-slider__next::-moz-focus-inner {
		border: 0;
	}

	.keen-slider__prev-icon,
	.keen-slider__next-icon {
		outline: none;
		transform-origin: center;
		transition: transform 0.3s linear;
		fill: #fff;
		width: 30px;
		height: 30px;
	}

	.keen-slider__prev {
		left: 5px;
	}

	.keen-slider__next {
		left: auto;
		right: 5px;
	}

	.keen-slider__prev-sr-text,
	.keen-slider__next-sr-text {
		height: 1px;
		overflow: hidden;
		position: absolute;
		width: 1px;
	}
</style>
