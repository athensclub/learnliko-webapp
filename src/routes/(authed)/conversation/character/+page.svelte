<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { isMobile } from '$lib/global/breakpoints';

	let characters = [
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Jane',
			role: 'Marketing Director',
			background: '#454A6A',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1120275831030296706/image.png',
			price: 330,
			unlocked: false
		},
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/842737146321174558/1118642297882550302/avatar.png',
			price: 330,
			unlocked: true
		}
	];
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced />

	<div class="flex flex-col flex-1 px-[3vw] py-[2vh]">
		<div class="font-bold text-[2.5vw]">Character</div>

		<div class="grid grid-cols-3 gap-[2vw] mt-[4vh]">
			{#each characters as character, index (index)}
				<div
					style="background: {character.background}"
					class="w-full overflow-hidden flex flex-col justify-end relative h-[30vw] rounded-[2vw]"
				>
					<img
						class="absolute z-0 bottom-0 left-[50%] translate-x-[-50%] max-h-full"
						src={character.avatar}
						alt="avatar"
					/>

					<div
						class="w-full h-[40%] z-[1] backdrop-blur-sm bg-[#00000040] flex flex-col justify-center items-center text-white"
					>
						<div class="text-[1.6vw]">{character.name}</div>
						<div class="mt-[0.5vw] text-[1vw] text-[#FFFFFFE5]">{character.role}</div>

						<button
							disabled={character.unlocked}
							class={`px-[2vw] py-[0.35vw] rounded-full mt-[1.5vw] text-[1.2vw] ${
								character.unlocked ? 'bg-white text-black' : 'border border-white text-white'
							}`}
						>
							{character.unlocked ? `🧿${character.price}` : 'Unlocked'}
						</button>
					</div>
				</div>
			{/each}
		</div>
		<!-- <div class="w-[20vw] h-[50vh] rounded-[2vw] mt-[5vh] relative bg-white">
			<img
				class="w-auto h-auto max-w-full max-h-[90%] absolute bottom-0 left-[50%] translate-x-[-50%]"
				src="https://cdn.discordapp.com/attachments/842737146321174558/1116747283132842105/avatar.png"
				alt="avatar"
			/>
		</div> -->
	</div>
</div>
