<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import EnteringLesson from '$lib/components/loading/EnteringLesson.svelte';
	import { chatContext } from '$lib/global/chatbox';
	import { fade } from 'svelte/transition';
	import FlipCardView from './FlipCardView.svelte';
	import LessonConversationView from './LessonConversationView.svelte';
	import LessonIntros from './LessonIntros.svelte';
	import ReadingView from './ReadingView.svelte';
	import WritingCardView from './WritingCardView.svelte';
	import LessonFinishedView from './LessonFinishedView.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getLessonById } from '$api/lesson';
	import { lastPlayedLessonIdLocal, totalVocabLocal } from '$lib/localdb/profileLocal';
	import {
		QuizType,
		type LessonCard,
		type ReadingCard,
		type SentenceCard,
		type VocabularyCard,
		type ConversationCard
	} from '$gql/generated/graphql';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import userSession from '$lib/stores/userSession';
	import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';
	import audio from '$lib/audios/entering_lesson_transition_sound.wav';
	import { Howl } from 'howler';

	let item: LessonCard | null = null;
	let background: string | null = null;

	let music: Howl | null = null;

	let vocabs: VocabularyCard[] | null = null;
	let sentences: SentenceCard[] | null = null;
	// TODO: support multiple reading items?
	let reading: ReadingCard | null = null;
	let conversation: ConversationCard | null = null;

	onMount(async () => {
		let content = await getLessonById(
			$page.params.id,
			$userSession.accountData?.languageLevel?.overall.level!,
			undefined,
			true
		);
		if (!content.card) throw new Error('No Lesson Found');
		item = content.card;

		music = new Howl({ src: item.ambientAudio, volume: 0.06, loop: true });

		vocabs =
			item.quizeSections
				.find((section) => section.type === QuizType.Vocabulary)
				?.cards.map((card) => {
					return { ...card, fromLesson: item?.id! } as VocabularyCard;
				}) ?? null;

		sentences =
			item.quizeSections
				.find((section) => section.type === QuizType.Sentence)
				?.cards.map((card) => {
					return { ...card, fromLesson: item?.id! } as SentenceCard;
				}) ?? null;

		// TODO: support multiple reading item?
		reading =
			item.quizeSections
				.find((section) => section.type === QuizType.Reading)
				?.cards.map((card) => {
					return { ...card, fromLesson: item?.id! } as ReadingCard;
				})[0] ?? null;

		// TODO: support multiple conversation item?
		conversation =
			item.quizeSections
				.find((section) => section.type === QuizType.Conversation)
				?.cards.map((card) => {
					return { ...card, fromLesson: item?.id! } as ConversationCard;
				})[0] ?? null;

		$chatContext = {
			conversation: {
				avatar: {
					name: conversation?.bot.avatar.name ?? 'unknown',
					models: conversation?.bot.avatar.avatarModels!
				},
				CEFRlevel: item.level,
				details: {
					bot: {
						accent: conversation?.bot.avatar.accent as SynthesizeAccent,
						avatar: conversation?.bot.avatar.avatarModels.neutral ?? 'unknown',
						gender: conversation?.bot.avatar.gender as SynthesizeGender,
						prompt: conversation?.bot.prompt ?? 'unknown'
					},
					intro: conversation?.bot.intro ?? 'unknown',
					learner: {
						mission: conversation?.learner.mission ?? 'unknown',
						goal: conversation?.learner.goal.map((g) => g.goal) ?? [],
						hint: conversation?.learner.goal.map((g) => g.hint) ?? []
					},
					image: ''
				},
				intro: conversation?.bot.intro ?? 'unknown',
				image: '',
				topic: '',
				background: '',
				fromLesson: conversation?.fromLesson ?? '',
				id: conversation?.id ?? ''
			},
			bot: { emotion: 'neutral' }
		};
		$lastPlayedLessonIdLocal = item.id;
	});

	let entering = true;

	const MUSIC_FADE_DURATION = 1000; // ms
	let playingMusic = true;
	$: if (!entering && playingMusic) {
		music?.play();
		music?.fade(0, 0.06, MUSIC_FADE_DURATION);
	} else {
		music?.fade(0.06, 0, MUSIC_FADE_DURATION);
		setTimeout(() => {
			music?.pause();
		}, MUSIC_FADE_DURATION);
	}

	let currentView:
		| 'INTRO'
		| 'FLIP_CARD'
		| 'WRITING_CARD'
		| 'READING'
		| 'CONVERSATION'
		| 'FINISHED' = 'INTRO';

	const onFinishedLesson = () => {
		$totalVocabLocal = ($totalVocabLocal ?? 0) + 15;
		currentView = 'FINISHED';
		$lastPlayedLessonIdLocal = null;
	};

	onDestroy(() => {
		music?.stop();
	});

	let progress = 0;
	const addProgress = (val: number) => (progress = progress + val);
</script>

<div
	style="background-image: url('{background}');"
	class="relative flex h-full min-h-[100vh] w-[100vw] flex-col bg-cover bg-center font-line-seed transition-[background-image]"
>
	<div
		class="flex flex-row justify-between bg-gradient-to-t from-transparent via-black/60 to-black/80 p-[2vw]"
	>
		<button
			on:click={() => window.history.back()}
			class="flex flex-row rounded-full bg-white px-[2vw] py-[1.5vh]"
		>
			<svg class="w-[4.5vw]" viewBox="0 0 78 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_1176_2335)">
					<path
						d="M36.3671 19.1666C36.1692 19.1666 36.0703 19.067 36.0703 18.8676V2.58365C36.0703 2.38431 36.1692 2.28465 36.3671 2.28465H46.9599C47.1577 2.28465 47.2567 2.38431 47.2567 2.58365V4.90665C47.2567 5.10598 47.1577 5.20565 46.9599 5.20565H39.1523V9.04665H46.2065C46.4044 9.04665 46.5033 9.14631 46.5033 9.34565V11.6226C46.5033 11.822 46.4044 11.9216 46.2065 11.9216H39.1523V16.2456H47.2338C47.4317 16.2456 47.5306 16.3453 47.5306 16.5446V18.8676C47.5306 19.067 47.4317 19.1666 47.2338 19.1666H36.3671ZM49.1998 19.1666C49.0324 19.1666 48.9487 19.1053 48.9487 18.9826C48.9487 18.9213 48.9715 18.86 49.0172 18.7986L53.0123 13.0486L49.2455 7.62065C49.1998 7.54398 49.177 7.48265 49.177 7.43665C49.177 7.31398 49.2607 7.25265 49.4281 7.25265H52.1448C52.297 7.25265 52.4187 7.31398 52.5101 7.43665L54.8843 10.9786L57.2814 7.43665C57.3727 7.31398 57.4944 7.25265 57.6466 7.25265H60.1807C60.3481 7.25265 60.4318 7.31398 60.4318 7.43665C60.4318 7.48265 60.409 7.54398 60.3633 7.62065L56.5965 13.0486L60.5916 18.7986C60.6373 18.86 60.6601 18.9213 60.6601 18.9826C60.6601 19.1053 60.5764 19.1666 60.409 19.1666H57.6923C57.5401 19.1666 57.4183 19.1053 57.327 18.9826L54.7245 15.0956L52.0991 18.9826C52.0078 19.1053 51.8861 19.1666 51.7339 19.1666H49.1998ZM64.234 5.13665C63.7318 5.13665 63.3132 4.98331 62.9784 4.67665C62.6588 4.36998 62.499 3.97131 62.499 3.48065C62.499 2.98998 62.6588 2.59131 62.9784 2.28465C63.3132 1.97798 63.7318 1.82465 64.234 1.82465C64.7363 1.82465 65.1472 1.97798 65.4668 2.28465C65.8016 2.59131 65.969 2.98998 65.969 3.48065C65.969 3.97131 65.8016 4.36998 65.4668 4.67665C65.1472 4.98331 64.7363 5.13665 64.234 5.13665ZM63.0469 19.1666C62.849 19.1666 62.7501 19.067 62.7501 18.8676V7.55165C62.7501 7.35231 62.849 7.25265 63.0469 7.25265H65.4211C65.619 7.25265 65.7179 7.35231 65.7179 7.55165V18.8676C65.7179 19.067 65.619 19.1666 65.4211 19.1666H63.0469ZM73.4257 19.3966C72.132 19.3966 71.1427 18.9903 70.4579 18.1776C69.7882 17.365 69.4534 16.1613 69.4534 14.5666V9.92065H67.7183C67.5205 9.92065 67.4216 9.82098 67.4216 9.62165V7.55165C67.4216 7.35231 67.5205 7.25265 67.7183 7.25265H69.4534V4.05565C69.4534 3.85631 69.5523 3.75665 69.7501 3.75665H72.1244C72.3222 3.75665 72.4212 3.85631 72.4212 4.05565V7.25265H75.2292C75.427 7.25265 75.526 7.35231 75.526 7.55165V9.62165C75.526 9.82098 75.427 9.92065 75.2292 9.92065H72.4212V14.7506C72.4212 15.3946 72.5277 15.8776 72.7408 16.1996C72.9539 16.5216 73.2887 16.6826 73.7453 16.6826C74.1258 16.6826 74.4225 16.491 74.6356 16.1076C74.7421 15.9236 74.8791 15.8776 75.0465 15.9696L76.8272 16.7746C76.9338 16.8206 76.987 16.905 76.987 17.0276C76.987 17.089 76.9642 17.1656 76.9185 17.2576C76.5228 17.9936 76.0206 18.538 75.4118 18.8906C74.803 19.228 74.141 19.3966 73.4257 19.3966Z"
						fill="black"
					/>
					<path d="M0.672852 1.23901L21.5998 22.3223" stroke="black" stroke-width="3" />
					<path d="M21.5998 0.677673L0.672852 21.7611" stroke="black" stroke-width="3" />
				</g>
				<defs>
					<clipPath id="clip0_1176_2335">
						<rect width="78" height="23" fill="white" />
					</clipPath>
				</defs>
			</svg>
		</button>

		<div class="text-[1.7vw] font-bold text-white">{item && item.title}</div>

		<button
			on:click={() => (playingMusic = !playingMusic)}
			class="flex flex-row items-center justify-center rounded-full bg-white px-[1.5vw] py-[1vh] text-[1.35vw] font-bold"
		>
			{#if playingMusic}
				<svg
					class="mr-[1vw] w-[1.5vw]"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M24 0V14.1539C24 16.8727 21.8508 19.077 19.2 19.077C16.5492 19.077 14.4 16.8727 14.4 14.1539C14.4 11.4351 16.5492 9.23086 19.2 9.23086C20.0748 9.23086 20.8944 9.4707 21.6 9.88916V2.46152H9.6V19.077C9.6 21.7957 7.4508 24 4.8 24C2.1492 24 0 21.7957 0 19.077C0 16.3582 2.1492 14.1539 4.8 14.1539C5.6748 14.1539 6.4944 14.3937 7.2 14.8122V0H24Z"
						fill="black"
					/>
				</svg>
			{:else}
				<svg
					class="mr-[0.7vw] w-[2.05vw]"
					viewBox="0 0 38 38"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M31 7V21.1539C31 23.8727 28.8508 26.077 26.2 26.077C23.5492 26.077 21.4 23.8727 21.4 21.1539C21.4 18.4351 23.5492 16.2309 26.2 16.2309C27.0748 16.2309 27.8944 16.4707 28.6 16.8892V9.46152H16.6V26.077C16.6 28.7957 14.4508 31 11.8 31C9.1492 31 7 28.7957 7 26.077C7 23.3582 9.1492 21.1539 11.8 21.1539C12.6748 21.1539 13.4944 21.3937 14.2 21.8122V7H31Z"
						fill="black"
					/>
					<path d="M2 36L36 2" stroke="black" stroke-width="3" stroke-linecap="round" />
				</svg>
			{/if}

			เสียงเพลง
		</button>
	</div>

	{#if entering}
		<EnteringLesson onFinish={() => (entering = false)} />
	{/if}

	{#if item}
		{#if currentView === 'INTRO'}
			<LessonIntros
				onFinish={() => (currentView = 'FLIP_CARD')}
				setBackground={(image) => (background = image)}
				items={item.narratives}
			/>
		{:else if currentView === 'FLIP_CARD'}
			{#if vocabs}
				<FlipCardView
					items={vocabs}
					{addProgress}
					onFinish={() => (currentView = 'WRITING_CARD')}
				/>
			{:else}
				<div class="bg-white text-[3vw] text-black">
					Loading<Typewriter mode="loop">...</Typewriter>
				</div>
			{/if}
		{:else if currentView === 'WRITING_CARD'}
			{#if sentences}
				<WritingCardView
					items={sentences}
					{addProgress}
					onFinish={() => (currentView = 'READING')}
				/>
			{:else}
				<div class="bg-white text-[3vw] text-black">
					Loading<Typewriter mode="loop">...</Typewriter>
				</div>
			{/if}
		{:else if currentView === 'READING'}
			<!-- TODO: support multiple reading items? -->
			{#if reading}
				<ReadingView
					item={reading}
					onFinish={() => {
						addProgress(1 / 4);
						currentView = 'CONVERSATION';
					}}
				/>
			{:else}
				<div class="bg-white text-[3vw] text-black">
					Loading<Typewriter mode="loop">...</Typewriter>
				</div>
			{/if}
		{:else if currentView === 'CONVERSATION'}
			<LessonConversationView
				onFinish={() => {
					progress = 1;
					onFinishedLesson();
				}}
			/>
		{:else if currentView === 'FINISHED'}
			<LessonFinishedView
		
				avatar="https://cdn.discordapp.com/attachments/842737146321174558/1124658451738533959/image.png"
			/>
		{/if}
	{/if}

	{#if currentView != 'INTRO'}
		<div
			transition:fade
			class="absolute bottom-0 left-0 z-[100] w-full bg-[#FFFFFF1A] px-[2vw] py-[2vh] backdrop-blur-md"
		>
			<div class="flex flex-row justify-between text-[1.3vw] font-bold text-white">
				<div>รู้จักคำศัพท์</div>
				<div>รู้จักประโยค</div>
				<div>อ่านเรื่องราว</div>
				<div>พูดคุย</div>
				<div>จบ</div>
			</div>

			<div class="mt-[2vh] h-[1.7vw] w-full rounded-full bg-white">
				<div
					style="width: {progress * 100}%;"
					class="h-full rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] transition-size"
				/>
			</div>
		</div>
	{/if}
</div>
