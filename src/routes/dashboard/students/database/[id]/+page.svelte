<script lang="ts">
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { page } from '$app/stores';
	import { queryLearnersByExp } from '$lib/temp/analytic';
	import type { User } from '$gql/graphql';
	import { onMount } from 'svelte';

	let leaderboard: User[] = [];

	onMount(() => {
		queryLearnersByExp($page.params.id).then((learners) => {
			learners.forEach((data) => {
				if (data.profile) {
					leaderboard.push(data);
				}
			});
			leaderboard = leaderboard;
		});
	});
</script>

<div class="flex w-full flex-row bg-[#F4F4F4] font-line-seed">
	<NavBar spaced teacher />

	<div
		class="mx-auto mt-[3vw] h-[38vw] w-[70vw] overflow-scroll overflow-x-hidden rounded-[1.25vw] bg-white pb-[3vw] shadow-lg"
	>
		<h1 class=" px-[1vw] py-[1vw] text-[1.5vw] font-bold">Classroom1</h1>

		<div class="flex h-full w-[100%] flex-col rounded-[2vw] bg-white font-bold">
			<div class="flex flex-col gap-[1vw] overflow-y-auto px-[0.8vw]">
				{#each leaderboard as user, index (index)}
					<!-- Somehow I have to specify the min height to fix the height -->
					<div
						style="background-image: url('{user.profile?.coverUrl ??
							'https://cdn.discordapp.com/attachments/842737146321174558/1124288705864155216/image.png'}');"
						class="flex h-[5.5vw] w-full flex-row items-center justify-between rounded-[1vw] bg-cover bg-center px-[1vw]"
					>
						<div class="flex h-full flex-row items-center gap-[0.5vw]">
							<div
								style="background-image: url('{user.profile?.imageUrl ??
									'https://cdn.discordapp.com/attachments/842737146321174558/1122773960019423262/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'}');"
								class="aspect-square h-[50%] rounded-full border-[0.05vw] border-white bg-cover bg-center"
							/>
							<div
								class="flex h-fit max-w-[25vw] items-center rounded-full bg-white px-[1vw] py-[0.3vw]"
							>
								<!-- Somehow putting text inside another layer of div make ellipsis works -->
								<div class="w-fit truncate whitespace-nowrap text-[1vw]">
									{user.profile?.firstname}
								</div>
							</div>
						</div>

						<div
							class="flex h-fit flex-row rounded-full bg-white px-[0.5vw] py-[0.3vw] text-[0.5vw]"
						>
							<div
								class="ml-[0.3vw] bg-gradient-to-r from-[#C698FF] to-[#6C80E8] bg-clip-text text-[0.7vw] text-transparent"
							>
								CEFR {user.languageLevel?.overall.level}
							</div>
						</div>
						<!-- <h1 class="text-[1vw] text-white underline">view profile</h1> -->
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
