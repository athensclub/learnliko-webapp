<script lang="ts">
	import bgvd from '$lib/images/bgvd.mp4';
	import welcomeImg from '$lib/images/welcomavatar.png';
	import talk from '$lib/images/talk.png';
	import read from '$lib/images/read.png';
	import friend from '$lib/images/friend.png';
	import assistant from '$lib/images/assistant.png';
	import Header from '$lib/components/Header.svelte';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
	// if (browser) {
	// 	goto('/play');
	// }

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};
</script>

<div class="text-white flex items-center justify-center">
	<Header />

	<video
		autoplay
		muted
		loop
		id="myVideo"
		class=" brightness-110 blur-sm rotate-0 md:rotate-0 object-cover"
	>
		<source src={bgvd} type="video/mp4" />
	</video>
	<div class="grid lg:grid-cols-2 gap-3 pt-[16vh] pb-[5vh]">
		<!-- <div class="col-span-2 bg-white p-10 rounded">1</div>
	  <div class="bg-white p-10 rounded">2</div> -->
		<div class=" text-black backdrop-blur-lg bg-white/5 rounded-3xl shadow-xl col-span-3 lg:row-span-2 lg:col-span-1">
			<h1 class=" font-bold lg:text-[2vw] mt-2 ml-5 text-[3vh]">Welcome</h1>
			<h2 class="lg:text-[1.3vw] text-[2vh] ml-5">Learn English with AI</h2>
			<img
				src={welcomeImg}
				class=" lg:w-[18vw] w-[30vh] mt-[4vw] mx-auto animate-[wiggle_4s_ease-in-out_infinite]"
				alt=""
			/>
			<button
				class="p-[1vw] backdrop-blur-xl bg-white/10 shadow-lg font-line-seed font-bold rounded-full w-[15vw] text-black mt-[3vw] mx-[3.5vw]"
				>📱Download App
			</button>
		</div>
		<!-- <div class="bg-white p-10 rounded">6</div> -->
		<a href="/play">
			<div
				class="text-black backdrop-blur-3xl bg-white/90 w-[22vw] h-[22vw] rounded-3xl shadow-xl border-white/30 border-[2px]"
			>
				<div class=" flex justify-between">
					<div>
						<h1 class="font-bold text-[2vw] mt-2 ml-5">Conversation</h1>
						<h2 class="text-[1.1vw] ml-5">You have <strong>5</strong> people to talk</h2>
					</div>

					<svg
						width="40"
						class=" mr-4 mt-4"
						height="40"
						viewBox="0 0 66 66"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_323_97)">
							<path
								d="M1.46447 57.4645C-0.488156 59.4171 -0.488156 62.5829 1.46447 64.5355C3.41709 66.4882 6.58291 66.4882 8.53553 64.5355L1.46447 57.4645ZM66 5C66 2.23858 63.7614 0 61 0H16C13.2386 0 11 2.23858 11 5C11 7.76142 13.2386 10 16 10H56V50C56 52.7614 58.2386 55 61 55C63.7614 55 66 52.7614 66 50V5ZM8.53553 64.5355L64.5355 8.53553L57.4645 1.46447L1.46447 57.4645L8.53553 64.5355Z"
								fill="#0A0A0A"
							/>
						</g>
						<defs>
							<clipPath id="clip0_323_97">
								<rect width="66" height="66" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</div>

				<img src={talk} class=" w-[10.5vw] mt-[0vw] ml-[10vw]" alt="" />
				
			</div>
		</a>
		<!-- <div class="bg-white p-10 rounded">6</div> -->
		<a href="/read">
			<div
				class="text-black backdrop-blur-3xl bg-white/90 w-[22vw] h-[22vw] rounded-3xl shadow-xl border-white/30 border-[2px]"
			>
				<div class=" flex justify-between">
					<div>
						<h1 class="font-bold text-[2vw] mt-2 ml-5">Reading</h1>
						<h2 class="text-[1.1vw] ml-5">You have <strong>5</strong> people to talk</h2>
					</div>

					<svg
						width="40"
						class=" mr-4 mt-4"
						height="40"
						viewBox="0 0 66 66"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_323_97)">
							<path
								d="M1.46447 57.4645C-0.488156 59.4171 -0.488156 62.5829 1.46447 64.5355C3.41709 66.4882 6.58291 66.4882 8.53553 64.5355L1.46447 57.4645ZM66 5C66 2.23858 63.7614 0 61 0H16C13.2386 0 11 2.23858 11 5C11 7.76142 13.2386 10 16 10H56V50C56 52.7614 58.2386 55 61 55C63.7614 55 66 52.7614 66 50V5ZM8.53553 64.5355L64.5355 8.53553L57.4645 1.46447L1.46447 57.4645L8.53553 64.5355Z"
								fill="#0A0A0A"
							/>
						</g>
						<defs>
							<clipPath id="clip0_323_97">
								<rect width="66" height="66" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</div>
				<img src={read} class=" w-[18vw] ml-[4vw] mt-[0.5vw]" alt="" />
			</div>
		</a>
		<!-- <div class="bg-white p-10 rounded">6</div> -->
		<a
			href="/friends"
			class="col-span-2 text-black backdrop-blur-3xl bg-white/90 h-[16vw] rounded-3xl shadow-xl border-white/30 border-[2px]"
		>
			<div class=" flex justify-between">
				<div>
					<h1 class="font-bold text-[2vw] mt-2 ml-5">Friends Space</h1>
					<h2 class="text-[1.3vw] ml-5">6 New messages from friends</h2>
				</div>
				<img src={friend} class=" w-[17vw] mr-[2vw] top-0" alt="" />
			</div>
		</a>
		<!-- <div class="bg-white p-10 rounded">8</div>
	  <div class="bg-white p-10 rounded">9</div> -->
	</div>
</div>

<button
	on:click={openAssistantChat}
	class="p-1 w-16 fixed h-16 backdrop-blur-lg bg-white/20 rounded-full bottom-14 right-14 hover:bg-white active:shadow-xl mouse shadow transition ease-in duration-200 focus:outline-none"
>
	<img src={assistant} alt="assistant" />
</button>

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
