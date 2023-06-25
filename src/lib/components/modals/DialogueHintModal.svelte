<script lang="ts">
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';

	const { close }: Context = getContext('simple-modal');
	const handleConfirmClicked = () => {
		close();
	};
</script>

<div class="w-full h-full bg-white font-line-seed flex flex-col p-4">
	<div class="font-bold text-7xl text-center text-[#6C80E8] mt-4">?</div>
	<div class="font-bold text-2xl text-center my-2">ใช้ความช่วยเหลือ</div>
	<div class="text-lg mt-1 text-center mb-16">
		คุณจะได้รับคำใบ้แต่จะได้เหรียญ
		<br />
		น้อยลงหากใช้ความช่วยเหลือ
	</div>

	<button
		on:click={handleConfirmClicked}
		class="px-1 py-2 mr-3 text-xl font-bold border border-black rounded-3xl">ฉันต้องการคำใบ้</button
	>
</div>
