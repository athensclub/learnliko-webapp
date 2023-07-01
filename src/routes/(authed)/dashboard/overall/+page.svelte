<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import Barchart from '$lib/components/Barchart.svelte';

	let activeUse = 64;
	let averageCEFR = 'A1';
	let totalStudents = 150;
</script>

<div class="flex w-full flex-row bg-[#F4F4F4] font-line-seed">
	<NavBar spaced teacher />
	<div class=" container w-[80vw] ml-[2vw]">
		<div class="flex flex-1 justify-center p-[2vw]">
			<div class=" mr-[2vw] h-[10vw] w-[20vw] rounded-[1.25vw] bg-white p-[1.5vw]">
				<h1>Daily Active Use</h1>
				<h1 class=" text-[3.25vw]">{activeUse}</h1>
			</div>
			<div class=" mr-[2vw] h-[10vw] w-[20vw] rounded-[1.25vw] bg-white p-[1.5vw]">
				<h1>Average CEFR</h1>
				<h1 class=" text-[3.25vw]">{averageCEFR}</h1>
			</div>
			<div class=" mr-[2vw] h-[10vw] w-[20vw] rounded-[1.25vw] bg-white p-[1.5vw]">
				<h1>Total Students</h1>
				<h1 class=" text-[3.25vw]">{totalStudents}</h1>
			</div>
		</div>

		<div class="flex flex-1 justify-center">
			<div class=" mr-[2vw] h-[28vw] w-[20vw] rounded-[1.25vw] bg-white p-[1.5vw]">
				<h1>Daily Active Use</h1>
				<h1 class=" text-[3.25vw]">{activeUse}</h1>
			</div>
			<div class=" mr-[2vw] h-[28vw] w-[42vw] rounded-[1.25vw] bg-white p-[1.5vw]  ">
				<h1 class="text-[2vw]">Daily Learning Stats</h1>
				<div class="mt-[5vw] w-full">
				<Barchart></Barchart> </div>
			</div>
		</div>
		
	</div>
</div>
