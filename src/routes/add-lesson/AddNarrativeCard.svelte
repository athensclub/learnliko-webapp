<script lang="ts">
	import type { NarrativeDataInput } from '$gql/generated/graphql';

	export let index: number;
	
	export const getValue = (): NarrativeDataInput => {
		return {
			illustrationUrl: imageURL,
			text: content
		};
	};

	let content = '';
	let imageURL = '';
</script>

<div class="flex w-fit flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<textarea
		bind:value={content}
		class="h-[20vw] w-[22vw] border border-[#00000033] px-[1vw] py-[0.3vw]"
		placeholder="Text paragraph {index + 1}"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={imageURL}
		placeholder="Add image url"
	/>
</div>
