<script lang="ts">
	import background from '$lib/images/bgvd.mp4';
	import icon from '$lib/images/learnliko_icon.png';
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

	<div class="flex flex-row items-center">
		<img src={icon} class="w-[7vw]" alt="Learnliko" />

		<div class="ml-[2vw] text-[2.5vw]">เพิ่มข้อมูลของคุณ</div>
	</div>

	<input
		placeholder="ชื่อจริง"
		style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset;"
		class="mt-[4vw] w-[25vw] rounded-full px-[1vw] py-[0.5vw] text-center text-[1.5vw]"
	/>
	<input
		placeholder="นามสกุล"
		style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.10) inset;"
		class="mt-[1vw] w-[25vw] rounded-full px-[1vw] py-[0.5vw] text-center text-[1.5vw]"
	/>

	<button
		class="mt-[4vw] w-[25vw] rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] py-[0.5vw] text-[1.5vw] text-white"
	>
		เริ่มเรียน
	</button>
</div>
