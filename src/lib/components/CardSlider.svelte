<!-- Swiper requires window browser global so it can't use SSR -->
<script lang="ts">
	import type KeenSliderInternal from 'keen-slider';
	import KeenSlider from 'svelte-keen-slider/src/KeenSlider.svelte';
	import KeenSlide from 'svelte-keen-slider/src/KeenSlide.svelte';
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';
	import { MOBILE_BREAKPOINT_WIDTH_QUERY } from '$lib/global/breakpoints';


	export let cards: ConversationCarouselItem[];

	let selectedSlide = 0;

	const onSelectedChanged = (slider: KeenSliderInternal) => {
		selectedSlide = slider.details().relativeSlide;
	};
</script>

<KeenSlider
	slideChanged={onSelectedChanged}
	slidesPerView={5}
	breakpoints={{
		[MOBILE_BREAKPOINT_WIDTH_QUERY]: {
			slidesPerView: 2
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
			<div class="w-full lg:h-[30vw] xl:h-[27vw] flex items-center justify-center mt-[5vh] h-[34vh]">
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
