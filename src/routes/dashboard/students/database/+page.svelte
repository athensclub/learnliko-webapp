<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import Barchart from '$lib/components/Barchart.svelte';

	let activeUse = 64;
	let averageCEFR = 'A1';
	let totalStudents = 150;

	let leaderboard = [
		{
			username: 'Natsataporn Mascharat',
			exp: 'Pre-A1',
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349468247068764/image.png',
			background:
				'https://media.discordapp.net/attachments/1120787872379842711/1126187400943644712/image.png'
		},
		{
			username: 'Natsataporn Mascharat',
			exp: 'Pre-A1',
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
			'https://media.discordapp.net/attachments/1120787872379842711/1126187400943644712/image.png'
		},
		{
			username: 'Natsataporn Mascharat',
			exp: 'Pre-A1',
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
			'https://media.discordapp.net/attachments/1120787872379842711/1126187400943644712/image.png'
		},
		{
			username: 'Natsataporn Mascharat',
			exp: 'Pre-A1',
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
			'https://media.discordapp.net/attachments/1120787872379842711/1126187400943644712/image.png'
		},
		{
			username: 'Natsataporn Mascharat',
			exp: 'Pre-A1',
			profileImage:
				'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
			background:
			'https://media.discordapp.net/attachments/1120787872379842711/1126187400943644712/image.png'
		}
	];
</script>

<div class="flex w-full flex-row bg-[#F4F4F4] font-line-seed">
	<NavBar spaced teacher />

	<div
		class="mt-[3vw] h-[38vw] w-[70vw] mx-auto overflow-scroll overflow-x-hidden rounded-[1.25vw] bg-white pb-[3vw] shadow-lg"
	>
		<h1 class=" px-[1vw] py-[1vw] text-[1.5vw] font-bold">Classroom1</h1>

		<div class="flex h-full w-[100%] flex-col rounded-[2vw] bg-white font-bold">
			<div class="flex flex-col gap-[1vw] overflow-y-auto px-[0.8vw]">
				{#each leaderboard as user, index (index)}
					<!-- Somehow I have to specify the min height to fix the height -->
					<div
						style="background-image: url('{user.background}');"
						class="flex h-[5.5vw] w-full flex-row items-center justify-between rounded-[1vw] bg-cover bg-center px-[1vw]"
					>
						<div class="flex h-full flex-row items-center gap-[0.5vw]">
							<div
								style="background-image: url('{user.profileImage}');"
								class="aspect-square h-[50%] rounded-full border-[0.05vw] border-white bg-cover bg-center"
							/>
							<div
								class="flex h-fit max-w-[25vw] items-center rounded-full bg-white px-[1vw] py-[0.3vw]"
							>
								<!-- Somehow putting text inside another layer of div make ellipsis works -->
								<div class="w-fit truncate whitespace-nowrap text-[1vw]">
									{user.username}
								</div>
							</div>
						</div>

						<div
							class="flex h-fit flex-row rounded-full bg-white px-[0.5vw] py-[0.3vw] text-[0.5vw]"
						>
					
						
							<div
								class="ml-[0.3vw] bg-gradient-to-r from-[#C698FF] to-[#6C80E8] bg-clip-text text-[0.7vw] text-transparent"
							>
								CEFR {user.exp}
							</div>
						</div>
						<h1 class="text-[1vw] text-white  underline">view profile</h1>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
