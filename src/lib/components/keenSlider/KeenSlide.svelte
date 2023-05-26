<!-- Modified from https://www.npmjs.com/package/svelte-keen-slider?activeTab=code -->
<script lang="ts">
    import {getContext} from 'svelte';
      import { KEENSLIDER } from './KeenSlider.svelte';
    const { registerSlide, getSlideClass} = getContext(KEENSLIDER);
    let slideClass : string = 'keen-slider__slide';
    $: slideClass = getSlideClass();
    registerSlide();  
  </script>
  
  <style>
    .keen-slider__slide {
      position:relative;
      flex: 0 0 100%;
      overflow: hidden;
    }
  </style>
  
  <li class={slideClass}>
    <slot></slot>
  </li>