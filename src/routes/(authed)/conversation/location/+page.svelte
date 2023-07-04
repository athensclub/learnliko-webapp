<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';

	let locations = [
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: true
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		},
		{
			name: 'Dining Room',
			image:
				'https://media.discordapp.net/attachments/1087307553471463514/1118398197191151687/vi_meeting_room_background_3d_stylize_76f8485f-1e5c-4370-8667-8cd7384a171f.png?width=1170&height=1170',
			price: 330,
			unlocked: false
		}
	];
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced />

	<div class="flex flex-col flex-1 px-[3vw] py-[2vh]">
		<div class="font-bold text-[2.5vw]">Location</div>

		<div class="grid grid-cols-3 gap-[2vw] mt-[4vh]">
			{#each locations as location, index (index)}
				<div
					style="background-image: url('{location.image}');"
					class="w-full aspect-square bg-cover bg-center rounded-[2vw] flex flex-col justify-end overflow-hidden"
				>
					<div
						class="w-full h-[40%] z-[1] backdrop-blur-sm bg-[#00000040] flex flex-col justify-center items-center text-white"
					>
						<div class="text-[1.6vw]">{location.name}</div>

						<button
							disabled={location.unlocked}
							class={`px-[2vw] py-[0.35vw] rounded-full mt-[1.5vw] text-[1.2vw] ${
								location.unlocked ? 'border border-white text-white' : 'bg-white text-black'
							}`}
						>
							{location.unlocked ? 'Unlocked' : `🧿${location.price}`}
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
