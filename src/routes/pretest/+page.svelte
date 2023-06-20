<script lang="ts">
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import { chatContext } from '$lib/global/chatbox';
	import { saveCurrentConversation } from '$lib/global/conversation';
	import icon from '$lib/images/learnliko_icon.png';
	import type { PretestItem } from '$lib/types/pretest';
	import { onMount } from 'svelte';

	let items: PretestItem[] = [
		{
			fillInTheBlank: null,
			imageMatching: null,
			conversation: {
				background:
					'https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/e15c6e4b-b429-4fae-a68e-87e09c141af2_scaled.jpg',
				image:
					'https://media.discordapp.net/attachments/1087307553471463514/1103186216712671242/vi_A_girl_shopkeeper_profile_image_3d_stylelize_fortnite_48710422-4877-4262-95a2-66ddfd36ff9d.png?width=1357&height=1357',
				intro: 'Welcome to the coffee shop, I’m the Barista, What would you like to drink today?',
				topic: 'Welcome to the coffee shop',
				CEFRlevel: 'A2',
				details: {
					intro: 'Welcome to the coffee shop, What would you like to drink today?',
					learner: {
						goal: '1.Ask for drink you would like to order\n2.Order the drink\n3.Making a purchase'
					},
					bot: {
						avatar:
							'https://cdn.discordapp.com/attachments/842737146321174558/1116747283132842105/avatar.png',
						accent: 'US',
						gender: 'FEMALE',
						prompt:
							'Your role: You are a female barista at coffee shop, you are kind, and friendly. Your name is Lucy. Your Goal: You have to give customer an information about the drink available in you shop, the sell them to the customer. Answer Format: You have to answer in the JSON format by using to following JSON schema {// your response"message": string,// "neutral", "joy", "trust", "fear", "surprise", "sadness", "disgust", "anger", "anticipation""emotion": string,// the enum value// “NORMAL” used when the situation is normal// “INAPPROPRIATE” used when the situation is out of context or say something inappropriate// “END-OF-CONVERSATION” used when the customer have left or finish purchased your drink"status": string} Shop information: There are only Espresso cost 50฿, Cappuccino cost 40฿ and Matcha Latte cost 60฿.'
					}
				},
				avatar: {
					name: 'Lucy',
					models: {
						neutral:
							'https://cdn.discordapp.com/attachments/842737146321174558/1116747283132842105/avatar.png',
						joy: 'https://media.discordapp.net/attachments/1087307553471463514/1118379821488152699/joy.png?width=1170&height=1170',
						trust:
							'https://media.discordapp.net/attachments/1087307553471463514/1118379822394122250/trust.png?width=1000&height=1000',
						fear: 'https://cdn.discordapp.com/attachments/842737146321174558/1116747283132842105/avatar.png',
						surprise:
							'https://media.discordapp.net/attachments/1087307553471463514/1118379822155055184/surprise.png?width=1000&height=1000',
						sadness:
							'https://media.discordapp.net/attachments/1087307553471463514/1118379821869846548/sad.png?width=1170&height=1170',
						disgust:
							'https://media.discordapp.net/attachments/1087307553471463514/1118379821265862686/disgust.png?width=1000&height=1000',
						anger:
							'https://media.discordapp.net/attachments/1087307553471463514/1118379820699623564/anger.png?width=1000&height=1000',
						anticipation:
							'https://media.discordapp.net/attachments/1087307553471463514/1118379821026791556/anticipation.png?width=1000&height=1000'
					}
				},
				id: '1'
			}
		},
		{
			conversation: null,
			fillInTheBlank: null,
			imageMatching: {
				image:
					'https://cdn.discordapp.com/attachments/842737146321174558/1120433057699209236/image.png',
				choices: ['pen', 'pencil', 'eraser', 'box']
			}
		},
		{
			conversation: null,
			fillInTheBlank: {
				text: ['I', null, 'a student and love to study'],
				choices: ['am', 'were', 'is', 'are']
			},
			imageMatching: null
		}
	];

	// initialization
	onMount(() => {
		$saveCurrentConversation = false;
	});

	let currentItem = 0;
	$: item = items[currentItem];
	const updateCurrentItem = () => {
		if (item.conversation) {
			$chatContext = { conversation: item.conversation, bot: { emotion: 'neutral' } };
		}
	};
	$: currentItem, updateCurrentItem();
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-col font-line-seed">
	<div
		class="w-full h-[5.5vw] flex flex-row gap-[4vw] justify-between items-center fixed top-0 left-0 bg-white px-[2vw]"
	>
		<div class="flex flex-row font-extrabold text-[2vw] items-center">
			<img class="w-[3.5vw] object-contain mr-[2vw]" src={icon} alt="Learnliko" />
			Pre-test
		</div>

		<div class="flex-1 h-[60%] rounded-full bg-[#F4F4F4] overflow-hidden">
			<div
				style="width: {(currentItem / items.length) * 100}%;"
				class="h-full bg-gradient-to-r from-[#C698FF] to-[#FFD281] rounded-full"
			/>
		</div>
	</div>

	<!-- Top spacing -->
	<div class="w-full h-[18vh]" />

	{#if item.conversation}
		<div class="text-[1.75vw] font-bold mx-auto">ฟังสิ่งที่เพื่อนเอไอถามและตอบคำถาม</div>

		<div class="w-[50vw] h-[60vh] mt-[6vh] mx-auto relative">
			<ConversationView
				onFinishClicked={() => (currentItem = currentItem + 1)}
				class="bg-white rounded-[2vw] px-[6vw]"
				initializingClass="bg-white"
				recorderClass="bg-[#6C80E8] w-[50%]"
			/>
		</div>
	{/if}
</div>
