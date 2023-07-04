<script lang="ts">
	import { signInWithUsername } from '$lib/auth';
	import background from '$lib/images/bgvd.mp4';
	import icon from '$lib/images/learnliko_icon.png';

	let username: string, password: string;
	let errorMessage: string;
	let loading = false;

	const signIn = async function () {
		if (loading) return;

		try {
			// if finish signIn, [onAuthStateChanged] in root +layout will be triggered
			await signInWithUsername(username, password);
		} catch (error) {
			errorMessage = (error as Error).message;
		}
	};
</script>

<div
	class="relative flex h-full min-h-[100vh] w-full flex-col items-center justify-center font-line-seed font-bold"
>
	<video
		autoplay
		muted
		loop
		class="absolute left-0 top-0 z-[-1] h-full w-full object-cover blur-sm brightness-105"
	>
		<source src={background} type="video/mp4" />
	</video>

	<img src={icon} class="w-[10vw]" alt="Learnliko" />

	<input
		bind:value={username}
		placeholder="ชื่อผู้ใช้"
		style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset;"
		class="mt-[4vw] w-[25vw] rounded-full px-[1vw] py-[0.5vw] text-center text-[1.5vw]"
	/>
	<input
		bind:value={password}
		placeholder="รหัสผ่าน"
		style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset;"
		class="mt-[1vw] w-[25vw] rounded-full px-[1vw] py-[0.5vw] text-center text-[1.5vw]"
	/>

	<button
		on:click={signIn}
		class="mt-[4vw] w-[25vw] rounded-full
		py-[0.5vw] text-[1.5vw] text-white
		{loading ? 'bg-gray-700' : 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]'} "
	>
		เข้าสู่ระบบ
	</button>
	<h4 class="text-red-400">{errorMessage ?? ''}</h4>
</div>
