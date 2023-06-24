<script lang="ts">
	import { chatContext } from '$lib/global/chatbox';
	import { fade } from 'svelte/transition';

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
	class="w-[100vw] h-[100vh] px-[10vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] flex flex-row justify-between items-center font-line-seed"
>
	<div
		style="background-color: #FFD281; background-image: url('{$chatContext?.conversation.avatar
			.models.neutral}')"
		class="w-[10vw] h-[10vw] bg-top bg-cover rounded-full border border-white"
	/>

	<div class="flex flex-col items-center text-white text-[1.5vw] font-bold">
		จะถึงภายใน {countdown} วินาที
		<iframe
			title="Moving Car"
			class="w-[35vw] h-[35vw] my-[2vh] rounded-[4vw]"
			src="https://rive.app/community/110-170-flying-car/embed"
		/>
		กำลังเดินทางไปยังเพื่อนของคุณ เตรียมตัวให้พร้อม
	</div>

	<div
		style="background-image: url('{$chatContext?.conversation.background}')"
		class="w-[10vw] h-[10vw] bg-center bg-cover rounded-full border border-white"
	/>
</div>
