<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import userProfileImage from '$lib/images/sample_kid_image.png';
</script>

<div class="w-full h-full min-h-[100vh] bg-white">
	<Header />
	<!-- top spacing -->
	<div class="w-full h-[100px]" />

	<div class="flex flex-col w-full font-line-seed">
		<div class="mx-auto font-bold text-2xl">Friends Space</div>

		<div class="flex flex-row mt-8 mx-auto">
			<div class="flex flex-col w-[22vw] h-[60vh] bg-[#F5F5F5] rounded-2xl p-4 overflow-y-auto">
				<div class="font-bold text-3xl">Friends</div>

				<!-- TODO: use db data -->
				<div class="flex flex-row w-full bg-white mt-3 p-3 rounded-xl items-center">
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>

					<div class="font-bold text-sm ml-2">Natsataporn M.</div>

					<div class="bg-black text-white py-1 px-4 text-sm rounded-lg ml-2">A1</div>
				</div>
				<div class="flex flex-row w-full bg-white mt-3 p-3 rounded-xl items-center">
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>

					<div class="font-bold text-sm ml-2">Natsataporn M.</div>

					<div class="bg-black text-white py-1 px-4 text-sm rounded-lg ml-2">A1</div>
				</div>
				<div class="flex flex-row w-full bg-white mt-3 p-3 rounded-xl items-center">
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>

					<div class="font-bold text-sm ml-2">Natsataporn M.</div>

					<div class="bg-black text-white py-1 px-4 text-sm rounded-lg ml-2">A1</div>
				</div>
			</div>

			<div class="flex flex-col ml-4 w-[35vw] h-[60vh] bg-[#F5F5F5] rounded-2xl p-4" />
		</div>
	</div>
</div>
