<script lang="ts">
	import NavBar from "$lib/components/navbar/NavBar.svelte";
	import Typewriter from "svelte-typewriter/Typewriter.svelte";

	
	let activeUse = 64;
	let averageCEFR = 'A1';
	let totalStudents = 150;


</script>



<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced teacher />

	<div class="flex flex-1 py-[2vw] text-white">
		<div class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[1.5vw]">
			<h1>Today Use</h1>
			<h1 class=" text-[3.25vw] font-extrabold">{activeUse}</h1>
		</div>
		<div class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[1.5vw]">
			<h1>Average CEFR</h1>
			<h1 class=" text-[3.25vw] font-extrabold">{averageCEFR}</h1>
		</div>
		<div class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[1.5vw]">
			<h1>Total Students</h1>
			<h1 class=" text-[3.25vw] font-extrabold">{totalStudents}</h1>
		</div>
	</div>
</div>