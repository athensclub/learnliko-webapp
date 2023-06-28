<script lang="ts">
	import { chatContext } from '$lib/global/chatbox';
	import { fade } from 'svelte/transition';
	import background from '$lib/images/traveling_background.mp4';

	export let onFinish: () => void;

	let countdown = 10;
	const interval = setInterval(() => {
		countdown = countdown - 1;
		if (countdown === 0) {
			clearInterval(interval);
			onFinish();
		}
	}, 1000);
</script>

<div
	transition:fade
	class="w-[100vw] h-[100vh] px-[10vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] relative flex flex-row justify-between items-center font-line-seed overflow-hidden"
>
	<!-- <div
		style="background-color: #FFD281; background-image: url('{$chatContext?.conversation.avatar
			.models.neutral}')"
		class="w-[10vw] h-[10vw] bg-top bg-cover rounded-full border border-white"
	/> -->
	<video autoplay muted loop class="absolute left-0 top-0 w-full h-full object-cover">
		<source src={background} type="video/mp4" />
	</video>

	<div class="absolute left-[50%] translate-x-[-50%] flex flex-col items-center text-white text-[1.5vw] font-bold">
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
