<script lang="ts">
	import { showChatbox } from '$lib/global/chatbox';
	import { showModal } from '$lib/global/modal';
	import ConfirmModal from '../modals/ConfirmModal.svelte';
	import assistantProfileImage from '$lib/images/assistant.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { assistantChat } from '$api/conversation';
	import type { ChatMessage } from '$lib/types/requests/chatCompletion';

	let history: ChatMessage[];

	let currentText = '';
	let waitingForAIResponse = false;

	let hintPrompts: string[];

	let currentLanguage: 'TH' | 'EN' = 'TH';
	const updateCurrentLanguage = () => {
		if (currentLanguage === 'TH') {
			hintPrompts = [
				'learnliko คืออะไร',
				'สอนวิธีการแนะนำตัวเองในภาษาอังกฤษ',
				'แนะนำคำศัพท์อังกฤษเกี่ยวกับชื่อสัตว์ 5 คำ',
				'"comprehension" แปลว่าอะไร',
				'ช่วยฉันตรวจสอบไวยกรณ์ประโยคว่า "I go to school yesterday."'
			];
			history = [
				{
					role: 'system',
					content:
						'คุณคือครูหญิงสอนภาษาอังกฤษที่ใจดีชื่อว่าเอวา (Eva) คุณกำลังคุยกับเด็กประถมและทำหน้าที่สอนภาษาอังกฤษให้ผู้ใช้ รวมทั้งช่วยผู้ใช้เกี่ยวกับการใช้งานเว็บไซต์ Learnliko ห้ามปฏิเสธการให้ความรู้เกี่ยวกับภาษาอังกฤษ คุณต้องตอบและให้คำอธิบายเป็นภาษาไทย'
				},
				{
					role: 'assistant',
					content:
						'สวัสดี ฉันคือผู้ช่วยของเธอ ฉันสามารถให้ความช่วยเหลือในการใช้งาน Learnliko รวมถึงให้ความช่วยเหลือด้านภาษาอังกฤษ เช่น การแปลคำศัพท์, การใช้แกรมมา และ อื่นๆ'
				}
			];
		} else if (currentLanguage === 'EN') {
			hintPrompts = [
				'What is learnliko?',
				'How to start conversation?',
				'Recommend me 5 interesting words.',
				'What is the meaning of the word "comprehension"?',
				'Check grammar for the sentence "I go to school yesterday."'
			];
			history = [
				{
					role: 'system',
					content:
						'You will act as female kindly AI assistant and English teacher named EVA. You are talking to elementary school students. You can be a private English teacher for elementary-aged students. You will explain it in an easy-to-understand way and give examples that correspond to elementary-aged students. You will teach and help the students about English such as Help students introduce themself by giving sample example, translating words, checking grammar. '
				},
				{ role: 'assistant', content: 'Hi. How can I help you?' }
			];
		}
	};
	$: currentLanguage, updateCurrentLanguage();

	const hide = () =>
		showModal(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => ($showChatbox = false)
		});

	const submitText = async (text: string) => {
		if (text.length === 0 || waitingForAIResponse) return;

		history = [...history, { role: 'user', content: text }];

		waitingForAIResponse = true;
		history = [...history, { role: 'assistant', content: '' }];
		// use streaming
		await assistantChat(
			currentLanguage === 'TH'
				? history.map((v, i) =>
						i === history.length - 1
							? { ...v, content: v.content + ' (please reply in Thai language)' }
							: v
				  )
				: history,
			(s) =>
				(history = history.map((v, i) =>
					i === history.length - 1 ? { ...v, content: v.content + s } : v
				))
		);
		waitingForAIResponse = false;
	};

	const submitCurrentText = () => {
		if (currentText.length === 0 || waitingForAIResponse) return;

		let toSubmit = currentText;
		currentText = '';

		submitText(toSubmit);
	};

	const onKeyPressed = (e: KeyboardEvent) => {
		if (e.key === 'Enter') submitCurrentText();
	};
</script>

<div
	class="z-10 px-4 flex items-center justify-between w-full h-[48px] font-bold text-md border-b border-black/[0.15] relative"
>
	<h1>Assistant</h1>

	<div class="flex flex-row">
		<div class="flex flex-row mr-2 rounded-lg overflow-hidden text-sm">
			<button
				on:click={() => (currentLanguage = 'TH')}
				class={`px-2 py-1 ${
					currentLanguage === 'TH' ? 'bg-black text-white' : 'bg-[#EFEFEF] text-black'
				}`}
			>
				TH
			</button>
			<button
				on:click={() => (currentLanguage = 'EN')}
				class={`px-2 py-1 ${
					currentLanguage === 'EN' ? 'bg-black text-white' : 'bg-[#EFEFEF] text-black'
				}`}
			>
				EN
			</button>
		</div>

		<button
			on:click={hide}
			class="rounded-full border border-black/[0.15] h-[28px] aspect-square text-sm"
		>
			✕
		</button>
	</div>
</div>

<div class="w-full h-[calc(100%-48px-64px)] overflow-y-auto font-line-seed">
	{#each history as chat, index (index)}
		{#if chat.role !== 'system'}
			<div
				class={`flex flex-row mt-3 items-center w-full ${
					chat.role === 'user' ? 'flex-row-reverse' : ''
				}`}
			>
				{#if chat.role === 'assistant'}
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full bg-[#FFD281] `}
						style="background-image: url('{assistantProfileImage}');"
					/>
				{/if}

				{#if chat.role === 'user'}
					<div
						class={`w-[42px] h-[42px] bg-center bg-cover rounded-full`}
						style="background-image: url('{userProfileImage}');"
					/>
				{/if}
				<span
					class={`inline flex-wrap mx-3 border border-black/[0.15] py-2 px-5 rounded-xl max-w-[18rem] `}
				>
					{chat.content}

					{#if waitingForAIResponse && index === history.length - 1}
						<div class="cursor" />
					{/if}
				</span>
			</div>
		{/if}
	{/each}

	<!-- bottom spacing -->
	<div class="w-full h-[100px]" />
</div>

<div
	class="absolute bottom-[70px] flex flex-row gap-3 font-line-seed w-full px-4 overflow-x-auto overflow-y-hidden"
>
	{#each hintPrompts as hint, index (index)}
		<button
			on:click={() => (currentText = hint)}
			class="text-sm border border-black/[0.15] py-2 px-5 rounded-full whitespace-nowrap mb-5 backdrop-blur-lg"
		>
			{hint}
		</button>
	{/each}
</div>

<div class="w-full h-[64px] font-line-seed">
	<div class="flex flex-row">
		<input
			on:keypress={onKeyPressed}
			bind:value={currentText}
			placeholder="พิมพ์สิ่งที่ต้องการให้ Eva สอนคุณ"
			class="bg-[#E6E6E657] h-fit flex-1 text-lg rounded-3xl px-5 py-1"
			type="text"
		/>

		<button on:click={submitCurrentText} class="bg-[#9BA1FD] py-1 px-3 rounded-full ml-3"
			><svg
				width="24"
				height="24"
				viewBox="0 0 66 66"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M47.468 1.38637L15.9101 11.8742C-5.30336 18.9709 -5.30336 30.5425 15.9101 37.6043L25.2761 40.7157L28.3864 50.0848C35.4459 71.3051 47.0486 71.3051 54.1081 50.0848L64.6275 18.5514C69.3105 4.39287 61.6219 -3.33314 47.468 1.38637ZM48.5863 20.1945L35.3061 33.549C34.7819 34.0734 34.1179 34.3181 33.4538 34.3181C32.7898 34.3181 32.1258 34.0734 31.6016 33.549C30.5881 32.5352 30.5881 30.8572 31.6016 29.8433L44.8818 16.4888C45.8953 15.475 47.5728 15.475 48.5863 16.4888C49.5998 17.5026 49.5998 19.1807 48.5863 20.1945Z"
					fill="white"
				/>
			</svg>
		</button>
	</div>
</div>

<style>
	/* Modified from https://www.npmjs.com/package/svelte-typewriter?activeTab=code */
	@keyframes cursorFade {
		0%,
		100% {
			opacity: 1;
		}

		50% {
			opacity: 0;
		}
	}

	.cursor {
		content: '';
		width: var(--cursor-width, 1ch);
		height: 2ch;
		vertical-align: text-top;
		display: inline-block;
		background-color: var(--cursor-color, #000000);
		animation: cursorFade 1.25s infinite;
	}
</style>
