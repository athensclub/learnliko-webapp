<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import profileImage from '$lib/images/sample_kid_image.png';

	let name = 'Natsataporn M.';
</script>

<div class="w-full h-full">
	<Header />

	<div class="flex flex-row w-fit mt-24 justify-between mx-auto gap-10 font-line-seed h-[75vh]">
		<div class="flex h-full flex-col items-center justify-between">
			<div class="flex flex-col items-center">
				<div
					class="bg-center bg-cover w-[24vh] h-[24vh] rounded-[40px]"
					style="background-image: url('{profileImage}');"
				/>

				<div
					class="flex flex-col w-full bg-[#F6F6F6] mt-8 px-3 py-4 rounded-2xl font-bold text-lg border border-black/[0.15]"
				>
					{name}
					<div class="mt-4 text-base bg-[#9BA1FD] text-white w-fit px-3 py-1 rounded-3xl">
						Level A1
					</div>
				</div>
			</div>

            <div class="flex flex-col w-full">
                <button class="text-sm font-bold border border-black/[0.15] py-2 rounded-3xl">
                    Change Password
                </button>
            </div>
		</div>
	</div>
</div>
