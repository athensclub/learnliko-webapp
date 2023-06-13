<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced />

	<div class="flex flex-col flex-1 px-[3vw] py-[2vh]">
		<div class="font-bold text-[2.5vw]">Character</div>

		<div class="w-[20vw] h-[50vh] rounded-[2vw] mt-[5vh] relative bg-white">
			<img
				class="w-auto h-auto max-w-full max-h-[90%] absolute bottom-0 left-[50%] translate-x-[-50%]"
				src="https://cdn.discordapp.com/attachments/842737146321174558/1116747283132842105/avatar.png"
				alt="avatar"
			/>
		</div>
	</div>
</div>
