<script lang="ts" context="module">
	export const hideBottomNavBar = writable(false);
</script>

<script lang="ts">
	import NavBarLink from '$lib/components/navbar/NavBarLink.svelte';
	import chatIcon from '$asset/icons/chat.png';
	import chatEnableIcon from '$asset/icons/chatEnable.png';
	import kidImage from '$asset/temp/kids.jpg';
	import { onMount } from 'svelte';
	import userSession from '$lib/stores/userSession';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';

	let loading = true;

	onMount(() => {
		// Subscribe on user's session
		userSession.subscribe((session) => {
			// ensure the initialization is completed
			if (!session.initialized) {
				loading = true;
				return;
			}

			// navigate to homepage if user is not logged in
			if (!session.isLoggedIn) goto(`/`);

			loading = false;
		});
	});
</script>

{#if loading}
	<div>Loading</div>
{:else}
	<div class="flex h-[100dvh] flex-col justify-between">
		<slot class="h-[100%]" />

		<!-- Bottom navigator bar -->
		{#if !$hideBottomNavBar}
			<nav
				class="flex min-h-[8vh] w-[100dvw] flex-row items-center justify-center
	bg-white py-2 shadow-[0_4px_15px_0_rgba(0,0,0,0.25)]"
			>
				<NavBarLink href="/feed">
					<svg
						class="w-8"
						slot="normalIcon"
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
						class="w-8"
						slot="focusedIcon"
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
								<stop stop-color="#6C80E8" />
								<stop offset="1" stop-color="#9BA1FD" />
							</linearGradient>
						</defs>
					</svg>
				</NavBarLink>

				<!-- Spacing -->
				<div class="w-[18vw]" />

				<NavBarLink href="/chat">
					<div
						slot="normalIcon"
						class="flex flex-row items-center justify-center rounded-3xl bg-[#F3F3F3] px-6 py-2"
					>
						<img src={chatIcon} class="w-8 object-contain" alt="chat icon" />
					</div>
					<div
						slot="focusedIcon"
						class="flex flex-row items-center justify-center rounded-3xl bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-6 py-2"
					>
						<img src={chatEnableIcon} class="w-8 object-contain" alt="chat icon" />
					</div>
				</NavBarLink>

				<!-- Spacing -->
				<div class="w-[18vw]" />

				<NavBarLink href="/profile-details">
					<div slot="normalIcon" class="rounded-full p-1">
						<img class="h-8 w-8 rounded-full" src={kidImage} alt="profile" />
					</div>
					<div
						slot="focusedIcon"
						class="rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-1"
					>
						<img class="h-8 w-8 rounded-full" src={kidImage} alt="profile" />
					</div>
				</NavBarLink>
			</nav>
		{/if}
	</div>
{/if}
