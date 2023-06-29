<script lang="ts">
	import WritingCard from '$lib/components/WritingCard.svelte';
	import { fade } from 'svelte/transition';
</script>

<div transition:fade class="w-full flex flex-row gap-[5vw] justify-center">
	<WritingCard
		class="w-[22vw] h-[30vw]"
		item={{ text: ['I', null, 'a student'], choices: ['is', 'am', 'are', '-'], coin: 100, exp: 25 }}
	/>
	<WritingCard
		class="w-[22vw] h-[30vw]"
		item={{ text: ['I', null, 'a student'], choices: ['is', 'am', 'are', '-'], coin: 100, exp: 25 }}
	/>
	<WritingCard
		class="w-[22vw] h-[30vw]"
		item={{ text: ['I', null, 'a student'], choices: ['is', 'am', 'are', '-'], coin: 100, exp: 25 }}
	/>
</div>
