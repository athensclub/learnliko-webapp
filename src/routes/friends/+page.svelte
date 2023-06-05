<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import userProfileImage from '$lib/images/sample_kid_image.png';

	let history: {
		role: 'user' | 'friend';
		text: string;
	}[] = [
		{ role: 'friend', text: 'Hello.' },
		{ role: 'user', text: 'Hello.' }
	];
	let message: string = '';

	const sendMessage = async function () {
		console.log(message);
		history = [...history, { role: 'user', text: message }];

		message = '';
	};
</script>

<div class="w-full h-full min-h-[100vh] bg-white">
	<Header />
	<!-- top spacing -->
	<div class="w-full h-[120px]" />

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

			<div
				class="flex flex-col items-center ml-4 w-[35vw] h-[60vh] bg-[#F5F5F5] rounded-2xl relative p-4 overflow-y-auto"
			>
				<div class="absolute top-4 flex flex-col bg-white w-[95%] px-4 py-2 rounded-lg">
					<div class="text-lg font-bold">Quest</div>
					<div>Ask your friend their favorite color</div>
				</div>

				<!-- spacing -->
				<div class="w-full h-[64px]" />

				{#each history as chat, index (index)}
					<div
						class={`flex flex-col px-4 w-full ${
							chat.role === 'user' ? 'items-end' : 'items-start'
						}`}
					>
						<div
							class={`flex pt-6 flex-row items-center  w-full ${
								chat.role === 'user' ? 'flex-row-reverse' : ''
							}`}
						>
							{#if chat.role === 'friend'}
								<div
									class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
									style="background-image: url('{userProfileImage}'), linear-gradient(#9BA1FD, #FFA7A7);"
								/>
							{/if}

							{#if chat.role === 'user'}
								<div
									class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
									style="background-image: url('{userProfileImage}');"
								/>
							{/if}

							<div class={`mx-3 bg-white py-2 px-5 rounded-xl`}>{chat.text}</div>
						</div>
					</div>
				{/each}

				<div class="absolute bottom-0 w-[95%] h-[48px] font-line-seed">
					<div class="flex flex-row">
						<input
							class="bg-white border border-black/[0.15] h-fit flex-1 text-lg rounded-3xl px-5 py-1"
							type="text"
							bind:value={message}
							on:keydown={(e) => {
								if (e.key == 'Enter') sendMessage();
							}}
						/>

						<button class="bg-black text-white py-1 px-3 rounded-xl ml-3" on:click={sendMessage}
							>Send</button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
