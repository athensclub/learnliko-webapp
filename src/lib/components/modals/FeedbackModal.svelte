<script lang="ts">
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';

	const { close }: Context = getContext('simple-modal');
	const handleConfirmClicked = () => {
		close();
	};
</script>

<div class="flex h-full w-full flex-col items-center bg-white p-[2vw] font-line-seed rounded-[10vh] py-[45vw]">
	<div class="text-[15vw]">📝</div>
	<div class="mt-[8vw] text-center text-[7vw] font-bold">
		ช่วยเราทำแบบสอบถามเพื่อการพัฒนา Learnliko
	</div>

	<a
		href="http://www.example.com"
		target="_blank"
		class="mt-[8vw] rounded-full border-[0.2vw] border-black px-[8vw] py-[1.5vw] text-[5.5vw] font-bold"
	>
		ทำแบบสอบถาม
	</a>
</div>
