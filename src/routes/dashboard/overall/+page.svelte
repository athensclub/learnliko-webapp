<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import Barchart from '$lib/components/Barchart.svelte';

	let activeUse = 64;
	let averageCEFR = 'A1';
	let totalStudents = 150;

	let leaderboard = [
		{
			username: 'Natsataporn M.',
			exp: 30,
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349468247068764/image.png',
			background:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124347122121195590/image.png'
		},
		{
			username: 'Natsataporn M.',
			exp: 25,
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124347056245452830/image.png'
		},
		{
			username: 'Natsataporn M.',
			exp: 25,
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124347056245452830/image.png'
		},
		{
			username: 'Natsataporn M.',
			exp: 25,
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124347056245452830/image.png'
		},
		{
			username: 'Natsataporn M.',
			exp: 25,
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124347056245452830/image.png'
		},
	];
</script>


<div class="flex w-full flex-row bg-[#F4F4F4] font-line-seed">
	<NavBar spaced teacher />
	<div class=" container w-[80vw] ml-[2vw]">
		<div class="flex flex-1 justify-center p-[2vw]">
			<div class=" mr-[2vw] h-[10vw] w-[20vw] rounded-[1.25vw] bg-white p-[1.5vw]">
				<h1>Today Use</h1>
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
			<div class=" mr-[2vw] h-[28vw] pb-[3vw] w-[20vw] rounded-[1.25vw] bg-white overflow-scroll overflow-x-hidden">
				<h1 class=" text-[1.5vw] px-[1vw] py-[1vw]">Leader board</h1>

				<div class="w-[100%] h-full bg-white rounded-[2vw] flex flex-col font-bold">
				
					<div class="flex flex-col px-[0.8vw] gap-[1vw] overflow-y-auto">
						{#each leaderboard as user, index (index)}
							<!-- Somehow I have to specify the min height to fix the height -->
							<div
								style="background-image: url('{user.background}');"
								class="w-full h-[5.5vw]  px-[1vw] bg-cover bg-center rounded-[1vw] flex flex-row items-center justify-between"
							>
								<div class="flex flex-row items-center gap-[0.5vw] h-full">
									<div
										style="background-image: url('{user.profileImage}');"
										class="h-[50%] aspect-square bg-cover bg-center rounded-full border-[0.05vw] border-white"
									/>
									<div
										class="h-fit max-w-[10vw] px-[1vw] py-[0.3vw] bg-white flex items-center rounded-full"
									>
										<!-- Somehow putting text inside another layer of div make ellipsis works -->
										<div class="w-fit truncate text-[0.7vw] whitespace-nowrap">
											{user.username}
										</div>
									</div>
								</div>
		
								<div class="flex flex-row h-fit bg-white rounded-full text-[0.5vw] px-[0.5vw] py-[0.3vw]">
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
										class="ml-[0.3vw] bg-clip-text text-transparent bg-gradient-to-r from-[#C698FF] to-[#6C80E8]"
									>
										{user.exp}
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class=" mr-[2vw] h-[28vw] w-[42vw] rounded-[1.25vw] bg-white p-[1.5vw]  ">
				<h1 class="text-[2vw]">Daily Learning Stats</h1>
				<div class="mt-[5vw] w-full">
				<Barchart></Barchart> </div>
			</div>
		</div>
		
	</div>
</div>
