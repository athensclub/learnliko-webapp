<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import bgvd from '$lib/images/bgvd.mp4';
	import welcomeImg from '$lib/images/welcomavatar.png';
	import talk from '$lib/images/talk.png';
	import read from '$lib/images/read.png';
	import friend from '$lib/images/friend.png';
	// if (browser) {
	// 	goto('/play');
	// }
</script>

<div class="text-white flex items-center justify-center">
	<header
		class="z-20 flex top-0 items-center justify-left h-[48px] font-line-seed text-xl text-black font-bold w-full fixed bg-white py-8 px-6 pt-10"
	>
		<img
			src="https://firebasestorage.googleapis.com/v0/b/motoverse-development.appspot.com/o/Group%2051.png?alt=media&token=6f4645b6-f350-44bb-9767-e3e2739dc749"
			alt=""
			class=" w-8 h-8 mr-2"
		/>
		<span class=" flex mt-1"
			>Learnliko
			<h1 class=" ml-2 text-xs bg-black text-black rounded-md px-2 text-center mb-1 py-1">DEMO</h1>
		</span>

		<!-- <div class="w-full flex flex-row justify-start ml-6">
		<div class="w-[150px]">
			<Select items={options} placeholder="Select Level ▾" />
		</div>
	</div> -->
	</header>
	<video autoplay muted loop id="myVideo" class="blur-sm">
		<source src={bgvd} type="video/mp4" />
	</video>
	<div class="grid grid-cols-3 gap-4 pt-24 pb-16">
		<!-- <div class="col-span-2 bg-white p-10 rounded">1</div>
	  <div class="bg-white p-10 rounded">2</div> -->
		<div
			class="row-span-2 text-black backdrop-blur-3xl bg-white/15 rounded-2xl shadow-xl border-white/10 border-[1px]"
		>
			<h1 class=" font-bold text-[2vw] mt-2 ml-4">Welcome</h1>
			<h2 class="text-[1.3vw] ml-4">Learn English with AI</h2>
			<img src={welcomeImg} class=" w-[18vw] mt-[4vw] mx-auto" alt="" />
			<button
				class="p-[1vw] bg-white shadow-lg border-black/10 border-[1px] rounded-full w-[15vw] text-white mt-[3vw] mx-[3vw]"
				>How to use Learnliko?</button
			>
		</div>
		<!-- <div class="bg-white p-10 rounded">6</div> -->
		<div
			class="text-black backdrop-blur-3xl bg-white/25 w-[21vw] h-[21vw] rounded-2xl shadow-xl border-white/10 border-[1px]"
		>
			<h1 class=" font-bold text-[1.5vw] mt-2 ml-4">Conversation</h1>
			<h2 class="text-[1.1vw] ml-4">Talk with AI friends</h2>
			<img src={talk} class=" w-[10vw] mt-[0.2vw] ml-[10vw]" alt="" />
		</div>
		<!-- <div class="bg-white p-10 rounded">6</div> -->
		<div
			class="text-black backdrop-blur-3xl bg-white/25 w-[21vw] h-[21vw] rounded-2xl shadow-xl border-white/10 border-[1px]"
		>
			<h1 class=" font-bold text-[1.5vw] mt-2 ml-4">Reading</h1>
			<h2 class="text-[1.1vw] ml-4">Talk with AI friends</h2>
			<img src={read} class=" w-[18vw] mt-[0.1vw] ml-[4vw]" alt="" />
		</div>
		<!-- <div class="bg-white p-10 rounded">6</div> -->
		<div
			class="col-span-2 text-black backdrop-blur-3xl bg-white/15 h-[18vw] rounded-2xl shadow-xl border-white/10 border-[1px]"
		>
			<div class=" flex justify-between">
				<div>
					<h1 class=" font-bold text-[2vw] mt-2 ml-4">Friends Circle</h1>
					<h2 class="text-[1.3vw] ml-4">Pratice English with friends</h2>
				</div>
				<img src={friend} class=" w-[18vw] mr-[2vw] top-0" alt="" />
			</div>
		
		</div>
		<!-- <div class="bg-white p-10 rounded">8</div>
	  <div class="bg-white p-10 rounded">9</div> -->
	</div>
</div>

<style>
	#myVideo {
		position: fixed;
		right: 0;
		bottom: 0;
		min-width: 100%;
		min-height: 100%;
		z-index: -1;
	}
</style>
