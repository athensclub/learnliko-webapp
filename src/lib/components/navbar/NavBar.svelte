<script lang="ts">
	import { isMobile } from '$lib/global/breakpoints';
	import assistantIcon from './assistant_icon.png';
	import conversationFocusedIcon from './conversation_focused_icon.png';
	import conversationIcon from './conversation_icon.png';
	import icon from '$lib/images/learnliko_icon.png';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import NavBarLink from './NavBarLink.svelte';
	import { currentChatboxView, showChatbox } from '$lib/global/chatbox';

	const openAssistantChat = () => {
		$currentChatboxView = 'ASSISTANT';
		$showChatbox = true;
	};
</script>

{#if $isMobile}
	<div />
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
			<NavBarLink href="/discover" text="Discover">
				<svg
					slot="normalIcon"
					class="w-[2vw] mr-[1.5vw]"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M25.9744 2.02778C24.8144 0.867781 23.1744 0.414448 21.5877 0.814448L8.52111 4.08111C6.32111 4.62778 4.62778 6.33445 4.08111 8.52111L0.814448 21.6011C0.414448 23.1877 0.867781 24.8277 2.02778 25.9877C2.90778 26.8544 4.06778 27.3344 5.26778 27.3344C5.64111 27.3344 6.02778 27.2944 6.40111 27.1877L19.4811 23.9211C21.6677 23.3744 23.3744 21.6811 23.9211 19.4811L27.1877 6.40111C27.5877 4.81445 27.1344 3.17445 25.9744 2.02778ZM14.0011 19.1744C11.1478 19.1744 8.82778 16.8544 8.82778 14.0011C8.82778 11.1478 11.1478 8.82778 14.0011 8.82778C16.8544 8.82778 19.1744 11.1478 19.1744 14.0011C19.1744 16.8544 16.8544 19.1744 14.0011 19.1744Z"
						fill="black"
					/>
				</svg>

				<svg
					slot="focusedIcon"
					class="w-[2vw] mr-[1.5vw]"
					viewBox="0 0 28 28"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M25.9744 2.02778C24.8144 0.867781 23.1744 0.414448 21.5877 0.814448L8.52111 4.08111C6.32111 4.62778 4.62778 6.33445 4.08111 8.52111L0.814448 21.6011C0.414448 23.1877 0.867781 24.8277 2.02778 25.9877C2.90778 26.8544 4.06778 27.3344 5.26778 27.3344C5.64111 27.3344 6.02778 27.2944 6.40111 27.1877L19.4811 23.9211C21.6677 23.3744 23.3744 21.6811 23.9211 19.4811L27.1877 6.40111C27.5877 4.81445 27.1344 3.17445 25.9744 2.02778ZM14.0011 19.1744C11.1478 19.1744 8.82778 16.8544 8.82778 14.0011C8.82778 11.1478 11.1478 8.82778 14.0011 8.82778C16.8544 8.82778 19.1744 11.1478 19.1744 14.0011C19.1744 16.8544 16.8544 19.1744 14.0011 19.1744Z"
						fill="url(#paint0_linear_738_22)"
					/>
					<defs>
						<linearGradient
							id="paint0_linear_738_22"
							x1="0.671875"
							y1="14.1326"
							x2="27.3303"
							y2="14.1326"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#7280FF" />
							<stop offset="0.4375" stop-color="#C698FF" />
							<stop offset="1" stop-color="#FFD68D" />
						</linearGradient>
					</defs>
				</svg>
			</NavBarLink>

			<NavBarLink href="/play" text="Conversation">
				<img
					slot="normalIcon"
					class="w-[2vw] object-contain mr-[1.5vw]"
					src={conversationIcon}
					alt="Conversation"
				/>
				<img
					slot="focusedIcon"
					class="w-[2vw] object-contain mr-[1.5vw]"
					src={conversationFocusedIcon}
					alt="Conversation"
				/>
			</NavBarLink>

			<NavBarLink href="/read" text="Reading">
				<svg
					slot="normalIcon"
					class="w-[2vw] object-contain mr-[1.5vw]"
					viewBox="0 0 31 31"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4.42864 8.30273C4.42864 7.38554 5.17216 6.64202 6.08936 6.64202C6.66499 6.64202 7.1729 6.93396 7.4725 7.38302C7.81185 7.89166 8.49928 8.0289 9.00793 7.68955C9.51658 7.3502 9.65382 6.66277 9.31447 6.15412C8.62165 5.11566 7.43606 4.42773 6.08936 4.42773C3.94925 4.42773 2.21436 6.16263 2.21436 8.30273C2.21436 10.4296 3.92779 12.1561 6.04958 12.1775C6.05659 12.1776 6.06365 12.1777 6.0707 12.1777H23.2501C23.8615 12.1777 24.3572 11.6821 24.3572 11.0706C24.3572 10.4591 23.8615 9.96345 23.2501 9.96345H6.08936C5.17216 9.96345 4.42864 9.21992 4.42864 8.30273Z"
						fill="black"
					/>
					<path
						d="M13.2859 5.53516C12.6744 5.53516 12.1787 6.03085 12.1787 6.6423C12.1787 7.25375 12.6744 7.74944 13.2859 7.74944H27.6787C28.2902 7.74944 28.7859 7.25375 28.7859 6.6423C28.7859 6.03085 28.2902 5.53516 27.6787 5.53516H13.2859Z"
						fill="black"
					/>
					<path
						d="M7.75021 14.3926C7.13876 14.3926 6.64307 14.8882 6.64307 15.4997C6.64307 16.1112 7.13876 16.6069 7.75021 16.6069H27.6788C28.2903 16.6069 28.7859 16.1112 28.7859 15.4997C28.7859 14.8882 28.2903 14.3926 27.6788 14.3926H7.75021Z"
						fill="black"
					/>
					<path
						d="M2.21436 19.9294C2.21436 19.3179 2.71005 18.8223 3.3215 18.8223H23.2501C23.8615 18.8223 24.3572 19.3179 24.3572 19.9294C24.3572 20.5409 23.8615 21.0366 23.2501 21.0366H3.3215C2.71005 21.0366 2.21436 20.5409 2.21436 19.9294Z"
						fill="black"
					/>
					<path
						d="M7.75021 23.25C7.13876 23.25 6.64307 23.7457 6.64307 24.3571C6.64307 24.9686 7.13876 25.4643 7.75021 25.4643H27.6788C28.2903 25.4643 28.7859 24.9686 28.7859 24.3571C28.7859 23.7457 28.2903 23.25 27.6788 23.25H7.75021Z"
						fill="black"
					/>
				</svg>
			</NavBarLink>

			<NavBarLink href="/friends" text="Friends space">
				<svg
					slot="normalIcon"
					class="w-[2vw] object-contain mr-[1.5vw]"
					viewBox="0 0 31 23"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9.3 11.5C12.2983 11.5 14.725 8.9279 14.725 5.75C14.725 2.5721 12.2983 0 9.3 0C6.30172 0 3.875 2.5721 3.875 5.75C3.875 8.9279 6.30172 11.5 9.3 11.5ZM13.02 13.1429H12.618C11.6105 13.6562 10.4916 13.9643 9.3 13.9643C8.10844 13.9643 6.99438 13.6562 5.98203 13.1429H5.58C2.49937 13.1429 0 15.792 0 19.0571V20.5357C0 21.8962 1.04141 23 2.325 23H16.275C17.5586 23 18.6 21.8962 18.6 20.5357V19.0571C18.6 15.792 16.1006 13.1429 13.02 13.1429ZM23.25 11.5C25.8172 11.5 27.9 9.29241 27.9 6.57143C27.9 3.85045 25.8172 1.64286 23.25 1.64286C20.6828 1.64286 18.6 3.85045 18.6 6.57143C18.6 9.29241 20.6828 11.5 23.25 11.5ZM25.575 13.1429H25.3909C24.7177 13.3893 24.0056 13.5536 23.25 13.5536C22.4944 13.5536 21.7823 13.3893 21.1091 13.1429H20.925C19.9369 13.1429 19.0262 13.4458 18.227 13.9335C19.4089 15.2837 20.15 17.0754 20.15 19.0571V21.0286C20.15 21.1415 20.1258 21.2493 20.1209 21.3571H28.675C29.9586 21.3571 31 20.2533 31 18.8929C31 15.715 28.5733 13.1429 25.575 13.1429Z"
						fill="black"
					/>
				</svg>
			</NavBarLink>
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
