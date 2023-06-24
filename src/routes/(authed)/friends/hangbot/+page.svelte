<script lang="ts">
	import { goto } from '$app/navigation';
	import { sendHangbotInvite } from '$lib/global/friends';
	import icon from '$lib/images/hangbot_icon.png';
	import FriendsGameLogo from './FriendsGameLogo.svelte';
	import playAlone from './play_alone_image.png';
	import playWithFriends from './play_with_friends_image.png';

	const playWithFriendsClicked = () => {
		sendHangbotInvite();
		goto('/friends/hangbot/online');
	};
</script>

<div
	class="w-[100vw] h-full min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-[#C698FF] to-[#FFD281] font-line-seed"
>
	<FriendsGameLogo />

	<div class="flex flex-col w-[50vw] gap-[5vh]">
		<div class="flex flex-row gap-[2vw] items-center justify-center">
			<img class="w-[15vw]" src={icon} alt="Hangbot" />

			<div class="text-white text-[2.75vw]">
				<div class="inline-block">Play</div>
				<div class="inline-block font-extrabold">Hangbot</div>
				<br />
				<div>with friends</div>
			</div>
		</div>

		<div class="w-full grid grid-cols-2 gap-[2vw]">
			<a
				href="/friends/hangbot/solo"
				class="w-full h-[13vw] gap-[2vh] flex flex-col items-center justify-center rounded-[2vw] bg-gradient-to-r from-[#DCDCDC] via-white to-[#DCDCDC] text-[1.7vw] font-bold"
			>
				<img src={playAlone} class="h-[35%]" alt="Play Alone" />
				Play Alone
			</a>

			<button
				on:click={playWithFriendsClicked}
				class="w-full h-[13vw] gap-[2vh] flex flex-col items-center justify-center rounded-[2vw] bg-gradient-to-r from-[#DCDCDC] via-white to-[#DCDCDC] text-[1.7vw] font-bold"
			>
				<img src={playWithFriends} class="h-[35%]" alt="Play Alone" />
				Play With Friends
			</button>
		</div>
	</div>
</div>
