<script lang="ts">
	import { chatContext, currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import type { ConversationCarouselItem, ConversationDetails } from '$lib/types/conversationData';

	// export let small = false;
	// export let extraSmall = false;
	export let conversation: ConversationCarouselItem;
	export let disabled = false;

	let clazz = '';
	export { clazz as class };

	const openChatbox = () => {
		$chatContext = { conversation, bot: { emotion: 'neutral' } };
		$currentChatboxView = 'CONVERSATION';
		$showChatbox = true;
	};
</script>

<!-- Specify the size(width, height) of the card in the user of the component, not in the component itself. -->
<div
	style="background-image: url('{conversation.background}');"
	class={`relative overflow-hidden flex flex-col justify-between bg-center bg-cover rounded-xl ${clazz}`}
>
	<div class="w-full h-[17%] flex flex-row justify-between items-center backdrop-blur-sm px-[1vw]">
		<div class="flex flex-row h-full items-center gap-[1vw]">
			<div
				style="background-image: url('{conversation.avatar.models.neutral}')"
				class="h-[70%] bg-[#FFD281] aspect-square rounded-full bg-cover bg-top"
			/>
			<div class="flex flex-col">
				<div class="text-white font-bold text-[1vw]">Jenny</div>
				<div class="text-[#FFFFFF99] text-[0.7vw]">student</div>
			</div>
		</div>

		<div class="rounded-full bg-[#FFFFFF21] px-[1vw] py-[1vh] text-white text-[1vw]">
			🧿 300 coin
		</div>
	</div>

	<img
		class="absolute bottom-0 left-[50%] translate-x-[-50%] h-[80%]"
		src={conversation.avatar.models.neutral}
		alt="Avatar"
	/>

	<div
		class="w-full h-[38%] flex flex-col justify-between backdrop-blur-sm px-[1.5vw] py-[2vh] text-white [text-1vw] font-bold"
	>
		<div class="w-full text-center text-[1.2vw]">{conversation.topic}</div>

		<button
			on:click={openChatbox}
			class="flex flex-row items-center justify-center gap-[1vw] w-full h-[35%] bg-[#FFFFFF38] text-white text-[1.1vw] rounded-full"
		>
			<svg class="h-[60%]" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9.5 15.7895C8.36905 15.7895 7.40774 15.4057 6.61607 14.6382C5.8244 13.8706 5.42857 12.9386 5.42857 11.8421V3.94737C5.42857 2.85088 5.8244 1.91886 6.61607 1.15132C7.40774 0.383772 8.36905 0 9.5 0C10.631 0 11.5923 0.383772 12.3839 1.15132C13.1756 1.91886 13.5714 2.85088 13.5714 3.94737V11.8421C13.5714 12.9386 13.1756 13.8706 12.3839 14.6382C11.5923 15.4057 10.631 15.7895 9.5 15.7895ZM8.14286 25V20.9539C5.79048 20.6469 3.84524 19.6272 2.30714 17.8947C0.769047 16.1623 0 14.1447 0 11.8421H2.71429C2.71429 13.6623 3.37612 15.2136 4.69979 16.4961C6.02255 17.7794 7.62262 18.4211 9.5 18.4211C11.3774 18.4211 12.9779 17.7794 14.3016 16.4961C15.6243 15.2136 16.2857 13.6623 16.2857 11.8421H19C19 14.1447 18.231 16.1623 16.6929 17.8947C15.1548 19.6272 13.2095 20.6469 10.8571 20.9539V25H8.14286Z"
					fill="white"
				/>
			</svg>

			Start Conversation
		</button>
	</div>
</div>

<!-- <div
	style="background-image: {conversation.background};"
	class={`${
		extraSmall
			? 'lg:w-[12vw] lg:h-[16vw] w-[12vh] h-[34vh] rounded-3xl'
			: small
			? 'lg:w-[18vw] lg:h-[22vw] w-[20vh] h-[40vh] lg:rounded-[3vw] rounded-[8vw] '
			: 'lg:w-[20vw] lg:h-[24vw] w-[35vh] h-[45vh] lg:rounded-[3vw] rounded-[8vw] '
	} w-full font-line-seed text-white shadow-lg transition-size flex flex-col items-center justify-around relative`}
>
	<div
		class={`lg:text-[1vw] ${
			extraSmall ? 'text-[0.5vh]' : 'text-[2vh]'
		} lg:w-[20vw] w-[18vh] transition-font lg:mt-[2vw] mt-[2vh] text-center`}
	>
		{conversation.intro}
	</div>

	<div class="flex flex-col w-full items-center justify-center">
		<div
			class={`${
				extraSmall
					? 'w-[4vw] h-[4vw]'
					: small
					? 'w-[6vw] h-[6vw]'
					: 'lg:w-[7vw] lg:h-[7vw] w-[10vh] h-[10vh] '
			} bg-center bg-cover  rounded-full lg:mt-[0.5vw] shadow-md transition-size`}
			style="background-image: url('{conversation.details.bot.avatar}');"
		/>

		<div
			class={`${
				extraSmall
					? 'xl:text-[0.7vw] text-[0.49vh] lg:text-[0.7vh]'
					: small
					? 'xl:text-[1vw] text-[0.79vh] lg:text-[1vh]'
					: 'lg:text-[1.2vw] text-[5vw]'
			} px-6 py-4 transition-font font-bold text-center`}
		>
			{conversation.topic}
		</div>
	</div>

	<button
		{disabled}
		on:click={openChatbox}
		class:animate-bounce={!(small || extraSmall)}
		class={`${
			extraSmall
				? 'lg:text-[0.6vw] text-[3vw] px-1'
				: 'lg:text-[0.9vw] text-[4vw]  px-6'
		} flex flex-row w-fit items-center justify-center h-[6vh] shadow-lg z-40 
		 rounded-full mb-6 bg-white text-black font-bold transition-[width,height,font] `}
	>
		<svg
			class="lg:h-[1vw] h-[4vw] mr-1 transition-size fill-black"
			viewBox="0 0 13 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M6.49992 10.0833C5.8402 10.0833 5.27943 9.85235 4.81763 9.39054C4.35582 8.92874 4.12492 8.36797 4.12492 7.70825V2.95825C4.12492 2.29853 4.35582 1.73777 4.81763 1.27596C5.27943 0.814155 5.8402 0.583252 6.49992 0.583252C7.15964 0.583252 7.72041 0.814155 8.18221 1.27596C8.64402 1.73777 8.87492 2.29853 8.87492 2.95825V7.70825C8.87492 8.36797 8.64402 8.92874 8.18221 9.39054C7.72041 9.85235 7.15964 10.0833 6.49992 10.0833ZM5.70825 15.6249V13.1905C4.33603 13.0058 3.20131 12.3923 2.30409 11.3499C1.40686 10.3076 0.958252 9.09367 0.958252 7.70825H2.54159C2.54159 8.80339 2.92765 9.73676 3.69979 10.5084C4.47141 11.2805 5.40478 11.6666 6.49992 11.6666C7.59506 11.6666 8.5287 11.2805 9.30084 10.5084C10.0724 9.73676 10.4583 8.80339 10.4583 7.70825H12.0416C12.0416 9.09367 11.593 10.3076 10.6958 11.3499C9.79853 12.3923 8.66381 13.0058 7.29159 13.1905V15.6249H5.70825Z"
			
			/>
		</svg>
		Start Conversation
	</button>
	
	<div
		class={`
		rounded-full text-[0.9vw] shadow-md bg-black/5 backdrop-blur-xl border border-white/5
		lg:w-[6vw] lg:h-[2.5vw]
		flex flex-row items-center justify-center p-2 absolute -top-2 right-0
		`}
	>
		<h3 class="font-bold text-white opacity-80">CEFR: {conversation.CEFRlevel}</h3>
	</div>
</div> -->
