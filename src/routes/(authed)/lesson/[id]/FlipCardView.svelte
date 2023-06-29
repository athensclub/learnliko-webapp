<script lang="ts">
	import VocabFlipCard from '$lib/components/VocabFlipCard.svelte';

</script>

<div class="w-full flex-1 flex flex-row gap-[5vw] items-center justify-center">
	<VocabFlipCard class="w-[22vw] h-[30vw]" item={{ image: 'https://cdn.discordapp.com/attachments/842737146321174558/1123927173087109120/image.png', choices: ['A dog', 'A cat', 'An ant', 'An elephant'], coin: 100, exp: 25 }} />
	<VocabFlipCard class="w-[22vw] h-[30vw]" item={{ image: 'https://cdn.discordapp.com/attachments/842737146321174558/1123927173087109120/image.png', choices: ['A dog', 'A cat', 'An ant', 'An elephant'], coin: 100, exp: 25 }} />
	<VocabFlipCard class="w-[22vw] h-[30vw]" item={{ image: 'https://cdn.discordapp.com/attachments/842737146321174558/1123927173087109120/image.png', choices: ['A dog', 'A cat', 'An ant', 'An elephant'], coin: 100, exp: 25 }} />
</div>
