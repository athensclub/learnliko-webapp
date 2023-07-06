<script lang="ts">
	export let index: number;
	export let upload = () => {};

	let content = '';
	let imageURL = '';
</script>

<div class="flex w-fit flex-col border border-[#00000033] p-[2vw] gap-[2vw]">
	<textarea
		bind:value={content}
		class="border border-[#00000033] px-[1vw] py-[0.3vw] w-[22vw] h-[20vw]"
		placeholder="Text paragraph {index + 1}"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={imageURL}
		placeholder="Add image url"
	/>
</div>
