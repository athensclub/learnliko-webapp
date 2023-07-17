<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import convTaskImage from './coversation_task_image.png';
	import readingTaskImage from './reading_task_image.png';
	import vocabTaskImage from './vocab_task_image.png';
	import icon from '$lib/images/learnliko_icon.png';
	import LessonCard from '$lib/components/LessonCard.svelte';
	import type { PersonalizedLessonCard } from '$gql/generated/graphql';
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import { onMount } from 'svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { browser } from '$app/environment';
	import background from '$lib/images/bgvd.mp4';
	import { getLessonById, getLessonCards } from '$api/lesson';
	import { lastPlayedLessonIdLocal, learnedVocabLocal } from '$lib/localdb/profileLocal';
	import userSession from '$lib/stores/userSession';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';

	let items: PersonalizedLessonCard[] | null = null;
	let lastPlayed: PersonalizedLessonCard | null = null;
	const loadData = async () => {
		if (!browser) return;

		items = await getLessonCards({
			baseLevel: $userSession.accountData?.languageLevel?.overall.level!,
			excludeCompleted: true,
			includeProgressOf: $userSession.accountData?.uid!
		});

		if ($lastPlayedLessonIdLocal !== null)
			lastPlayed = await getLessonById(
				$lastPlayedLessonIdLocal,
				$userSession.accountData?.languageLevel?.overall.level!,
				$userSession.accountData?.uid!
			);
		if (lastPlayed?.status === 'COMPLETED') {
			lastPlayed = null;
			$lastPlayedLessonIdLocal = null;
		}
	};

	onMount(loadData);
	// $: $currentMode, loadData();
</script>

<div class="h-full min-h-[100vh] w-[100vw] bg-[#F4F4F4] font-line-seed">
	<video
		autoplay
		muted
		loop
		class="absolute left-0 top-0 h-full w-full object-cover blur-sm brightness-105"
	>
		<source src={background} type="video/mp4" />
	</video>

	<NavBar />

	<div
		class={`${
			$isMobile
				? 'sticky top-0 z-[1000] w-[100vw] gap-[1.6vh] px-[5vw] py-[1vh]'
				: 'fixed right-0 top-0 h-[100vh] w-[23vw] px-[2vw] py-[4vh] '
		} flex flex-col bg-white/70 font-bold shadow-sm backdrop-blur-sm`}
	>
		{#if $isMobile}
			<div class="flex w-full flex-row justify-between">
				<img class="h-[8vw] w-[8vw]" src={icon} alt="Learnliko" />

				<a href="/profile">
					<div
						style="background-image: url('{userProfileImage}');"
						class="h-[8vw] w-[8vw] rounded-full bg-cover bg-center"
					/>
				</a>
			</div>

			<div class="text-[4vw]">ความคืบหน้ารายวัน</div>

			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-[2vw]">
					<img class="w-[12vw]" src={vocabTaskImage} alt="Conversation" />

					<div class="flex flex-col">
						<div class="text-[4.5vw]">คำศัพท์วันนี้</div>
						
						<div class="bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] bg-clip-text text-transparent">
							<div class="inline-block text-[4.5vw]">{$learnedVocabLocal?.length}</div>
							<div class="inline-block text-[3vw]">คำ</div>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<div class="text-[1.8vw]">เลือกเรื่องราวเพื่อเรียนรู้</div>

			<div class="mt-[1.2vw] flex w-full flex-col">
				<div class="text-[1.2vw]">ความคืบหน้ารายวัน</div>

				<div class="flex w-full flex-row rounded-[1vw] bg-[#F8F8F8] p-[2vw]">
					<img class="w-[40%]" src={vocabTaskImage} alt="Study Vocabularies" />

					<div class="ml-[1vw] flex h-full flex-col">
						<div class="text-[1.5vw]">คำศัพท์วันนี้</div>
						<div class="bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] bg-clip-text text-transparent">
							<div class="inline-block text-[3vw]">{$learnedVocabLocal?.length}</div>
							<div class="inline-block text-[1.35vw]">คำ</div>
						</div>
					</div>
				</div>
			</div>

			<!-- {#if lastPlayed}
				<div class="mt-[1.2vw] flex w-full flex-col">
					<div class="text-[1.2vw]">เล่นต่อเรื่องราวล่าสุด</div>

					<LessonCard
						scale={0.5}
						progress={lastPlayed.progress}
						difficulty={lastPlayed.difficulty}
						item={lastPlayed.card}
						class="h-[calc(56vh-3.5vw)] w-full"
					/>
				</div>
			{/if} -->
		{/if}
	</div>

	{#if $isMobile}
		<!-- Top spacing (because of topbar) -->
		<div class="h-[15vh] w-full" />
	{/if}

	<div
		class={`pointer-events-none fixed left-0 top-0 z-[100] h-[100vh] w-[100vw] snap-y snap-mandatory overflow-y-auto`}
	>
		{#if items}
			<div
				class={`pointer-events-auto mx-auto ${
					$isMobile ? 'w-full py-[15vh]' : 'w-[54vw] pb-[10vh] pt-0'
				}`}
			>
				{#each items as item (item)}
					<LessonCard
						item={item.card}
						progress={item.progress}
						difficulty={item.difficulty}
						class="mx-auto mt-[calc(48vh-19vw)] snap-center {$isMobile
							? 'h-[115vw] w-[75vw]'
							: 'h-[38vw] w-[27vw]'}"
					/>
				{/each}
			</div>
		{:else}
			<div
				class="pointer-events-none flex h-full w-full flex-row items-center justify-center text-[2.5vw]"
			>
				กำลังโหลด<Typewriter mode="loop">...</Typewriter>
			</div>
		{/if}
	</div>
</div>
