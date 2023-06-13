<script lang="ts">
	import { chatContext, currentChatboxView, recapHistory, showChatbox } from '$lib/global/chatbox';
	import type { LearnedConversationItem, LearningDiaryItem } from '$lib/types/learningDiary';
	import { formatAMPM } from '$lib/utils/time';
	import ConversationCard from '../ConversationCard.svelte';
	import ReadMore from '../ReadMore.svelte';

	export let item: LearningDiaryItem;

	const showItemRecap = (item: LearnedConversationItem) => {
		$chatContext = { conversation: item.conversation, bot: { emotion: 'neutral' } };
		$recapHistory = item.recap;
		$currentChatboxView = 'RECAP';
		$showChatbox = true;
	};

	// combined vocabs from the selected diary item.
	$: vocabs = [
		...(item.learnedConversations.flatMap((it) => it.vocabs) ?? []),
		...(item.learnedReadings.flatMap((it) => it.vocabs) ?? [])
	];
</script>

<div
	class="w-full h-[70vh] overflow-y-auto bg-white flex flex-col rounded-3xl font-bold font-line-seed p-3"
>
	<div class="text-[1.5vw] mt-[4vh]">
		{item.date}
	</div>

	<div class="text-[1.7vw] mt-[5vh]">
		{item.title}
	</div>

	<div class="text-[1.7vw] mt-[5vh]">Learned Vocabularies:</div>

	<!-- To make linter happy, vocabs should always exists in this scope -->
	{#if vocabs}
		<ul>
			{#each vocabs as word, index (word)}
				<li class="text-[1.7vw]">{index + 1}. {word}</li>
			{/each}
		</ul>
	{/if}

	{#if item.learnedConversations.length > 0}
		<div class="text-[1.7vw] mt-[5vh]">Conversations:</div>

		{#each item.learnedConversations as it (it.conversation.id)}
			<div class="flex flex-row w-full mt-[3vh]">
				<ConversationCard class="w-[38%] aspect-[4/5]" disabled conversation={it.conversation} />

				<div class="flex flex-col w-[62%] text-[1.5vw] ml-[2vw]">
					<div>Played on {formatAMPM(it.finishedTime)}</div>

					<div class="mt-[3vh]">Goal: {it.conversation.details.learner.goal}</div>

					<div class="mt-[3vh]">
						<ReadMore textContent="Vocabularies: {it.vocabs.join(', ')}" maxChars={100} />
					</div>

					<button
						on:click={() => showItemRecap(it)}
						class="mt-[3vh] w-fit bg-[#000] rounded-full py-[1vh] px-[2vw] text-white"
					>
						See Recap
					</button>
				</div>
			</div>
		{/each}
	{/if}

	{#if item.learnedReadings.length > 0}
		<div class="mt-5">Reading Items:</div>

		{#each item.learnedReadings as it (it.item.id)}
			<div class="flex flex-col text-sm mt-4">
				<div class="max-w-[40%]">{it.item.blogName}</div>

				<div class="flex flex-row">
					<img
						class="rounded-xl mt-[1vh] w-[13vw] h-[13vw]"
						src={it.item.image}
						alt={it.item.blogName}
					/>

					<div class="flex flex-col text-sm ml-5">
						<div>Played on {formatAMPM(it.finishedTime)}</div>

						<div class="mt-[3vh]">
							<ReadMore textContent="Vocabularies: {it.vocabs.join(', ')}" maxChars={100} />
						</div>

						<a href="/read/{it.item.id}" class="mt-[3vh] w-fit bg-[#D9D9D9] rounded-2xl py-1 px-4">
							Read again
						</a>
					</div>
				</div>
			</div>
		{/each}
	{/if}
</div>
