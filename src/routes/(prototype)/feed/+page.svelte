<script lang="ts">
	import { getLessonCards } from '$api/lesson';
	import { goto } from '$app/navigation';
	import type { Lesson } from '$gql/generated/graphql';
	import LessonCard from '$lib/components/LessonCard.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import icon from '$lib/images/learnliko_icon.png';
	import { getLocalProgress } from '$lib/localdb/lessonProgressLocal';
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { fade } from 'svelte/transition';

	type DisplayLesson = { lesson: Lesson; progress: number };

	let lessons: DisplayLesson[] | null = null;
	let totalLessons: DisplayLesson[] | null = null;
	onMount(async () => {
		const _lessons: Lesson[] = await getLessonCards();
		totalLessons = _lessons.map((e) => {
			return {
				lesson: e,
				progress: (getLocalProgress(e.id)?.progress ?? 0) * 100
			};
		});
	});

	let currentView: 'EXPLORE' | 'STUDIED' = 'EXPLORE';
	$: if (currentView === 'EXPLORE') {
		lessons = totalLessons?.filter((e) => Math.round(e.progress) < 100) ?? [];
	} else {
		lessons = totalLessons?.filter((e) => Math.round(e.progress) >= 100) ?? [];
	}

	let displayedLessons: DisplayLesson[] | null = null;

	let tags = ['ทั้งหมด', '🤝ภาษาอังกฤษ', '💻เขียนโปรแกรม'];
	let selectedTagIndex = 0;
	const updateTagFilter = () => {
		// TODO: implement more general version of this
		if (selectedTagIndex === 0) {
			displayedLessons = lessons;
		} else if (selectedTagIndex === 1) {
			displayedLessons = lessons?.filter((l) => l.lesson.course.subject.id === 'english') ?? null;
		} else if (selectedTagIndex === 2) {
			displayedLessons =
				lessons?.filter((l) => l.lesson.course.subject.id === 'programming') ?? null;
		}
	};
	$: selectedTagIndex, lessons, updateTagFilter();
</script>

<!-- Top Navbar -->
<header
	style="box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);"
	class="flex flex-row justify-between p-[4vw] font-line-seed"
>
	<img class="h-8 w-8" src={icon} alt="Learnliko Logo" />

	<div class="flex flex-row text-[4.5vw] font-bold">
		<button
			on:click={() => (currentView = 'EXPLORE')}
			class="px-[3vw] {currentView === 'EXPLORE'
				? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] bg-clip-text text-transparent'
				: 'text-black/[0.34]'}"
		>
			Explore
		</button>

		<div class="my-auto h-[80%] w-[0.2vw] bg-[#252525]/[0.15]" />

		<button
			on:click={() => (currentView = 'STUDIED')}
			class="px-[3vw] {currentView === 'STUDIED'
				? 'bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] bg-clip-text text-transparent'
				: 'text-black/[0.20]'}"
		>
			Studied
		</button>
	</div>

	<button on:click={() => goto('/profile-details')}>
		<svg class="w-[6vw]" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="22" height="3" rx="1.5" fill="#1C1C1C" />
			<rect x="9" y="10" width="13" height="3" rx="1.5" fill="#1C1C1C" />
			<rect x="6" y="20" width="16" height="3" rx="1.5" fill="#1C1C1C" />
		</svg>
	</button>
</header>

<div class="flex w-full flex-1 flex-col font-line-seed">
	<div class="no-scrollbar mt-[6vw] flex flex-row gap-[3vw] overflow-x-auto px-[5vw]">
		{#each tags as tag, index}
			<button
				on:click={() => (selectedTagIndex = index)}
				class="whitespace-nowrap rounded-full px-[5.5vw] py-[2.5vw] pb-[3.5vw] text-[4.5vw] font-bold {selectedTagIndex ===
				index
					? 'bg-[#212121] text-white'
					: 'bg-[#F8F8F8] text-[#212121] '}"
			>
				{tag}
			</button>
		{/each}
	</div>

	{#if displayedLessons}
		<div class="flex h-full items-center">
			{#if displayedLessons.length > 0}
				<div
					in:fade={{ delay: 400 }}
					class={`no-scrollbar my-auto flex snap-x snap-mandatory flex-row gap-[5vw] overflow-x-auto px-[5vw] ${
						$isMobile ? 'w-full' : 'w-[54vw] pt-0'
					}`}
				>
					{#each displayedLessons as item (item.lesson.id)}
						<LessonCard
							item={item.lesson}
							progress={item.progress}
							class="snap-center {$isMobile
								? 'max-h-[120vw] min-h-[120vw] min-w-[86vw]'
								: 'mt-[calc(48vh-19vw)] h-[38vw] w-[27vw]'}"
						/>
					{/each}
				</div>
			{:else}
				<div
					in:fade={{ delay: 400 }}
					class="pointer-events-none flex h-full w-full flex-row items-center justify-center text-[5.4vw]"
				>
					ไม่มีบทเรียน
				</div>
			{/if}
		</div>
	{:else}
		<div
			class="pointer-events-none flex h-full w-full flex-row items-center justify-center text-[2.5vw]"
		>
			กำลังโหลด<Typewriter mode="loop">...</Typewriter>
		</div>
	{/if}
</div>
