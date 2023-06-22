<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PretestCEFRLevel } from '$lib/types/pretest';
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';

	export let level: PretestCEFRLevel;

	const { close }: Context = getContext('simple-modal');
	const startUsingLearnliko = () => {
		goto('/discover');
		close();
	};
</script>

<div class="w-full py-[3vw] bg-white font-line-seed flex flex-col items-center">
	<div class="text-[2.8vw] mt-[2vw]">ยินดีด้วย</div>
	<div class="text-[2vw] mt-[4vw]">ระดับของคุณคือ</div>
	<div
		class="text-[3.5vw] mt-[1vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
	>
		{level}
	</div>
	<button
		on:click={startUsingLearnliko}
		class="text-[1.7vw] px-[3vw] py-[0.8vw] mt-[4vw] rounded-full text-center text-white font-bold bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
	>
		เริ่มใช้งาน Learnliko
	</button>
</div>
