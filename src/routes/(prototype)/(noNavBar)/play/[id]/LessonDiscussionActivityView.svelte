<script lang="ts">
	import type { SynthesizeAccent, SynthesizeGender } from '$api/tts';
	import type { Activity, DialogueCard, DiscussionCard } from '$gql/generated/graphql';
	import ChatView from '$lib/components/chatbox/ChatView.svelte';
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import { chatContext } from '$lib/global/chatbox';
	import { conversationFinished } from '$lib/global/conversation';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let data: Activity;
	let item = data.cards[0] as DiscussionCard;

	export let addProgress: (val: number) => void;
	export let onFinish: () => void;

	const finish = () => {
		addProgress(1);
		onFinish();
	};
</script>

<div
	transition:fade
	class="pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center overflow-hidden"
>
	<div
		transition:fly={{ y: 800, duration: 800 }}
		class={`pointer-events-auto absolute flex h-[57%] w-[85%] flex-col items-center overflow-hidden rounded-[5vw] border-[1px] border-b-0 border-black/10 bg-transparent bg-white font-line-seed`}
	>
		<div
			style="box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.10);"
			class="flex w-full items-center justify-center p-[4vw] text-[4.5vw] font-bold"
		>
			<button
				on:click={finish}
				class="absolute right-[3vw] rounded-full border-[0.2vw] border-[#BBBBBB] p-[1vw]"
			>
				<svg class="w-[2.5vw]" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<line x1="6.35355" y1="0.982215" x2="0.353553" y2="6.98222" stroke="#BBBBBB" />
					<line x1="0.353553" y1="1.01803" x2="6.35355" y2="7.01803" stroke="#BBBBBB" />
				</svg>
			</button>
			{item.title}
		</div>
		<!-- Can't type cast :( -->
		<ChatView
			prompt={item.bot.prompt}
			intro={item.bot.intro}
			aiName={item.bot.name}
			aiImage={item.bot.avatar}
			aiBackground={'transparent'}
			gender={item.bot.gender}
			accent={item.bot.accent}
		/>
	</div>
</div>
