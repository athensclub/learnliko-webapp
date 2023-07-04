<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { isMobile } from '$lib/global/breakpoints';

	let characters = [
		{
			name: 'Lisa',
			role: 'Marketing Manager',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122117184529895424/vi_potrait_full_body_3d_avatar_girl_stylize_smile_b891a33b-0f46-4270-9ad8-ecca245d8e9e.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Jane',
			role: 'Marketing Director',
			background: '#454A6A',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122116800650416169/vi_potrait_full_body_3d_avatar_english_teacher_woman_stylize_sm_2e959fe0-3712-45d9-b71d-f3b41bca910a.png',
			price: 330,
			unlocked: false
		},
		{
			name: 'Alex',
			role: 'Student',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122116801015324723/vi_potrait_full_body_3d_avatar_boy_stylize_smile_4da8e0bf-3f56-49a9-8659-092485b32608.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Betty',
			role: 'Detective',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122117184102088704/vi_potrait_full_body_3d_avatar_girl_stylize_smile_3b2be129-f664-4e51-b5bc-c1b4b3ddab16.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Tom',
			role: 'Student',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122116803322187827/vi_potrait_full_body_3d_avatar_boy_stylize_smile_a3c783fb-c9f5-4dd8-b2bd-659ae7580ddd.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Sam',
			role: 'Police Officer',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122116802529472562/vi_full_body_3d_avatar_digital_artist_man_stylize_smile_77047114-dfb7-4806-a97f-802f2aa66214.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Betty',
			role: 'Actor',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122116802944704552/vi_potrait_full_body_3d_avatar_girl_stylize_smile_9890cfd4-2f2c-4341-95d7-7a9545d332a8.png',
			price: 330,
			unlocked: true
		},
		{
			name: 'Emma',
			role: 'Traveler',
			background: '#F59D95',
			avatar:
				'https://cdn.discordapp.com/attachments/1120787872379842711/1122116801615114290/vi_potrait_full_body_3d_avatar_girl_traveler_stylize_smile_0cfb7d3c-f27d-4c75-8f7f-47f729f11eee.png',
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
					style="background-image: url('{character.avatar}');"
					class="w-full overflow-hidden bg-center bg-cover flex flex-col justify-end relative h-[30vw] rounded-[2vw]"
				>
					<!-- <img
						class="absolute z-0 bottom-0 left-[50%] translate-x-[-50%] max-h-full"
						src={character.avatar}
						alt="avatar"
					/> -->

					<div
						class="w-full h-[40%] z-[1] backdrop-blur-sm bg-[#00000040] flex flex-col justify-center items-center text-white"
					>
						<div class="text-[1.6vw]">{character.name}</div>
						<div class="mt-[0.5vw] text-[1vw] text-[#FFFFFFE5]">{character.role}</div>

						<button
							disabled={character.unlocked}
							class={`px-[2vw] py-[0.35vw] rounded-full mt-[1.5vw] text-[1.2vw] ${
								character.unlocked ? 'border border-white text-white' : 'bg-white text-black'
							}`}
						>
							{character.unlocked ? 'Unlocked' : `🧿${character.price}`}
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
