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
	import TeacherNavBarLinkList from './TeacherNavBarLinkList.svelte';
	import { profileImageLocal, usernameLocal } from '$lib/localdb/profileLocal';

	const modes: Mode[] = ['Professional', 'Student'];

	/**
	 * (Only has effect in desktop breakpoint) Whether this NavBar will be 'counted' in layout calculation. When true, the sibling elements will be placed after NavBar instead of Navbar being overlay because it is fixed.
	 */
	export let spaced = false;

	/**
	 * If true, show navbar for teacher mode instead.
	 */
	export let teacher = false;

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
		{#if teacher}
			<TeacherNavBarLinkList />
		{:else}
			<NavBarLinkList noText eachIconStyle="width: 10vw;">
				<div slot="center" class="w-[15vw] h-[15vw]">
					<button
						on:click={openAssistantChat}
						class="flex items-center justify-center rounded-xl w-full h-full"
						style="box-shadow: 0px 1px 4px 0px #00000040;"
					>
						<img class="w-[75%]" src={assistantIcon} alt="Assistant" />
					</button>
				</div>
			</NavBarLinkList>
		{/if}
	</nav>
{:else}
	{#if spaced}
		<!-- "empty" space to help with layout -->
		<div class="w-[23vw] h-[100vh]" />
	{/if}

	<nav
		style="box-shadow: 4px 1px 20px 0px #0000000D;"
		class="fixed top-0 left-0 flex flex-col bg-white/70 backdrop-blur-sm shadow-sm justify-around w-[23vw] h-[100vh] py-[3vh] font-line-seed"
	>
		<div class="flex flex-col px-[2vw]">
			<div class="flex flex-row justify-between w-full">
				<img class="w-[25%]" src={icon} alt="Learnliko" />
			</div>

			<a
				href="/profile"
				class={`w-full flex flex-row items-center rounded-[1.5vw] p-[5%] mt-[6vh] ${
					isInProfile ? 'outline outline-[0.3vw] outline-[#6C80E8] bg-[#F5F5F5]' : 'bg-[#F5F5F5]'
				}`}
			>
				<!-- TODO: use actual profile image from cloud -->
				<div
					class={`w-[3.5vw] h-[3.5vw] bg-center bg-cover rounded-full border-[0.15vw] border-white`}
					style="background-image: url('{teacher
						? 'https://cdn.discordapp.com/attachments/842737146321174558/1122752653764595712/image.png'
						: $profileImageLocal}');"
				/>
				<div class={`flex flex-col ml-[1vw] font-bold`}>
					<div
						class="text-[1.4vw] {isInProfile
							? 'bg-clip-text text-transparent bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]'
							: 'text-black'}"
					>
						{$usernameLocal}
					</div>
					<div class="flex flex-row text-[1vw]">
						<svg
							class="w-[1vw]"
							viewBox="0 0 566 566"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M282.85 0L0 282.85L282.85 565.7L565.7 282.85L282.85 0ZM141.425 282.85L282.85 141.425L424.275 282.85L282.85 424.275L141.425 282.85Z"
								fill="url(#paint0_linear_1209_1015)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_1209_1015"
									x1="-5.29141"
									y1="5.33679"
									x2="368.376"
									y2="675.692"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#C698FF" />
									<stop offset="1" stop-color="#6C80E8" />
								</linearGradient>
							</defs>
						</svg>

						<div
							class="ml-[0.3vw] text-[1.1vw] bg-clip-text text-transparent bg-gradient-to-r from-[#C698FF] to-[#6C80E8]"
						>
							3300
						</div>

						<svg
							class="ml-[2vw] w-[1vw]"
							viewBox="0 0 566 566"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle cx="282.85" cy="282.85" r="282.85" fill="url(#paint0_linear_1209_1018)" />
							<path
								d="M283.5 377.056H306.889C322.482 377.056 353.667 367.7 353.667 330.278C353.667 292.856 322.482 283.5 306.889 283.5H260.111C244.518 283.5 213.333 274.144 213.333 236.722C213.333 199.3 244.518 189.944 260.111 189.944H283.5M283.5 377.056H213.333M283.5 377.056V423.833M283.5 189.944H353.667M283.5 189.944V143.167M494 283.5C494 399.757 399.757 494 283.5 494C167.244 494 73 399.757 73 283.5C73 167.244 167.244 73 283.5 73C399.757 73 494 167.244 494 283.5Z"
								stroke="white"
								stroke-width="20"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_1209_1018"
									x1="282.85"
									y1="0"
									x2="282.85"
									y2="565.7"
									gradientUnits="userSpaceOnUse"
								>
									<stop stop-color="#FFE08F" />
									<stop offset="0.255208" stop-color="#F0C862" />
									<stop offset="0.494792" stop-color="#E4AE24" />
									<stop offset="0.755208" stop-color="#F0C862" />
									<stop offset="1" stop-color="#FFE08F" />
								</linearGradient>
							</defs>
						</svg>

						<div
							class="ml-[0.3vw] text-[1.1vw] bg-clip-text text-transparent bg-gradient-to-t from-[#FFE08F] via-[#E4AE24] to-[#FFE08F]"
						>
							100
						</div>
					</div>
				</div>
			</a>
		</div>

		<div class="flex flex-col w-full font-bold gap-[4vh] text-[1.6vw]">
			{#if teacher}
				<TeacherNavBarLinkList />
			{:else}
				<NavBarLinkList eachIconStyle="width: 1.6vw; margin-right: 1vw;" />
			{/if}
		</div>

		{#if !teacher}
			<button
				on:click={openAssistantChat}
				style="box-shadow: 0px 2px 15px 0px #9BA1FD82; "
				class="w-[60%] py-[1.5vh] rounded-full mx-auto flex flex-row text-[1.2vw] text-white items-center justify-center font-bold bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
			>
				<img class="w-[22%]" src={assistantIcon} alt="Assistant" />

				Assistant
			</button>
		{/if}
	</nav>
{/if}
