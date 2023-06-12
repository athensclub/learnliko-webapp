<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced />

	<div class="flex flex-col flex-1 px-[3vw] py-[2vh]">
		<div class="flex flex-row justify-between font-extrabold">
			<div class="text-[2vw]">Conversation</div>
			<button class="bg-black text-white text-[1vw] px-[2vw] rounded-full">Timeline</button>
		</div>
	</div>
</div>
