<!-- Swiper requires window browser global so it can't use SSR -->
<script lang="ts">
	import type KeenSliderInternal from 'keen-slider';
	import KeenSlider from 'svelte-keen-slider/src/KeenSlider.svelte';
	import KeenSlide from 'svelte-keen-slider/src/KeenSlide.svelte';
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import { showChatbox } from '$lib/global/chatbox';
	import type { ConversationCarouselItem } from '$lib/types/conversationData';

	export let cards: ConversationCarouselItem[];

	let selectedSlide = 0;

	const onSelectedChanged = (slider: KeenSliderInternal) => {
		selectedSlide = slider.details().relativeSlide;
	};
</script>

<KeenSlider
	slideChanged={onSelectedChanged}
	slidesPerView={5}
	arrows={!$showChatbox}
	dots={false}
	centered
	loop
	spacing={20}
>
	{#each cards as card, index (index)}
		<KeenSlide>
			<div class="w-full h-[28vw] flex items-center justify-center mt-[5vh]">
				<ConversationCard
					small={index !== selectedSlide}
					image={card.image}
					intro={card.intro}
					topic={card.topic}
					background={card.background}
					details={card.details}
				/>
			</div>
		</KeenSlide>
	{/each}
</KeenSlider>
