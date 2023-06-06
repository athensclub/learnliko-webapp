<!-- Swiper requires window browser global so it can't use SSR -->
<script lang="ts">
	import KeenSlider from '$lib/components/keenSlider/KeenSlider.svelte';
	import KeenSlide from '$lib/components/keenSlider/KeenSlide.svelte';
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';
	import { MOBILE_BREAKPOINT_WIDTH_QUERY, isMobile } from '$lib/global/breakpoints';
	import { tick } from 'svelte';
	import type { KeenSliderInstance } from 'keen-slider';

	export let cards: ConversationCarouselItem[];

	let selectedSlide = 0;

	let sliderInternal: KeenSliderInstance | null = null;

	const onSelectedChanged = (slider:  KeenSliderInstance) => {
		selectedSlide = slider.track.details.rel;
	};

	const initializeSlider = (slider: KeenSliderInstance) => {
		sliderInternal = slider;
	};

	const refreshSlider = async () => {
		// wait for the slider's container to update its width, then make the slider recalculate
		if (sliderInternal) {
			await tick();
			sliderInternal.update();
		}
	};

	isMobile.subscribe((_) => refreshSlider());

	$: cards, refreshSlider();
</script>

<div class={`${$isMobile ? 'w-[250vw] relative left-[-75vw]' : 'w-[100vw]'}  overflow-hidden`}>
	<KeenSlider
		initial={0}
		slideChanged={onSelectedChanged}
		created={initializeSlider}
		slidesPerView={3}
		arrows={!$showChatbox}
		dots={false}
		centered
		loop
		spacing={20}
	>
		{#each cards as card, index (index)}
			<KeenSlide>
				<div
					class={`w-full lg:h-[30vw] xl:h-[27vw] flex items-center justify-center mt-[2vh] h-[55vh]`}
				>
					<ConversationCard small={index !== selectedSlide} conversation={card} />
				</div>
			</KeenSlide>
		{/each}
	</KeenSlider>
</div>
