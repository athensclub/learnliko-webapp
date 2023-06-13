<script lang="ts">
	import { chat } from '$api/conversation';
	import { isGoalComplete } from '$api/friendConversation';
	import Header from '$lib/components/Header.svelte';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import friend1 from '$lib/images/kids1.jpg';
	import friend2 from '$lib/images/kids2.jpg';
	import type { ChatMessage } from '$lib/types/requests/chatCompletion';
	import NavBar from '$lib/components/navbar/NavBar.svelte';

	let history: {
		role: 'user' | 'friend';
		text: string;
	}[] = [{ role: 'friend', text: 'Hi everyone.' }];
	let message: string = '';
	let waitingForFriendResponse = false;
	let goalCompleted = false;

	// an array of chatGPT's history in raw data, used for chat completion
	const gptHistory: ChatMessage[] = [];

	const friendReply = async function () {
		waitingForFriendResponse = true;
		const botResponse = await chat(gptHistory);
		gptHistory.push({ role: 'assistant', content: botResponse });

		history = [
			...history,
			{
				role: 'friend',
				text: botResponse
			}
		];
		waitingForFriendResponse = false;
	};

	const sendMessage = async function () {
		history = [...history, { role: 'user', text: message }];
		gptHistory.push({ role: 'user', content: message });

		const promises: Promise<any>[] = [];

		if (!goalCompleted) {
			promises.push(
				isGoalComplete('Ask your friend their favorite color', message).then(
					(completed) => (goalCompleted = completed)
				)
			);
		}
		promises.push(friendReply());
		message = '';

		await Promise.all(promises);
	};

	/**
	 * ==================
	 * Initialization
	 * ==================
	 * */
	gptHistory.push({
		role: 'user',
		content: `Your role: I want you to act as a male student, you are friendly. You don't seem to expose yourself that much unless being ask. About yourself: Your name is Steve. You are from USA, Seattle, you are 12 years old. Your favorite color is Red.`
	});
</script>

<div class="w-[100vw] h-full min-h-[100vh] bg-[#F4F4F4] font-line-seed">
	<NavBar />

	<div
		class="fixed top-0 right-0 w-[23vw] h-[100vh] px-[2vw] py-[4vh] gap-[3.5vh] bg-white flex flex-col font-bold"
	>
		<div class="text-[2.7vw]">Friends</div>
		<button class="bg-[#D9D9D9] rounded-3xl text-[1.2vw] text-center w-full py-[6vh]">
			Play cross word with friends
		</button>

		<div class="flex flex-row w-full bg-[#F8F8F8] mt-3 p-3 rounded-xl items-center">
			<div
				class={`w-[3.6vw] h-[3.6vw] bg-center bg-cover rounded-full`}
				style="background-image: url('{userProfileImage}');"
			/>

			<div class="font-bold text-sm ml-2">Natsataporn M.</div>
		</div>
		<div class="flex flex-row w-full bg-[#F8F8F8] mt-3 p-3 rounded-xl items-center">
			<div
				class={`w-[3.6vw] h-[3.6vw] bg-center bg-cover rounded-full`}
				style="background-image: url('{friend2}');"
			/>

			<div class="font-bold text-sm ml-2">Vorada T.</div>
		</div>
		<div class="flex flex-row w-full bg-[#F8F8F8] mt-3 p-3 rounded-xl items-center">
			<div
				class={`w-[3.6vw] h-[3.6vw] bg-center bg-cover rounded-full`}
				style="background-image: url('{friend1}');"
			/>

			<div class="font-bold text-sm ml-2">Phumpat S.</div>
		</div>
	</div>

	<!-- Top spacing -->
	<div class="w-full h-[5vh]" />

	<div
		class="flex mx-auto flex-col items-center justify-between w-[40vw] h-[90vh] bg-white rounded-3xl relative"
	>
		<div
			style="box-shadow: 0px 4px 30px 0px #00000040;"
			class="absolute top-[2vh] flex flex-col bg-white w-[95%] px-[2vw] py-[1vh] rounded-xl"
		>
			<div class="text-lg font-bold">Quest</div>
			<div>Ask your friend their favorite color</div>

			<h3 class=" absolute top-1 right-4">{goalCompleted ? '✅ completed' : 'in progress'}</h3>
		</div>

		<div class="w-full mt-[15vh] overflow-y-auto">
			{#each history as chat, index (index)}
				<div class={`flex flex-row px-4 w-full items-center`}>
					<div
						class={`flex pt-3 flex-row items-center  w-full ${
							chat.role === 'user' ? 'flex-row-reverse' : ''
						}`}
					>
						{#if chat.role === 'friend'}
							<div
								class={`w-[3.6vw] h-[3.6vw] bg-center bg-cover rounded-full`}
								style="background-image: url('{friend2}'), linear-gradient(#9BA1FD, #FFA7A7);"
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
		</div>

		<div class="w-[95%] h-[48px] font-line-seed mb-4">
			<h4
				class={`text-gray-700 transition-opacity ${
					waitingForFriendResponse ? 'opacity-100' : 'opacity-0'
				}`}
			>
				your friend is typing...
			</h4>

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

<!-- <div class="w-full h-full min-h-[100vh] bg-white">
	<Header />

	<div class="w-full h-[120px]" />

	<div class="flex flex-col w-full font-line-seed">
		<div class="mx-auto font-bold text-2xl">🤗Friends Space</div>

		<div class="flex flex-row mt-6 mx-auto">
			<div class="flex flex-col w-[22vw] h-[60vh] bg-[#F5F5F5] rounded-2xl p-4 overflow-y-auto">
				<div class="font-bold text-3xl">Friends</div>

				<div class="flex flex-row w-full bg-white mt-3 p-3 rounded-xl items-center">
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>

					<div class="font-bold text-sm ml-2">Natsataporn M.</div>

				</div>
				<div class="flex flex-row w-full bg-white mt-3 p-3 rounded-xl items-center">
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{friend2}');"
					/>

					<div class="font-bold text-sm ml-2">Vorada T.</div>

				</div>
				<div class="flex flex-row w-full bg-white mt-3 p-3 rounded-xl items-center">
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{friend1}');"
					/>

					<div class="font-bold text-sm ml-2">Phumpat S.</div>

				</div>
			</div>

			<div
				class="flex flex-col items-center justify-between ml-4 w-[35vw] h-[60vh] bg-[#F5F5F5] rounded-2xl relative p-4"
			>
				<div class="absolute top-4 flex flex-col bg-white w-[95%] px-4 py-2 rounded-lg shadow-md">
					<div class="text-lg font-bold">Quest</div>
					<div>Ask your friend their favorite color</div>

					<h3 class=" absolute top-1 right-4">{goalCompleted ? '✅ completed' : 'in progress'}</h3>
				</div>

				<div class="w-full mt-[80px] overflow-y-auto">
					{#each history as chat, index (index)}
						<div
							class={`flex flex-col px-4 w-full ${
								chat.role === 'user' ? 'items-end' : 'items-start'
							}`}
						>
							{#if chat.role === 'friend'}
								<div
									class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
									style="background-image: url('{friend2}'), linear-gradient(#9BA1FD, #FFA7A7);"
								/>
							{/if}

							{#if chat.role === 'user'}
								<div
									class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
									style="background-image: url('{userProfileImage}');"
								/>
							{/if}
							<div
								class={`flex pt-3 flex-row items-center  w-full ${
									chat.role === 'user' ? 'flex-row-reverse' : ''
								}`}
							>
								<div class={`mx-3 bg-white py-2 px-5 rounded-xl`}>{chat.text}</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="w-[95%] h-[48px] font-line-seed mb-4">
					<h4
						class={`text-gray-700 transition-opacity ${
							waitingForFriendResponse ? 'opacity-100' : 'opacity-0'
						}`}
					>
						your friend is typing...
					</h4>

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
</div> -->
