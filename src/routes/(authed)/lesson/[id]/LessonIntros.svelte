<script lang="ts">
	import type { LessonIntroItem } from '$lib/types/lesson';

	export let setBackground: (image: string) => void;
	export let items: LessonIntroItem[];

	let currentItem = 0;
	const nextItem = () => (currentItem = currentItem + 1);

	$: setBackground(items[currentItem].background);
</script>

<div
	class="absolute bottom-0 left-0 flex flex-col items-center gap-[5vh] w-full py-[10vh] bg-gradient-to-b from-transparent via-black/60 to-black/80"
>
	<div class="text-white text-[1.5vw] max-w-[60%] text-center font-bold">
		{items[currentItem].description}
	</div>

	<button
		on:click={nextItem}
		class="text-white text-[1.3vw] font-bold border border-white rounded-full px-[3vw] py-[1vh]"
		>ต่อไป</button
	>
</div>
