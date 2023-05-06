<!-- Swiper requires window browser global so it can't use SSR -->
<script lang="ts">
	import type KeenSliderInternal from 'keen-slider';
	import KeenSlider from 'svelte-keen-slider/src/KeenSlider.svelte';
	import KeenSlide from 'svelte-keen-slider/src/KeenSlide.svelte';
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';
	import { MOBILE_BREAKPOINT_WIDTH_QUERY, isMobile } from '$lib/global/breakpoints';
	import { tick } from 'svelte';

	export let cards: ConversationCarouselItem[];

	let selectedSlide = 0;

	let sliderInternal: KeenSliderInternal | null = null;

	const onSelectedChanged = (slider: KeenSliderInternal) => {
		selectedSlide = slider.details().relativeSlide;
	};

	const initializeSlider = (slider: KeenSliderInternal) => {
		sliderInternal = slider;
	};

	isMobile.subscribe(async (isMobile) => {
		if (sliderInternal) {
			// wait for the slider's container to update its width, then make the slider recalculate
			await tick();
			sliderInternal.refresh();
		}
	});
</script>

<div class={`${$isMobile ? 'w-[250vw] relative left-[-75vw]' : 'w-[100vw]'}  overflow-hidden`}>
	<KeenSlider
		slideChanged={onSelectedChanged}
		mounted={initializeSlider}
		slidesPerView={5}
		breakpoints={{
			[MOBILE_BREAKPOINT_WIDTH_QUERY]: {
				slidesPerView: 3
			}
		}}
		arrows={!$showChatbox}
		dots={false}
		centered
		loop
		spacing={20}
	>
		{#each cards as card, index (index)}
			<KeenSlide>
				<div
					class={`w-full lg:h-[30vw] xl:h-[27vw] flex items-center justify-center mt-[5vh] h-[36vh]`}
				>
					<ConversationCard
						small={index !== selectedSlide}
						intro={card.intro}
						topic={card.topic}
						background={card.background}
						details={card.details}
					/>
				</div>
			</KeenSlide>
		{/each}
	</KeenSlider>
</div>
