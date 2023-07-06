<script lang="ts">
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import { chatContext } from '$lib/global/chatbox';
	import {
		conversationFinished,
		history,
		isCheckConversationGoal,
		isConversationFriendSpeakSlower,
		maxDialogueCount,
		saveCurrentConversation
	} from '$lib/global/conversation';
	import icon from '$lib/images/learnliko_icon.png';
	import type {
		FillInTheBlankMultipleChoicesQuestion,
		ImageMatchingMultipleChoicesQuestion,
		PretestCEFRLevel,
		PretestItem
	} from '$lib/types/pretest';
	import { getContext, onMount } from 'svelte';
	import ImageMatchingQuizView from './ImageMatchingQuizView.svelte';
	import FillInTheBlankQuizView from './FillInTheBlankQuizView.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { getPretestQuestionGroup } from '$api/pretest';
	import PretestQuizAnsweredModal from '$lib/components/modals/PretestQuizAnsweredModal.svelte';
	import type { Context } from 'svelte-simple-modal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { analyzeDialog, checkGoalProgress } from '$api/conversation';
	import { nextLevel, nextPretestLevel, previousPretestLevel } from '$lib/utils/cefr';
	import { getCurrentUserData, setupCurrentUserAccount } from '$lib/temp/user';
	import PretestFinishedModal from '$lib/components/modals/PretestFinishedModal.svelte';
	import userSession from '$lib/stores/userSession';
	import setupAccountInput from '../setupAccountInputStore';
	import Checkbox from '$lib/components/Checkbox.svelte';

	const GROUP_COUNT = 4;
	const QUESTIONS_PER_GROUP = 7;
	const TOTAL_QUESTIONS = GROUP_COUNT * QUESTIONS_PER_GROUP;

	// full score 100%: conversation 30%, writing 40%, vocabs 30%
	let currentScore = 0;

	let items: PretestItem[] | null = null;

	let currentLevel: PretestCEFRLevel = 'A1';

	const { open, close }: Context = getContext('simple-modal');
	// initialization
	onMount(async () => {
		$isCheckConversationGoal = false;
		$saveCurrentConversation = false;
		$maxDialogueCount = 1;

		items = await getPretestQuestionGroup(currentLevel);
	});

	let currentGroup = 0;
	let currentItem = 0;
	/**
	 * Note that we should always update score first before going to next item.
	 */
	const nextItem = async () => {
		if (!items) throw new Error('Call nextItem when items is null.');

		currentItem = currentItem + 1;
		// if end of current group
		if (currentItem - QUESTIONS_PER_GROUP * currentGroup >= items.length) {
			// set null to show loading
			items = null;

			// finish pretest
			if (currentGroup + 1 >= GROUP_COUNT) {
				if (currentScore < 80) currentLevel = previousPretestLevel(currentLevel);
				await setupCurrentUserAccount(
					currentLevel,
					$setupAccountInput.firstname!,
					$setupAccountInput.lastname!
				);

				const profileData = await getCurrentUserData();
				userSession.update({ accountData: profileData });

				open(
					PretestFinishedModal,
					{ level: currentLevel },
					{ closeButton: false, closeOnEsc: false, closeOnOuterClick: false }
				);
				return;
			}

			if (currentScore >= 80) {
				currentLevel = nextPretestLevel(currentLevel);
			} else {
				currentLevel = previousPretestLevel(currentLevel);
			}

			currentGroup = currentGroup + 1;
			currentScore = 0;
			items = await getPretestQuestionGroup(currentLevel);
		}
	};

	$: item = items ? items[currentItem % QUESTIONS_PER_GROUP] : null;
	const updateItem = () => {
		if (item?.conversation) {
			$chatContext = { conversation: item.conversation, bot: { emotion: 'neutral' } };
		}
	};
	$: item, updateItem();

	const submitAnswer = async (
		quiz: FillInTheBlankMultipleChoicesQuestion | ImageMatchingMultipleChoicesQuestion,
		userAnswer: number
	) => {
		open(
			PretestQuizAnsweredModal,
			{
				quiz,
				userAnswer,
				nextClicked: () => {
					close();
					nextItem();
				},
				onUserCorrect: () => {
					if (item?.fillInTheBlank) currentScore = currentScore + (1 / 3) * 40;
					else if (item?.imageMatching) currentScore = currentScore + (1 / 3) * 30;
				}
			},
			{ closeButton: false, closeOnEsc: false, closeOnOuterClick: false }
		);
	};

	let calculatingConversationScore = false;
	const updateConversationFinished = async () => {
		if ($conversationFinished) {
			calculatingConversationScore = true;

			const result = await analyzeDialog($history[0].transcription!, $history[1].transcription!);
			currentScore = currentScore + result.overallScore * 30;

			calculatingConversationScore = false;
		}
	};
	$: $conversationFinished, updateConversationFinished();
</script>

<div class="flex h-full min-h-[100vh] w-full flex-col bg-[#F4F4F4] font-line-seed">
	<div
		class={`fixed left-0 top-0 flex w-full flex-row items-center justify-between gap-[4vw] bg-white px-[2vw] ${
			$isMobile ? 'h-[13vw]' : ' h-[5.5vw]'
		}`}
	>
		<div
			class={`flex h-full flex-row items-center font-extrabold ${
				$isMobile ? 'text-[4vw]' : 'text-[2vw]'
			}`}
		>
			<img class="mr-[2vw] h-[60%] object-contain" src={icon} alt="Learnliko" />
			Pre-test
		</div>

		<div class="h-[60%] flex-1 overflow-hidden rounded-full bg-[#F4F4F4]">
			<div
				style="width: {(currentItem / TOTAL_QUESTIONS) * 100}%;"
				class="h-full rounded-full bg-gradient-to-r from-[#C698FF] to-[#FFD281] transition-size"
			/>
		</div>
	</div>

	<!-- Top spacing -->
	<div class={`w-full ${$isMobile ? 'h-[9vh]' : 'h-[18vh]'}`} />

	{#if item?.conversation}
		<div class={`mx-auto font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.75vw]'}`}>
			ฟังสิ่งที่เพื่อนเอไอถามและตอบคำถาม
		</div>

		<div
			class={`relative mx-auto ${
				$isMobile ? 'mt-[2vh] h-[80vh] w-[90vw]' : 'mt-[6vh] h-[60vh] w-[50vw]'
			}`}
		>
			<ConversationView
				allowHint={false}
				class="rounded-[2vw] bg-white px-[6vw]"
				initializingClass="bg-white"
				finishButtonClass="border-black"
				recorderClass={`bg-[#6C80E8] ${$isMobile ? 'w-[90%]' : 'w-[60%]'}`}
			>
				<div slot="finished" class="mt-4 flex w-full flex-col items-center text-center font-bold">
					{#if calculatingConversationScore}
						<div class="flex flex-row">
							Loading<Typewriter mode="loop">...</Typewriter>
						</div>
					{:else}
					ภารกิจการสนทนาสำเร็จ!

						<button
							on:click={nextItem}
							class={`mr-4 mt-3 w-fit rounded-lg border px-4 py-1 text-base font-normal`}
						>
							ดูคะแนนของคุณ
						</button>
					{/if}
				</div>
			</ConversationView>

			<div
				class="mt-[2vh] flex flex-row items-center justify-center gap-[1vw] text-[1.5vw] font-bold"
			>
				<Checkbox class="w-[2vw] rounded-[0.5vw]" bind:checked={$isConversationFriendSpeakSlower} />
				ให้ AI พูดช้าลง
			</div>
		</div>
	{:else if item?.imageMatching}
		<div class={`mx-auto font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.75vw]'}`}>
			เลือกคำศัพท์ที่ตรงกับรูปภาพ
		</div>

		<ImageMatchingQuizView submit={submitAnswer} item={item.imageMatching} />
	{:else if item?.fillInTheBlank}
		<div class={`mx-auto font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.75vw]'}`}>
			เติมคำในช่องว่าง
		</div>

		<FillInTheBlankQuizView submit={submitAnswer} item={item.fillInTheBlank} />
	{:else}
		<div class="mx-auto flex flex-row text-[2.5vw]">
			Loading. Please wait<Typewriter mode="loop">...</Typewriter>
		</div>
	{/if}
</div>
