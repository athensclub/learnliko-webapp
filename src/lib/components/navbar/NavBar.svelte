<script lang="ts">
	import { isMobile } from '$lib/global/breakpoints';
	import assistantIcon from './assistant_icon.png';
	import icon from '$lib/images/learnliko_icon.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import NavBarLinkList from './NavBarLinkList.svelte';

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};
</script>

{#if $isMobile}
	<nav
		style="box-shadow: 0px -3px 10px 0px #00000040;"
		class="fixed bottom-0 w-[100vw] py-[2vh] flex flex-row justify-around"
	>
		<NavBarLinkList noText eachIconStyle="width: 10vw;">
			<button
				on:click={openAssistantChat}
				class="flex items-center justify-center rounded-xl w-[15vw] h-[15vw]"
				style="box-shadow: 0px 1px 4px 0px #00000040;"
				slot="center"
			>
				<img class="w-[75%]" src={assistantIcon} alt="Assistant" />
			</button>
		</NavBarLinkList>
	</nav>
{:else}
	<nav
		class="flex flex-col justify-around w-[23vw] h-[100vh] shadow-xl px-[2vw] py-[3vh] font-line-seed"
	>
		<div class="flex flex-col">
			<img class="w-[25%]" src={icon} alt="Learnliko" />

			<div class="w-full flex flex-row items-center bg-[#F5F5F5] rounded-xl p-[5%] mt-[6vh]">
				<div
					class={`w-[3.5vw] h-[3.5vw] bg-center bg-cover rounded-full `}
					style="background-image: url('{userProfileImage}');"
				/>
				<div class="flex flex-col ml-[1vw] font-bold">
					<div class="text-[1.4vw]">Natsataporn M.</div>
					<div class="text-[1vw]">🧿 3300 coin</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col w-full font-bold gap-[4vh] text-[2vw]">
			<NavBarLinkList eachIconStyle="width: 2vw; margin-right: 2vw;" />
		</div>

		<button
			on:click={openAssistantChat}
			style="box-shadow: 0px 2px 15px 0px #9BA1FD82; "
			class="w-[70%] py-2 rounded-full mx-auto flex flex-row items-center justify-center font-bold"
		>
			<img class="w-[25%]" src={assistantIcon} alt="Assistant" />

			Assistant
		</button>
	</nav>
{/if}
