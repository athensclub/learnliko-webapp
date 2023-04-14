<script lang="ts">
  import CardSlider from "$lib/components/CardSlider.svelte";
  import Select from "svelte-select";

	let options = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
</script>

<header
	class="flex items-center justify-center border-b border-black h-[48px] font-line-seed text-xl font-bold"
>
	Learnliko.ai
</header>

<div class="w-full flex flex-row justify-end">
	<div class="w-[15%] mr-5 mt-3">
		<Select items={options} placeholder="Select Level" />
	</div>
</div>

<CardSlider />
