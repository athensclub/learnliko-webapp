<script lang="ts">
	import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';
	import Select from 'svelte-select/Select.svelte';
	import AddReadingQuiz from './AddReadingQuiz.svelte';
	import AddConversationGoal from './AddConversationGoal.svelte';
	import { CREATE_BOT_AVATAR, CREATE_CONVERSATION_CARD } from '$gql/schema/mutations';
	import { graphqlClient } from '$lib/graphql';
	import type { LanguageLevel, LearnerGoalDataInput } from '$gql/generated/graphql';

	export let coin: number;
	export let exp: number;
	export let level: LanguageLevel;

	export let index: number;

	export const upload = async () => {
		const botResult = await graphqlClient
			.mutation(CREATE_BOT_AVATAR, {
				data: {
					accent,
					gender,
					avatarModels: {
						anger: avatarImage,
						anticipation: avatarImage,
						disgust: avatarImage,
						fear: avatarImage,
						joy: avatarImage,
						neutral: avatarImage,
						sadness: avatarImage,
						surprise: avatarImage,
						trust: avatarImage
					},
					name: avatarName
				}
			})
			.toPromise();

		const result = await graphqlClient
			.mutation(CREATE_CONVERSATION_CARD, {
				data: {
					backgroundUrl: 'unknown',
					bot: {
						avatar: botResult.data?.botAvatarCreate.id ?? 'unknown',
						intro: introduction,
						prompt
					},
					fromLesson: 'unknown',
					learner: { mission, goal: goalGetters.map((g) => g()) },
					level,
					title: 'unknown',
					totalCoin: goalGetters.length * coin,
					totalExp: goalGetters.length * exp
				}
			})
			.toPromise();
		return {
			accent,
			gender,
			id: result.data?.conversationCardCreate.id,
			botId: botResult.data?.botAvatarCreate.id,
			totalCoin: goalGetters.length * coin,
			totalExp: goalGetters.length * exp
		};
	};

	let mission = '';
	let prompt = '';

	let avatarName = '';
	let avatarImage = '';
	let introduction = '';

	let accents: SynthesizeAccent[] = ['Australia', 'India', 'UK', 'US'];
	let genders: SynthesizeGender[] = ['FEMALE', 'MALE'];

	let accent: SynthesizeAccent = 'US';
	let gender: SynthesizeGender = 'FEMALE';

	let goalIDs: number[] = [];
	let goalGetters: (() => LearnerGoalDataInput)[] = [];
</script>

<div class="flex w-[30vw] flex-col gap-[2vw] border border-[#00000033] p-[2vw]">
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={mission}
		placeholder="Add mission"
	/>

	{#each goalIDs as id, index (id)}
		<AddConversationGoal {coin} {exp} {index} bind:getValue={goalGetters[index]} />
	{/each}

	<button
		on:click={() => (goalIDs = [...goalIDs, goalIDs.length])}
		class="bg-black py-[0.5vw] text-white">Add Goal</button
	>

	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={avatarName}
		placeholder="Add avatar name"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={avatarImage}
		placeholder="Add avatar image url"
	/>
	<input
		class="border border-[#00000033] px-[1vw] py-[0.3vw]"
		bind:value={introduction}
		placeholder="Add introduction sentence"
	/>

	<textarea
		bind:value={prompt}
		class="h-[25vw] w-full border border-[#00000033] px-[1vw] py-[0.3vw]"
		placeholder="Add prompt"
	/>

	<Select items={genders} value={gender} />
	<Select items={accents} value={accent} />
</div>
