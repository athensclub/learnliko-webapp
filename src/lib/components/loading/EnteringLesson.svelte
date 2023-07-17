<script lang="ts">
	import { chatContext } from '$lib/global/chatbox';
	import { fade } from 'svelte/transition';
	import background from '$lib/images/traveling_background.mp4';
	import audio from '$lib/audios/entering_lesson_transition_sound.wav';
	import { tweened } from 'svelte/motion';
	import { isMobile } from '$lib/global/breakpoints';

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
	class="fixed left-0 top-0 z-[1000] flex h-[100vh] w-[100vw] flex-row items-center justify-between overflow-hidden bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] px-[10vw] font-line-seed"
>
	<!-- <div
		style="background-color: #FFD281; background-image: url('{$chatContext?.conversation.avatar
			.models.neutral}')"
		class="w-[10vw] h-[10vw] bg-top bg-cover rounded-full border border-white"
	/> -->
	<video autoplay muted loop class="absolute left-0 top-0 h-full w-full object-cover">
		<source src={background} type="video/mp4" />
	</video>

	<audio bind:this={audioInstance} autoplay src={audio} />

	<div
		class="absolute left-[50%] flex translate-x-[-50%] flex-col items-center font-bold text-white {$isMobile
			? 'text-[5vw]'
			: 'text-[1.5vw]'}"
	>
		จะถึงภายใน {countdown} วินาที
		<iframe
			title="Moving Car"
			class="my-[2vh] rounded-full {$isMobile ? 'h-[80vw] w-[80vw]' : 'h-[35vw] w-[35vw]'}"
			src="https://rive.app/community/110-170-flying-car/embed"
		/>
		กำลังเดินทาง เตรียมตัวให้พร้อม
	</div>

	<!-- <div
		style="background-image: url('{$chatContext?.conversation.background}')"
		class="w-[10vw] h-[10vw] bg-center bg-cover rounded-full border border-white"
	/> -->
</div>
