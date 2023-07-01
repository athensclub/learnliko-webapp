<script lang="ts">
	import { chatContext } from '$lib/global/chatbox';
	import { fade } from 'svelte/transition';
	import background from '$lib/images/traveling_background.mp4';
	import audio from '$lib/audios/entering_lesson_transition_sound.wav';
	import { tweened } from 'svelte/motion';

	export let onFinish: () => void;

	let audioInstance: HTMLAudioElement | null;

	let audioVolume = tweened(1, { duration: 2000 });

	let countdown = 10;
	const interval = setInterval(() => {
		countdown = countdown - 1;
		if (countdown === 2) {
			$audioVolume = 0;
		}
		if (countdown === 0) {
			clearInterval(interval);
			onFinish();
		}
	}, 1000);

	$: if (audioInstance) {
		audioInstance.volume = $audioVolume;
	}
</script>

<div
	transition:fade
	class="fixed z-[1000] top-0 left-0 w-[100vw] h-[100vh] px-[10vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] flex flex-row justify-between items-center font-line-seed overflow-hidden"
>
	<!-- <div
		style="background-color: #FFD281; background-image: url('{$chatContext?.conversation.avatar
			.models.neutral}')"
		class="w-[10vw] h-[10vw] bg-top bg-cover rounded-full border border-white"
	/> -->
	<video autoplay muted loop class="absolute left-0 top-0 w-full h-full object-cover">
		<source src={background} type="video/mp4" />
	</video>

	<audio bind:this={audioInstance} autoplay src={audio} />

	<div
		class="absolute left-[50%] translate-x-[-50%] flex flex-col items-center text-white text-[1.5vw] font-bold"
	>
		จะถึงภายใน {countdown} วินาที
		<iframe
			title="Moving Car"
			class="w-[35vw] h-[35vw] my-[2vh] rounded-full"
			src="https://rive.app/community/110-170-flying-car/embed"
		/>
		กำลังเดินทาง เตรียมตัวให้พร้อม
	</div>

	<!-- <div
		style="background-image: url('{$chatContext?.conversation.background}')"
		class="w-[10vw] h-[10vw] bg-center bg-cover rounded-full border border-white"
	/> -->
</div>
