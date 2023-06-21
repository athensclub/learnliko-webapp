<script lang="ts">
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import { chatContext } from '$lib/global/chatbox';
	import { maxDialogueCount, saveCurrentConversation } from '$lib/global/conversation';
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
	import { getPretestQuestionGroup, getPretestQuizAnswer } from '$api/pretest';
	import PretestQuizAnsweredModal from '$lib/components/modals/PretestQuizAnsweredModal.svelte';
	import type { Context } from 'svelte-simple-modal';

	let items: PretestItem[] | null = null;

	let currentLevel: PretestCEFRLevel = 'pre-A1';

	const { open, close }: Context = getContext('simple-modal');
	// initialization
	onMount(async () => {
		$saveCurrentConversation = false;
		$maxDialogueCount = 1;

		items = await getPretestQuestionGroup(currentLevel);
	});

	let currentItem = 0;
	const nextItem = () => {
		currentItem = currentItem + 1;
	};

	$: item = items ? items[currentItem] : null;
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
				}
			},
			{ closeButton: false, closeOnEsc: false, closeOnOuterClick: false }
		);
	};
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-col font-line-seed">
	<div
		class={`w-full flex flex-row gap-[4vw] justify-between items-center fixed top-0 left-0 bg-white px-[2vw] ${
			$isMobile ? 'h-[13vw]' : ' h-[5.5vw]'
		}`}
	>
		<div
			class={`flex flex-row h-full font-extrabold items-center ${
				$isMobile ? 'text-[4vw]' : 'text-[2vw]'
			}`}
		>
			<img class="h-[60%] object-contain mr-[2vw]" src={icon} alt="Learnliko" />
			Pre-test
		</div>

		<div class="flex-1 h-[60%] rounded-full bg-[#F4F4F4] overflow-hidden">
			<div
				style="width: {items ? (currentItem / items.length) * 100 : 0}%;"
				class="h-full bg-gradient-to-r from-[#C698FF] to-[#FFD281] rounded-full transition-size"
			/>
		</div>
	</div>

	<!-- Top spacing -->
	<div class={`w-full ${$isMobile ? 'h-[9vh]' : 'h-[18vh]'}`} />

	{#if item?.conversation}
		<div class={`font-bold mx-auto ${$isMobile ? 'text-[6vw]' : 'text-[1.75vw]'}`}>
			ฟังสิ่งที่เพื่อนเอไอถามและตอบคำถาม
		</div>

		<div
			class={`mx-auto relative ${
				$isMobile ? 'w-[90vw] h-[80vh] mt-[2vh]' : 'w-[50vw] h-[60vh] mt-[6vh]'
			}`}
		>
			<ConversationView
				onFinishClicked={nextItem}
				class="bg-white rounded-[2vw] px-[6vw]"
				initializingClass="bg-white"
				finishButtonClass="border-black"
				recorderClass={`bg-[#6C80E8] ${$isMobile ? 'w-[90%]' : 'w-[50%]'}`}
			/>
		</div>
	{:else if item?.imageMatching}
		<div class={`font-bold mx-auto ${$isMobile ? 'text-[6vw]' : 'text-[1.75vw]'}`}>
			เลือกคำศัพท์ที่ตรงกับรูปภาพ
		</div>

		<ImageMatchingQuizView submit={submitAnswer} item={item.imageMatching} />
	{:else if item?.fillInTheBlank}
		<div class={`font-bold mx-auto ${$isMobile ? 'text-[6vw]' : 'text-[1.75vw]'}`}>
			เติมคำในช่องว่าง
		</div>

		<FillInTheBlankQuizView submit={submitAnswer} item={item.fillInTheBlank} />
	{/if}
</div>
