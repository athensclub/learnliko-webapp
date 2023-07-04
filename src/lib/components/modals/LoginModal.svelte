<script lang="ts">
	import { goto } from '$app/navigation';
	import { currentMode } from '$lib/global/mode';
	import { profileImageLocal, usernameLocal } from '$lib/localdb/profileLocal';
	import userSession from '$lib/stores/userSession';
	import { createUserAccount, getCurrentUserData } from '$lib/temp/user';
	import type { CEFRLevel } from '$lib/types/CEFRLevel';
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';

	export let profileImage: string;
	export let name: string;
	export let level: CEFRLevel;

	const { close }: Context = getContext('simple-modal');
	const login = async () => {
		close();

		await createUserAccount({
			CEFRLevel: { communication: level, general: level, grammar: level, vocabulary: level },
			mode: 'Student'
		});
		$usernameLocal = name;
		$profileImageLocal = profileImage;

		const profileData = await getCurrentUserData();
		userSession.update({ accountData: profileData });
		currentMode.set('Student');
		goto('/discover');
	};
</script>

<div class="w-full h-full pt-[5vh] bg-white font-line-seed flex flex-col items-center">
	<div
		style="background-image: url('{profileImage}');"
		class="w-[15vw] h-[15vw] rounded-full bg-cover bg-center"
	/>

	<div class="text-[1.7vw] mt-[2vh]">{name}</div>

	<input
		class="w-[80%] mt-[4vh] border border-[#DDDFE2] text-[1.7vw] px-[1vw] py-[1vh] rounded-[0.8vw]"
		placeholder="Password"
	/>

	<button
		on:click={login}
		class="w-[80%] mt-[4vh] py-[1vh] bg-[#1877F2] text-white text-[1.7vw] font-bold"
	>
		Login
	</button>

	<a href="#top" class="text-center mt-[4vh] text-[1.35vw] text-[#2E7DF2]">Forgotten password?</a>
</div>
