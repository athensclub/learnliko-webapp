<!-- Modified from https://github.com/taw/svelte-hangbot/blob/master/src/Keyboard.svelte -->
<script lang="ts">
    export let lettersChosen: string[];
    export let onLetter: (s: string) => void;
  
    let letters = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]
  </script>
  
  <div class="keyboard">
    {#each letters as letter}
      {#if lettersChosen.includes(letter)}
        <button class="line-through" disabled>{letter}</button>
      {:else}
        <button on:click={() => onLetter(letter)}>{letter}</button>
      {/if}
    {/each}
  </div>
  
  <style>
    div {
      font-size: 30px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin: auto;
      max-width: 80vw;
    }
    div > * {
      font-size: inherit;
      height: 50px;
      width: 50px;
      text-align: center;
      line-height: 30px;
      margin: 10px;
    }
  
  </style>