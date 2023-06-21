<script lang="ts">
	import type {
		FillInTheBlankMultipleChoicesQuestion,
		ImageMatchingMultipleChoicesQuestion
	} from '$lib/types/pretest';

	export let quiz: FillInTheBlankMultipleChoicesQuestion | ImageMatchingMultipleChoicesQuestion;
	export let userAnswer: number;
	export let nextClicked: () => void;
</script>

<div class="w-full h-full bg-white font-line-seed flex flex-col" >
    
</div>
