<script lang="ts">
	import bgvd from '$lib/images/bgvd.mp4';
	import welcomeImg from '$lib/images/welcomavatar.png';
	import talk from '$lib/images/talk.png';
	import read from '$lib/images/read.png';
	import friend from '$lib/images/friend.png';
	import assistant from '$lib/images/assistant.png';
	import Header from '$lib/components/Header.svelte';
	import icon from '$lib/images/learnliko_icon.png';
	import studentModeImage from './student_mode_image.png';
	import professionalModeImage from './professional_mode_image.png';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import { currentMode } from '$lib/global/mode';
	import { goto } from '$app/navigation';
	// if (browser) {
	// 	goto('/play');
	// }

	const selectStudentMode = () => {
		$currentMode = 'Student';
		goto('/discover');
	};

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};
</script>

<div class="w-[100vw] h-full min-h-[100vh] bg-[#F4F4F4] font-line-seed flex flex-col items-center">
	<img class="mt-[4vh] w-[5vw]" src={icon} alt="Learnliko" />

	<div class="mt-[2vh] text-[1.6vw] font-bold">Welcome to Learnliko Trial</div>

	<div class="mt-[3vh] text-[2.5vw] font-extrabold">Select Mode</div>

	<div class="flex flex-row mt-[3vh] w-[60vw] gap-[2vw] text-white font-extrabold">
		<button
			on:click={selectStudentMode}
			class="w-[50%] h-[24vw] bg-[#6C80E8] rounded-[2vw] flex flex-row justify-between px-[2vw]"
		>
			<img class="w-[8vw] mr-[2vw] object-contain" src={studentModeImage} alt="Student" />

			<div class="flex flex-col justify-between h-full pt-[3vh] pb-[4.5vh]">
				<div class="text-[2.6vw]">Student <br /> Mode</div>

				<div
					class="rounded-full flex flex-row border border-white items-center justify-between px-[1vw] h-[6vh] text-[1.2vw]"
				>
					Start
					<svg class="h-[50%]" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM38.0607 13.0607C38.6464 12.4749 38.6464 11.5251 38.0607 10.9393L28.5147 1.3934C27.9289 0.807612 26.9792 0.807612 26.3934 1.3934C25.8076 1.97918 25.8076 2.92893 26.3934 3.51472L34.8787 12L26.3934 20.4853C25.8076 21.0711 25.8076 22.0208 26.3934 22.6066C26.9792 23.1924 27.9289 23.1924 28.5147 22.6066L38.0607 13.0607ZM2 13.5H37V10.5H2V13.5Z"
							fill="white"
						/>
					</svg>
				</div>
			</div>
		</button>

		<button
			class="w-[50%] h-[24vw] bg-[#7EBDFF] rounded-[2vw] flex flex-row justify-between px-[2vw]"
		>
			<img
				class="w-[8vw] mr-[1.2vw] mt-[2vh] object-contain"
				src={professionalModeImage}
				alt="Professional Person"
			/>

			<div class="flex flex-col justify-between items-center h-full pt-[3vh] pb-[4.5vh]">
				<div class="text-[2.6vw]">Professional <br /> Mode</div>

				<div
					class="rounded-full flex flex-row border border-[#FFFFFF7A] text-[#FFFFFF7A] items-center justify-between w-fit h-[6vh] px-[1vw] text-[1.2vw]"
				>
					coming soon
				</div>
			</div>
		</button>
	</div>
</div>

<!-- 
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
		
		<a href="/read">
			<div
				class="text-black backdrop-blur-3xl bg-white/90 w-[22vw] h-[22vw] rounded-3xl shadow-xl border-white/30 border-[2px]"
			>
				<div class=" flex justify-between">
					<div>
						<h1 class="font-bold text-[2vw] mt-2 ml-5">Reading</h1>
						<h2 class="text-[1.1vw] ml-5">You have <strong>10</strong> stories to talk</h2>
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
</style> -->
