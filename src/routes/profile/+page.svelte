<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import chatBubbleImage from '$lib/images/chat_bubble_gradient.png';
	import blueBookImage from '$lib/images/blue_book.png';
	import profileImage from '$lib/images/sample_kid_image.png';

	let name = 'Natsataporn M.';
</script>

<div class="w-full h-full">
	<Header />

	<div class="flex flex-row w-fit mt-24 justify-between mx-auto gap-10 font-line-seed h-[75vh]">
		<div class="flex h-full flex-col items-center justify-between pt-4">
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

		<div class="flex h-full flex-col items-center w-[35vw]">
			<div class="flex flex-row w-full justify-between items-center">
				<div class="font-bold text-lg">👾 Learning Dairy</div>
				<div class="font-bold text-sm">📅 30 Days of Learning</div>
			</div>

			<div class="mt-3 w-full flex-1 flex flex-row overflow-y-auto bg-[#F6F6F6] rounded-3xl p-3">
				<div class="w-full bg-white h-fit flex flex-col rounded-2xl font-bold p-3">
					<div class="flex flex-row items-center justify-between">
						<div class="text-sm">17.05.2023</div>

						<a
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
						</a>
					</div>
					<div class="mt-5">
						You learn about How to purchase products in shop and learn new 10 vocabularies
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col h-full gap-[20px] pt-10">
			<a
				class="h-[calc(50%-10px)] aspect-square bg-[#F6F6F6] rounded-2xl border border-black/[0.15] font-bold flex flex-col items-center justify-center"
			>
				<img class="h-[70%]" src={chatBubbleImage} alt="Chat Bubble" />

				Conversation History
			</a>
			<a
				class="h-[calc(50%-10px)] aspect-square bg-[#F6F6F6] rounded-2xl border border-black/[0.15] font-bold flex flex-col items-center justify-center"
			>
				<img class="h-[70%]" src={blueBookImage} alt="Blue Book" />
				Reading History
			</a>
		</div>
	</div>
</div>
