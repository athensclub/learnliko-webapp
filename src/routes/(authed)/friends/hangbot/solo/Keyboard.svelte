<!-- Modified from https://github.com/taw/svelte-hangbot/blob/master/src/Keyboard.svelte -->
<script lang="ts">
    export let lettersChosen: string[];
    export let onLetter: (s: string) => void;
  
    let letters = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]
  </script>
  
  <div class="keyboard  pt-[1vw]">
    {#each letters as letter}
      {#if lettersChosen.includes(letter)}
        <button class="line-through hidden" disabled>{letter}</button>
      {:else}
        <button class=" shadow-sm bg-gradient-to-br from-[#C698FF] to-[#6C80E8] text-white" on:click={() => onLetter(letter)}>{letter}</button>
      {/if}
    {/each}
  </div>
  
  <style>
    div {
      font-size: 2vw;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: auto;
      max-width: 80vw;
   

    }
    div > * {
      font-size: inherit;
      height: 4vw;
      width: 4vw;
      text-align: center;
      margin: 5px;
      border-radius: 0.5vw;
    }
  
  </style>