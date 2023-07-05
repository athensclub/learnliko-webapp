<script lang="ts">
	export let item = {
		name: 'Ammy',
		role: 'เพื่อนนักเรียน',
		avatar:
			'https://cdn.discordapp.com/attachments/842737146321174558/1124658451738533959/image.png',
		background:
			'https://cdn.discordapp.com/attachments/842737146321174558/1123691473804738620/image.png',
		unlocked: true
	};

	let clazz = '';
	export {clazz as class};
</script>

<div
	style="background-image: url('{item.background}');"
	class="relative flex flex-row justify-between overflow-hidden rounded-[2vw] bg-cover bg-center {clazz}"
>
	<div
		class="flex flex-col items-start justify-center bg-gradient-to-r from-black/60 via-black/40 to-transparent p-[2vw] font-bold text-white"
	>
		<div class="text-[2.5vw]">{item.name}</div>
		<div class="text-[1.6vw]">{item.role}</div>

		<button class="mt-[1vw] rounded-full bg-white px-[2vw] py-[0.5vw] text-[1.35vw] text-black">
			ดูประวัติการคุย
		</button>
	</div>

	<div
		class="flex h-full flex-col justify-end bg-gradient-to-l from-black/60 via-black/40 to-transparent px-[2vw]"
	>
		<img src={item.avatar} class="h-full" alt="Avatar" />
	</div>

	{#if !item.unlocked}
		<div
			class="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-[#0000004D] backdrop-blur-md"
		>
			<img src={item.background} class="h-[50%] rounded-[1vw]" alt="Lesson Background" />
			<div class="mt-[1.5vw] text-[1.35vw] font-bold text-white">เข้าสู่เรื่องราวเพื่อปลดล๊อค</div>
		</div>
	{/if}
</div>
