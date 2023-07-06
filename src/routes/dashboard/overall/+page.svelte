<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import Barchart from '$lib/components/Barchart.svelte';
	import { getActiveUsers, getTotalLearner, queryLearnersByExp } from '$lib/temp/analytic';
	import { onMount } from 'svelte';
	import type { User } from '$gql/graphql';

	let activeUse = 64;
	let averageCEFR = 'A1';
	let totalStudents = 150;

	let leaderboard: User[] = [];
	let loading = true;

	onMount(() => {
		initializeData();
	});

	const initializeData = async function () {
		await Promise.all([
			getTotalLearner().then((learners) => {
				totalStudents = learners.totalLearner;
				averageCEFR = learners.averageLevel;
			}),

			getActiveUsers().then((active) => {
				activeUse = active;
			}),

			queryLearnersByExp().then((learners) => {
				learners.forEach((data) => {
					if (data.profile) leaderboard.push(data);
				});
			})
		]);
		loading = false;
	};
</script>

{#if loading}
	Loading...
{:else}
	<div class="flex w-full flex-row bg-[#F4F4F4] font-line-seed">
		<NavBar spaced teacher />
		<div class=" container mx-auto w-[70vw]">
			<div class="flex flex-1 py-[2vw] text-white">
				<div
					class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[1.5vw] shadow-lg"
				>
					<h1 class=" text-[1.25vw]">ผู้เรียนที่เข้าใช้งานวันนี้</h1>
					<h1 class=" text-[3.25vw] font-extrabold">{activeUse}</h1>
				</div>
				<div
					class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[1.5vw] shadow-lg"
				>
					<h1 class=" text-[1.25vw]">ค่าเฉลี่ย CEFR ของนักเรียน</h1>
					<h1 class=" text-[3.25vw] font-extrabold">PRE-A1</h1>
				</div>
				<div
					class=" mr-[2vw] h-[10vw] w-1/3 rounded-[1.25vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[1.5vw] shadow-lg"
				>
					<h1 class=" text-[1.25vw]">นักเรียนทั้งหมด</h1>
					<h1 class=" text-[3.25vw] font-extrabold">{totalStudents}</h1>
				</div>
			</div>

			<div class="flex flex-1">
				<div
					class=" mr-[2vw] h-[28vw] w-1/3 overflow-scroll overflow-x-hidden rounded-[1.25vw] bg-white pb-[3vw] shadow-lg"
				>
					<h1 class=" px-[1vw] py-[1vw] text-[1.5vw] font-bold">Leader board</h1>

					<div class="flex h-full w-[100%] flex-col rounded-[2vw] bg-white font-bold">
						<div class="flex flex-col gap-[1vw] overflow-y-auto px-[0.8vw]">
							{#each leaderboard as user, index (index)}
								<!-- Somehow I have to specify the min height to fix the height -->
								<div
									style="background-image: url('{user.profile?.coverUrl ??
										'https://cdn.discordapp.com/attachments/842737146321174558/1124288705864155216/image.png'}');"
									class="flex h-[5.5vw] w-full flex-row items-center justify-between rounded-[1vw] bg-cover bg-center px-[1vw]"
								>
									<div class="flex h-full flex-row items-center gap-[0.5vw]">
										<div
											style="background-image: url('{user.profile?.imageUrl ??
												'https://cdn.discordapp.com/attachments/842737146321174558/1122773960019423262/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'}');"
											class="aspect-square h-[50%] rounded-full border-[0.05vw] border-white bg-cover bg-center"
										/>
										<div
											class="flex h-fit max-w-[10vw] items-center rounded-full bg-white px-[1vw] py-[0.3vw]"
										>
											<!-- Somehow putting text inside another layer of div make ellipsis works -->
											<div class="w-fit truncate whitespace-nowrap text-[0.7vw]">
												{user.profile?.fullname}
											</div>
										</div>
									</div>

									<div
										class="flex h-fit flex-row rounded-full bg-white px-[0.5vw] py-[0.3vw] text-[0.5vw]"
									>
										<svg
											class="w-[1vw]"
											viewBox="0 0 17 17"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M8.5 0L0 8.5L8.5 17L17 8.5L8.5 0ZM4.25 8.5L8.5 4.25L12.75 8.5L8.5 12.75L4.25 8.5Z"
												fill="url(#paint0_linear_1194_8403)"
											/>
											<defs>
												<linearGradient
													id="paint0_linear_1194_8403"
													x1="-0.159014"
													y1="0.160377"
													x2="11.0702"
													y2="20.3054"
													gradientUnits="userSpaceOnUse"
												>
													<stop stop-color="#C698FF" />
													<stop offset="1" stop-color="#6C80E8" />
												</linearGradient>
											</defs>
										</svg>
										<div
											class="ml-[0.3vw] bg-gradient-to-r from-[#C698FF] to-[#6C80E8] bg-clip-text text-[0.7vw] text-transparent"
										>
											{user.exp}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
				<div
					class=" mr-[2vw] h-[28vw] w-[44vw] rounded-[1.25vw] bg-white px-[1.5vw] pt-[1vw] shadow-lg"
				>
					<h1 class="text-[1.5vw]">Daily Learning Stats</h1>
					<div class="mt-[5vh] w-full">
						<Barchart activeUseToday={activeUse} />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
