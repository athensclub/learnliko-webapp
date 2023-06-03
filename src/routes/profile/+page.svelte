<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import chatBubbleImage from '$lib/images/chat_bubble_gradient.png';
	import blueBookImage from '$lib/images/blue_book.png';
	import profileImage from '$lib/images/sample_kid_image.png';
	import { queryLearningDiariesLocal } from '$lib/localdb/profileLocal';
	import { onMount } from 'svelte';
	import type { LearnedConversationItem, LearningDiaryItem } from '$lib/types/learningDiary';
	import ConversationCard from '$lib/components/ConversationCard.svelte';
	import { formatAMPM } from '$lib/utils/time';
	import { currentChatboxView, recapHistory, showChatbox } from '$lib/global/chatbox';
	import ReadMore from '$lib/components/ReadMore.svelte';

	let name = 'Natsataporn M.';
	let learningDiaries: LearningDiaryItem[] | null = null;

	let showingItem: LearningDiaryItem | null = null;

	const showItemRecap = (item: LearnedConversationItem) => {
		$recapHistory = item.recap;
		$currentChatboxView = 'RECAP';
		$showChatbox = true;
	};

	onMount(async () => {
		// TODO: implement db using actual database (cloud) and probably move this to ssr.
		learningDiaries = await queryLearningDiariesLocal();
		console.log(learningDiaries);
	});

	// combined vocabs from the selected diary item.
	$: vocabs = [
		...(showingItem?.learnedConversations.flatMap((item) => item.vocabs) ?? []),
		...(showingItem?.learnedReadings.flatMap((item) => item.vocabs) ?? [])
	];
</script>

<div class="w-full h-full">
	<Header />

	<div class="flex flex-row w-fit mt-[8vw] justify-between mx-auto gap-10 font-line-seed h-[75vh]">
		<div class="flex h-full flex-col items-center justify-between pt-4">
			<div class="flex flex-col items-center">
				<div
					class="bg-center bg-cover w-[24vh] h-[24vh] rounded-full"
					style="background-image: url('{profileImage}');"
				/>

				<div
					class="flex flex-col w-full bg-[#F6F6F6] mt-8 px-3 py-4 rounded-2xl font-bold text-lg border border-black/[0.15]"
				>
					{name}
					<div
						class="mt-4 text-base bg-gradient-to-r from-[#9BA1FD] to-[#FFABAB] text-white w-fit px-3 py-1 rounded-lg text-[1vw]"
					>
						CEFR Level: A1
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
				<!-- <div class="font-bold text-sm">📅 30 Days of Learning</div> -->
			</div>

			<div
				class="mt-3 w-full flex-1 flex flex-col overflow-y-auto bg-[#F6F6F6] rounded-3xl p-3 gap-4"
			>
				<div class="font-bold text-lg">📝 Learning Dairy</div>
				{#if showingItem}
					<div
						class="w-full h-full overflow-y-auto bg-white flex flex-col rounded-2xl font-bold p-3"
					>
						<button
							on:click={() => (showingItem = null)}
							class="flex flex-row w-fit bg-black text-white items-center justify-center text-sm px-2 py-1 rounded-2xl"
						>
							<svg
								class="w-3 mr-3"
								viewBox="0 0 25 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M24 9C24.5523 9 25 8.55228 25 8C25 7.44772 24.5523 7 24 7L24 9ZM0.292892 7.29289C-0.0976315 7.68342 -0.0976315 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM24 7L1 7L1 9L24 9L24 7Z"
									fill="white"
								/>
							</svg>

							Back
						</button>

						<div class="text-sm mt-3">
							{showingItem.date}
						</div>

						<div class="mt-5">
							{showingItem.title}
						</div>

						<div class="mt-5">Learned Vocabularies:</div>

						<!-- To make linter happy, vocabs should always exists in this scope -->
						{#if vocabs}
							<ul>
								{#each vocabs as word, index (word)}
									<li>{index + 1}. {word}</li>
								{/each}
							</ul>
						{/if}

						{#if showingItem.learnedConversations.length > 0}
							<div class="mt-5">Conversations:</div>

							{#each showingItem.learnedConversations as item (item.conversation.id)}
								<div class="flex flex-row mt-3">
									<ConversationCard extraSmall disabled conversation={item.conversation} />

									<div class="flex flex-col text-sm ml-5">
										<div>Played on {formatAMPM(item.finishedTime)}</div>

										<div class="mt-3">Goal: {item.conversation.details.learner.goal}</div>

										<div class="mt-3">
											<ReadMore
												textContent="Vocabularies: {item.vocabs.join(', ')}"
												maxChars={100}
											/>
										</div>

										<button
											on:click={() => showItemRecap(item)}
											class="mt-3 w-fit bg-[#D9D9D9] rounded-2xl py-1 px-4"
										>
											See Recap
										</button>
									</div>
								</div>
							{/each}
						{/if}

						{#if showingItem.learnedReadings.length > 0}
							<div class="mt-5">Reading Items:</div>

							{#each showingItem.learnedReadings as item (item.item.id)}
								<div class="flex flex-col text-sm mt-4">
									<div class="max-w-[40%] text-center">{item.item.blogName}</div>

									<div class="flex flex-row">
										<img
											class="rounded-xl mt-1 w-[13vw] h-[13vw]"
											src={item.item.image}
											alt={item.item.blogName}
										/>

										<div class="flex flex-col text-sm ml-5">
											<div>Played on {formatAMPM(item.finishedTime)}</div>

											<div class="mt-3">
												<ReadMore
													textContent="Vocabularies: {item.vocabs.join(', ')}"
													maxChars={100}
												/>
											</div>

											<a
												href="/read/{item.item.id}"
												class="mt-3 w-fit bg-[#D9D9D9] rounded-2xl py-1 px-4"
											>
												Read again
											</a>
										</div>
									</div>
								</div>
							{/each}
						{/if}
					</div>
				{:else if learningDiaries}
					{#each learningDiaries as diary (diary.date)}
						<div class="w-full bg-white h-fit flex flex-col rounded-2xl font-bold p-3">
							<div class="flex flex-row items-center justify-between">
								<div class="text-sm">{diary.date}</div>

								<button
									on:click={() => (showingItem = diary)}
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
								</button>
							</div>

							<div class="mt-5">
								{diary.title}
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<div class="flex flex-col h-full gap-[20px] pt-3">
			<a
				class="h-[calc(50%-10px)] aspect-square bg-[#F6F6F6] rounded-3xl border border-black/[0.15] font-bold flex flex-col items-center justify-center"
			>
				<img class="h-[70%]" src={chatBubbleImage} alt="Chat Bubble" />

				Conversation History
			</a>
			<a
				class="h-[calc(50%-10px)] aspect-square bg-[#F6F6F6] rounded-3xl border border-black/[0.15] font-bold flex flex-col items-center justify-center"
			>
				<img class="h-[70%]" src={blueBookImage} alt="Blue Book" />
				Reading History
			</a>
		</div>
	</div>
</div>
