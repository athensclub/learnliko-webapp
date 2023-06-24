<script lang="ts">
	import userProfileImage from '$lib/images/sample_kid_image.png';
</script>

<div
	class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row gap-[8vw] items-center justify-center font-line-seed"
>
	<div class="flex flex-col w-[45vw]">
		<div class="text-[2.2vw]">Recent logins</div>

		<div class="grid grid-cols-3 gap-[2vw] mt-[2vh]">
			<button class="w-full h-[20vw] bg-white rounded-[1vw] flex flex-col overflow-hidden">
				<div
					style="background-image: url('https://cdn.discordapp.com/attachments/1120787872379842711/1120788019725729893/vi_Robot_3d_stylize_37aff20f-f0d6-431b-98e8-facc9049f1f4.png');"
					class="w-full aspect-square bg-cover bg-center"
				/>
				<div
					class="w-full flex-1 flex items-center justify-center font-medium text-center text-[1.5vw]"
				>
					Simon
				</div>
			</button>
			<button class="w-full h-[20vw] bg-white rounded-[1vw] flex flex-col overflow-hidden">
				<div
					style="background-image: url('https://cdn.discordapp.com/attachments/1120787872379842711/1120788019725729893/vi_Robot_3d_stylize_37aff20f-f0d6-431b-98e8-facc9049f1f4.png');"
					class="w-full aspect-square bg-cover bg-center"
				/>
				<div
					class="w-full flex-1 flex items-center justify-center font-medium text-center text-[1.5vw]"
				>
					Simon
				</div>
			</button>
			<button class="w-full h-[20vw] bg-white rounded-[1vw] flex flex-col overflow-hidden">
				<div
					style="background-image: url('https://cdn.discordapp.com/attachments/1120787872379842711/1120788019725729893/vi_Robot_3d_stylize_37aff20f-f0d6-431b-98e8-facc9049f1f4.png');"
					class="w-full aspect-square bg-cover bg-center"
				/>
				<div
					class="w-full flex-1 flex items-center justify-center font-medium text-center text-[1.5vw]"
				>
					Simon
				</div>
			</button>
		</div>
	</div>

	<div class="bg-white flex flex-col w-[32vw] gap-[3vh] px-[2vw] py-[2vh] rounded-[1vw] shadow-md">
		<input
			class="w-full border border-[#DDDFE2] text-[1.7vw] px-[1vw] py-[1vh] rounded-[0.8vw]"
			placeholder="Username"
		/>
		<input
			class="w-full border border-[#DDDFE2] text-[1.7vw] px-[1vw] py-[1vh] rounded-[0.8vw]"
			placeholder="Password"
		/>
		<button class="w-full py-[1vh] bg-[#1877F2] text-white text-[1.7vw] font-bold">Login</button>
		<a href="#top" class="text-center text-[1.35vw] text-[#2E7DF2]">Forgotten password?</a>

		<!-- Divider -->
		<div class="w-full h-[0.15vh] bg-[#DADDE1]" />

		<button
			class="text-[1.7vw] bg-[#42B72A] text-white w-fit px-[2vw] py-[1vh] rounded-[0.5vw] mx-auto"
			>Create new account</button
		>
	</div>
</div>
