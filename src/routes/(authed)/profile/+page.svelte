<script lang="ts">
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { getCurrentCEFRLevel, queryLearningDiariesLocal } from '$lib/localdb/profileLocal';
	import { getContext, onDestroy, onMount } from 'svelte';
	import type { LearningDiaryItem } from '$lib/types/learningDiary';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import LearningDiaryModal from '$lib/components/modals/LearningDiaryModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import type { Context } from 'svelte-simple-modal';
	import userSession from '$lib/stores/userSession';
	import { showChatbox } from '$lib/global/chatbox';
	import { navigating } from '$app/stores';
	import { beforeNavigate } from '$app/navigation';

	let name = 'Natsataporn M.';
	let learningDiaries: LearningDiaryItem[] | null = null;

	const { open }: Context = getContext('simple-modal');
	const showDiary = (item: LearningDiaryItem) => {
		open(LearningDiaryModal, { item });
	};

	const goBack = () => {
		window.history.back();
	};

	onMount(async () => {
		// TODO: implement db using actual database (cloud) and probably move this to ssr.
		learningDiaries = await queryLearningDiariesLocal();
	});

	// hide chatbox on exit in case it is showing recap.
	beforeNavigate(() => ($showChatbox = false));
</script>

<div
	class={`w-full h-full min-h-[100vh] flex font-line-seed ${
		$isMobile ? 'bg-white flex-col' : 'bg-[#F4F4F4] flex-row'
	}`}
>
	{#if !$isMobile}
		<NavBar spaced />
	{:else}
		<nav
			style="box-shadow: 0px 2px 8px 0px #0000001A;"
			class="sticky top-0 w-[100vw] px-[6vw] py-[2vh]"
		>
			<button on:click={goBack} class="flex flex-row items-center font-bold text-[6vw]">
				<svg
					class="w-[8vw] mr-[4vw]"
					viewBox="0 0 34 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M32 13.5C32.8284 13.5 33.5 12.8284 33.5 12C33.5 11.1716 32.8284 10.5 32 10.5L32 13.5ZM0.939339 10.9393C0.353552 11.5251 0.353552 12.4749 0.939339 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12132 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97918 12.6066 1.3934C12.0208 0.80761 11.0711 0.80761 10.4853 1.3934L0.939339 10.9393ZM32 10.5L2 10.5L2 13.5L32 13.5L32 10.5Z"
						fill="black"
					/>
				</svg>

				Profile
			</button>
		</nav>
	{/if}

	<div class="flex flex-col flex-1">
		<div
			class={`flex flex-row items-center justify-between bg-[#FFFFFFCC] gap-[3vw] ${
				$isMobile ? 'px-[6vw] py-[2vh]' : 'sticky top-0 px-[2vw] py-[2vh]'
			}`}
		>
			<div class={`w-full flex flex-row items-center rounded-2xl`}>
				<div
					class={`bg-center bg-cover rounded-full ${
						$isMobile ? 'w-[15vw] h-[15vw]' : 'w-[5vw] h-[5vw]'
					}`}
					style="background-image: url('{userProfileImage}');"
				/>
				<div class={`flex flex-col font-bold ${$isMobile ? 'ml-[2.5vw]' : 'ml-[1vw]'}`}>
					<div class={`${$isMobile ? 'text-[5.5vw]' : 'text-[1.5vw]'}`}>Natsataporn M.</div>
					<div class={`${$isMobile ? 'text-[3.5vw]' : 'text-[1vw]'}`}>🧿 3300 coin</div>
				</div>
			</div>
		</div>

		<div class={`flex flex-col px-[6vw] ${$isMobile ? 'mt-[2vh]' : 'mt-[12vh]'}`}>
			<div
				class={`flex w-full justify-between font-bold ${
					$isMobile ? 'flex-col gap-[2vh]' : 'flex-row'
				}`}
			>
				<div
					class={`flex flex-row items-center justify-evenly bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] text-white rounded-3xl ${
						$isMobile ? 'w-full h-[20vh]' : 'w-[55%] h-[30vh]'
					}`}
				>
					<div class="flex flex-col items-center">
						<div class={`${$isMobile ? 'text-[4vw]' : 'text-[1.35vw]'}`}>CEFR Level</div>
						<div class={`${$isMobile ? 'text-[14vw]' : 'text-[4.5vw]'}`}>
							{$userSession.profile?.CEFRLevel.general}
						</div>
					</div>

					<div class="flex flex-col">
						<div class={`${$isMobile ? 'text-[4vw]' : 'text-[1.35vw]'}`}>Average Time</div>
						<div>
							<div class={`inline-block ${$isMobile ? 'text-[14vw]' : 'text-[4.5vw]'}`}>31</div>
							<div class={`inline-block ${$isMobile ? 'text-[4vw]' : 'text-[1.35vw]'}`}>min</div>
						</div>
					</div>
				</div>

				<a
					href="/cert"
					style="box-shadow: 0px 10px 30px 0px #0000001A;"
					class={`flex items-center justify-center bg-white rounded-3xl ${
						$isMobile ? 'w-full h-[15vh] flex-row gap-[5vw]' : 'w-[35%] h-[30vh] flex-col gap-[2vh]'
					}`}
				>
					<svg
						class={`${$isMobile ? 'h-[42%]' : 'h-[35%]'}`}
						viewBox="0 0 114 114"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_745_1332)">
							<path
								d="M60.5611 33.1523H25.4023V39.0122H60.5611V33.1523Z"
								fill="url(#paint0_linear_745_1332)"
							/>
							<path
								d="M60.5611 54.6387H25.4023V60.4985H60.5611V54.6387Z"
								fill="url(#paint1_linear_745_1332)"
							/>
							<path
								d="M101.298 19.2875C83.8956 21.6851 65.7106 63.7816 57.5093 78.8908C55.4493 82.6869 60.2399 85.855 62.3601 82.2213C63.8879 79.61 72.2218 63.1617 72.2218 63.1617C81.2994 63.4612 84.6473 57.1226 81.0191 53.1856C93.2193 53.4374 99.2663 46.723 95.8062 42.6486C99.4455 43.8008 102.597 43.03 107.278 40.4779C117.265 35.0297 116.8 16.7942 101.298 19.2875Z"
								fill="url(#paint2_linear_745_1332)"
							/>
							<path
								d="M78.1519 68.3629V98.6709C78.1519 99.5691 77.4194 100.3 76.5229 100.302H9.44218C8.54555 100.3 7.81501 99.5691 7.81323 98.6709V15.3307C7.81523 14.432 8.54577 13.7017 9.44218 13.6997H76.5229C77.4196 13.7017 78.1519 14.4323 78.1519 15.3307V30.4626C80.708 27.0197 83.3057 23.9735 85.9649 21.4442V15.3309C85.9609 10.1138 81.7418 5.89073 76.5227 5.88672H9.44218C4.22513 5.89073 0.00200391 10.1138 0 15.3309V98.6711C0.00200391 103.888 4.22513 108.111 9.44218 108.115H76.5229C81.742 108.111 85.9611 103.888 85.9651 98.6711V63.3919C84.1567 65.7743 81.4632 67.491 78.1519 68.3629Z"
								fill="url(#paint3_linear_745_1332)"
							/>
						</g>
						<defs>
							<linearGradient
								id="paint0_linear_745_1332"
								x1="25.4023"
								y1="36.1107"
								x2="60.5611"
								y2="36.1107"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#6C80E8" />
								<stop offset="1" stop-color="#9BA1FD" />
							</linearGradient>
							<linearGradient
								id="paint1_linear_745_1332"
								x1="25.4023"
								y1="57.5971"
								x2="60.5611"
								y2="57.5971"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#6C80E8" />
								<stop offset="1" stop-color="#9BA1FD" />
							</linearGradient>
							<linearGradient
								id="paint2_linear_745_1332"
								x1="57.0059"
								y1="51.7536"
								x2="114"
								y2="51.7536"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#6C80E8" />
								<stop offset="1" stop-color="#9BA1FD" />
							</linearGradient>
							<linearGradient
								id="paint3_linear_745_1332"
								x1="-8.41319e-07"
								y1="57.4971"
								x2="85.9651"
								y2="57.4971"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#6C80E8" />
								<stop offset="1" stop-color="#9BA1FD" />
							</linearGradient>
							<clipPath id="clip0_745_1332">
								<rect width="114" height="114" fill="white" />
							</clipPath>
						</defs>
					</svg>

					<div
						class={`text-transparent bg-clip-text bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] ${
							$isMobile ? 'text-[6.5vw]' : 'text-[2vw]'
						}`}
					>
						Certificate
					</div>
				</a>
			</div>

			<div
				class={`font-extrabold ${
					$isMobile ? 'mx-auto text-[7vw] mt-[7vh]' : 'text-[2vw] mt-[10vh]'
				}`}
			>
				Learning Diary
			</div>
			{#if learningDiaries}
				<div class="w-full grid grid-cols-2 gap-[2vw] mt-[2vh]">
					{#each learningDiaries as diary (diary.date)}
						<div class="w-full bg-white h-fit flex flex-col rounded-2xl font-bold p-3">
							<div class="flex flex-row items-center justify-between">
								<div class="text-sm">{diary.date}</div>

								<button
									on:click={() => showDiary(diary)}
									class="bg-black text-white text-sm flex flex-row px-2 py-1 items-center justify-center rounded-2xl"
								>
									Read more

									<svg
										class="ml-3 w-3"
										viewBox="0 0 25 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM24.7071 8.70711C25.0976 8.31658 25.0976 7.68342 24.7071 7.2929L18.3431 0.928934C17.9526 0.538409 17.3195 0.538409 16.9289 0.928934C16.5384 1.31946 16.5384 1.95262 16.9289 2.34315L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.70711ZM1 9L24 9L24 7L1 7L1 9Z"
											fill="white"
										/>
									</svg>
								</button>
							</div>

							<div class="mt-5">
								{diary.title}
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- bottom spacing -->
			<div class="w-full h-[10vh]" />
		</div>
	</div>
</div>
