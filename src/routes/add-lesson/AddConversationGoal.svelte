<script lang="ts">
	export let index: number;
	export let getValue = () => {};

	let goal = '';
	let hint = '';
</script>

<div class="mb-[3vw] flex flex-col gap-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={goal}
		placeholder="Add Goal {index + 1}"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={hint}
		placeholder="Add hint"
	/>
</div>
