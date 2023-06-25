<!-- Modified from https://github.com/taw/svelte-hangbot/blob/master/src/RobotGallows.svelte -->
<script lang="ts">
	import robot1 from '$lib/images/hangbot_head.png';
	import robot2 from '$lib/images/hangbot_top_body.png';
	import robot3 from '$lib/images/hangbot_bottom_body.png';
	import robot4 from '$lib/images/hangbot_left_arm.png';
	import robot5 from '$lib/images/hangbot_right_arm.png';
	import robot6 from '$lib/images/hangbot_left_leg.png';
	import robot7 from '$lib/images/hangbot_right_leg.png';
	export let stage = 0;
</script>

<div class=" h-[15vw] relative">
	{#if stage >= 1}
		<img
			src={robot1}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
	{#if stage >= 2}
		<img
			src={robot2}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
	{#if stage >= 3}
		<img
			src={robot3}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
	{#if stage >= 4}
		<img
			src={robot4}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
	{#if stage >= 5}
		<img
			src={robot5}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
	{#if stage >= 6}
		<img
			src={robot6}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
	{#if stage >= 7}
		<img
			src={robot7}
			class="absolute h-full top-0 left-[50%] translate-x-[-50%]"
			alt="Hangbot Part"
		/>
	{/if}
</div>

<div class="text-center">Hanging of 🤖 at stage {stage} of 7.</div>
