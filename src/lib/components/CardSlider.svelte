<!-- Swiper requires window browser global so it can't use SSR -->
<script lang="ts">
  import type KeenSliderInternal from "keen-slider";
  import KeenSlider from "svelte-keen-slider/src/KeenSlider.svelte";
  import KeenSlide from "svelte-keen-slider/src/KeenSlide.svelte";
  import ConversationCard from "./ConversationCard.svelte";
  import kidImage from "$lib/images/sample_kid_image.png";
	import { showChatbox } from "$lib/global/chatbox";

  let cards = [
    {
      image: kidImage,
      intro: "Hi, I’m Traveler",
      topic: "“ How to go to Hat Yai Public Garden? ”",
    },
    {
      image: kidImage,
      intro: "Hi, I’m Traveler",
      topic: "“ How to go to Hat Yai Public Garden? ”",
    },
    {
      image: kidImage,
      intro: "Hi, I’m Traveler",
      topic: "“ How to go to Hat Yai Public Garden? ”",
    },
    {
      image: kidImage,
      intro: "Hi, I’m Traveler",
      topic: "“ How to go to Hat Yai Public Garden? ”",
    },
    {
      image: kidImage,
      intro: "Hi, I’m Traveler",
      topic: "“ How to go to Hat Yai Public Garden? ”",
    },
  ];
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
      <div class="w-full h-[380px] flex items-center justify-center">
        <ConversationCard
          small={index !== selectedSlide}
          image={card.image}
          intro={card.intro}
          topic={card.topic}
        />
      </div>
    </KeenSlide>
  {/each}
</KeenSlider>
