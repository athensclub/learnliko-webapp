<script lang="ts">
	import { showChatbox } from '$lib/global/chatbox';
	import ConfirmModal from '../modals/ConfirmModal.svelte';
	import assistantProfileImage from '$lib/images/assistant.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { assistantChat } from '$api/conversation';
	import type { ChatMessage } from '$lib/types/requests/chatCompletion';
	import type { Context } from 'svelte-simple-modal';
	import { getContext } from 'svelte';

	let history: ChatMessage[];

	let currentText = '';
	let waitingForAIResponse = false;

	let hintPrompts: string[];

	let currentLanguage: 'TH' | 'EN' = 'TH';
	const updateCurrentLanguage = () => {
		if (currentLanguage === 'TH') {
			hintPrompts = [
				'learnliko คืออะไร',
				'สอนวิธีการแนะนำตัวเองเป็นภาษาอังกฤษ',
				'แนะนำคำศัพท์อังกฤษเกี่ยวกับชื่อสัตว์ 5 คำ',
				'"comprehension" แปลว่าอะไร',
				'ช่วยฉันตรวจสอบไวยกรณ์ประโยคว่า "I go to school yesterday."'
			];
			history = [
				{
					role: 'system',
					content:
						'You will act as a kind female AI assistant for the website named Learnliko. You are also a private English teacher named Eva. You are talking to elementary school students so you have to provide an explanation that are easy to understand for them. Expect your user to be Thai student so you have to teach them in Thai and provide examples in English.\n\n CONTEXT: Learnliko is an educational platform that uses artificial intelligence to teach English.'
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
						'You will act as a kind female AI assistant for the website named Learnliko. You are also a private English teacher named Eva. You are talking to elementary school students so you have to provide an explanation that are easy to understand for them. Expect your user to be Thai student so you have to teach them in Thai and provide examples in English.\n\n CONTEXT: Learnliko is an educational platform that uses artificial intelligence to teach English.'
				},
				{ role: 'assistant', content: 'Hi. How can I help you?' }
			];
		}
	};
	$: currentLanguage, updateCurrentLanguage();

	const { open }: Context = getContext('simple-modal');
	const hide = () =>
		open(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => ($showChatbox = false)
		});

	const submitText = async (text: string) => {
		if (text.length === 0 || waitingForAIResponse) return;

		history = [...history, { role: 'user', content: text }];

		waitingForAIResponse = true;
		history = [...history, { role: 'assistant', content: '' }];

		// exclude the last blank assistant that is added for streaming purpose.
		let historyToCall = history.slice(0, history.length - 1);
		if (currentLanguage === 'TH') {
			let last = historyToCall[historyToCall.length - 1];
			historyToCall[historyToCall.length - 1] = {
				...last,
				content: last.content + ''
			};
		}

		// use streaming
		await assistantChat(
			historyToCall,
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
	class="text-md relative z-10 flex h-[48px] w-full items-center justify-between border-b border-black/[0.15] px-4 font-bold"
>
	<h1>Assistant</h1>

	<div class="flex flex-row">
		<div class="mr-2 flex flex-row overflow-hidden rounded-lg text-sm">
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
			class="aspect-square h-[28px] rounded-full border border-black/[0.15] text-sm"
		>
			✕
		</button>
	</div>
</div>

<div class="h-[calc(100%-48px-64px)] w-full overflow-y-auto px-[2vw] font-line-seed">
	{#each history as chat, index (index)}
		{#if chat.role !== 'system'}
			<div
				class={`mt-3 flex w-full flex-row items-center ${
					chat.role === 'user' ? 'flex-row-reverse' : ''
				}`}
			>
				{#if chat.role === 'assistant'}
					<div
						class={`h-[42px] w-[42px] rounded-full bg-[#FFD281] bg-cover bg-center `}
						style="background-image: url('{assistantProfileImage}');"
					/>
				{/if}

				{#if chat.role === 'user'}
					<div
						class={`h-[42px] w-[42px] rounded-full bg-cover bg-center`}
						style="background-image: url('{userProfileImage}');"
					/>
				{/if}
				<span
					class={`mx-3 inline max-w-[18rem] flex-wrap rounded-xl border border-black/[0.15] px-5 py-2 `}
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
	<div class="h-[100px] w-full" />
</div>

<div
	class="absolute bottom-[70px] flex w-full flex-row gap-3 overflow-x-auto overflow-y-hidden px-4 font-line-seed"
>
	{#each hintPrompts as hint, index (index)}
		<button
			on:click={() => (currentText = hint)}
			class="mb-5 whitespace-nowrap rounded-full border border-black/[0.15] px-5 py-2 text-sm backdrop-blur-lg"
		>
			{hint}
		</button>
	{/each}
</div>

<div class="h-[64px] w-[90%] font-line-seed">
	<div class="flex flex-row">
		<input
			on:keypress={onKeyPressed}
			bind:value={currentText}
			placeholder="พิมพ์สิ่งที่ต้องการให้ Eva สอนคุณ"
			class="h-fit flex-1 rounded-3xl bg-[#E6E6E657] px-5 py-1 text-lg"
			type="text"
		/>

		<button on:click={submitCurrentText} class="ml-3 rounded-full bg-[#9BA1FD] px-3 py-1"
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
