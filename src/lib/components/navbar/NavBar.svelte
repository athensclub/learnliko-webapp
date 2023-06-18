<script lang="ts">
	import { isMobile } from '$lib/global/breakpoints';
	import assistantIcon from './assistant_icon.png';
	import icon from '$lib/images/learnliko_icon.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';
	import NavBarLinkList from './NavBarLinkList.svelte';
	import { page } from '$app/stores';
	import Select from 'svelte-select';
	import type { Mode } from '$lib/types/mode';
	import { currentMode } from '$lib/global/mode';

	const modes: Mode[] = ['Professional', 'Student'];

	/**
	 * (Only has effect in desktop breakpoint) Whether this NavBar will be 'counted' in layout calculation. When true, the sibling elements will be placed after NavBar instead of Navbar being overlay because it is fixed.
	 */
	export let spaced = false;

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};

	$: isInProfile = $page.url.pathname.startsWith('/profile');
</script>

{#if $isMobile}
	<nav
		style="box-shadow: 0px -3px 10px 0px #00000040;"
		class="fixed z-[500] bg-white bottom-0 w-[100vw] py-[2vh] flex flex-row justify-around"
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
	{#if spaced}
		<!-- "empty" space to help with layout -->
		<div class="w-[23vw] h-[100vh]" />
	{/if}

	<nav
		style="box-shadow: 4px 1px 20px 0px #0000000D;"
		class="fixed top-0 left-0 flex flex-col bg-white justify-around w-[23vw] h-[100vh] py-[3vh] font-line-seed"
	>
		<div class="flex flex-col px-[2vw]">
			<div class="flex flex-row justify-between w-full">
				<img class="w-[25%]" src={icon} alt="Learnliko" />

				<!-- https://github.com/rob-balfre/svelte-select/blob/HEAD/docs/theming_variables.md -->
				<Select
					on:change={(e) => ($currentMode = e.detail.value)}
					--width="55%"
					--height="2vw"
					--padding="1vw"
					--font-size="1vw"
					--clear-select-width="0"
					--clear-icon-width="0"
					items={modes}
					value={$currentMode}
				/>
			</div>

			<a
				href="/profile"
				class={`w-full flex flex-row items-center rounded-2xl p-[5%] mt-[6vh] ${
					isInProfile
						? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]'
						: 'bg-[#F5F5F5]'
				}`}
			>
				<div
					class={`w-[3.5vw] h-[3.5vw] bg-center bg-cover rounded-full `}
					style="background-image: url('{userProfileImage}');"
				/>
				<div
					class={`flex flex-col ml-[1vw] font-bold ${isInProfile ? 'text-white' : 'text-black'}`}
				>
					<div class="text-[1.4vw]">Natsataporn M.</div>
					<div class="text-[1vw]">🧿 3300 coin</div>
				</div>
			</a>
		</div>

		<div class="flex flex-col w-full font-bold gap-[4vh] text-[1.6vw]">
			<NavBarLinkList eachIconStyle="width: 1.6vw; margin-right: 1vw;" />
		</div>

		<button
			on:click={openAssistantChat}
			style="box-shadow: 0px 2px 15px 0px #9BA1FD82; "
			class="w-[60%] py-[1.5vh] rounded-full mx-auto flex flex-row text-[1.2vw] text-white items-center justify-center font-bold bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
		>
			<img class="w-[22%]" src={assistantIcon} alt="Assistant" />

			Assistant
		</button>
	</nav>
{/if}
