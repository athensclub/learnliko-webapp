<script lang="ts">
	import userProfileImage from '$lib/images/sample_kid_image.png';
	import friend1 from '$lib/images/kids1.jpg';
	import friend2 from '$lib/images/kids2.jpg';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import hangbot from '$lib/images/hangbot_icon.png';
	import {
		friendsHistory,
		friendsInputMessage,
		sendFriendsMessage,
		waitingForFriendResponse
	} from '$lib/global/friends';
	import type { User } from '$gql/generated/graphql';
	import { queryLearnersByExp } from '$lib/temp/analytic';

	let leaderboard: User[] = [];
	queryLearnersByExp('classroom1').then((data) => {
		leaderboard = data.filter((e) => e.profile !== undefined);
	});
</script>

<div class="flex h-full min-h-[100vh] w-[100vw] flex-row bg-[#F4F4F4] font-line-seed">
	<NavBar spaced />

	<div
		class="flex h-[100vh] flex-1 flex-row gap-[4vw] bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] p-[3vw]"
	>
		<div class="flex h-full w-[40%] flex-col rounded-[2vw] bg-white font-bold">
			<div
				style="box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.25);"
				class="w-full py-[2vw] text-center text-[1.35vw]"
			>
				🏆 จัดอันดับผู้เรียนดีเด่นรายสัปดาห์
			</div>

			<div class="flex flex-col gap-[2vw] overflow-y-auto p-[2vw]">
				{#each leaderboard as user, index (index)}
					<!-- Somehow I have to specify the min height to fix the height -->
					<div
						style="background-image: url('{user.profile?.coverUrl ??
							'https://cdn.discordapp.com/attachments/842737146321174558/1124288705864155216/image.png'}');"
						class="flex h-[6vw] min-h-[6vw] w-full flex-row items-center justify-between rounded-[2vw] bg-cover bg-center p-[1vw]"
					>
						<div class="flex h-full flex-row items-center gap-[1vw]">
							<div
								style="background-image: url('{user.profile?.imageUrl ??
									'https://cdn.discordapp.com/attachments/842737146321174558/1122773960019423262/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'}');"
								class="aspect-square h-[80%] rounded-full border-[0.15vw] border-white bg-cover bg-center"
							/>
							<div
								class="flex h-fit max-w-[10vw] items-center rounded-full bg-white px-[1vw] py-[0.3vw]"
							>
								<!-- Somehow putting text inside another layer of div make ellipsis works -->
								<div class="w-fit truncate whitespace-nowrap text-[1.1vw]">
									{user.profile?.fullname}
								</div>
							</div>
						</div>

						<div class="flex h-fit flex-row rounded-full bg-white px-[0.5vw] py-[0.3vw] text-[1vw]">
							<svg
								class="w-[1vw]"
								viewBox="0 0 17 17"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.5 0L0 8.5L8.5 17L17 8.5L8.5 0ZM4.25 8.5L8.5 4.25L12.75 8.5L8.5 12.75L4.25 8.5Z"
									fill="url(#paint0_linear_1194_8403)"
								/>
								<defs>
									<linearGradient
										id="paint0_linear_1194_8403"
										x1="-0.159014"
										y1="0.160377"
										x2="11.0702"
										y2="20.3054"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#C698FF" />
										<stop offset="1" stop-color="#6C80E8" />
									</linearGradient>
								</defs>
							</svg>
							<div
								class="ml-[0.3vw] bg-gradient-to-r from-[#C698FF] to-[#6C80E8] bg-clip-text text-transparent"
							>
								{user.exp}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex h-full flex-1 flex-col gap-[1vw] rounded-[2vw] bg-white p-[1vw] font-bold">
			<div
				style="box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.25);"
				class="flex w-full flex-row items-center justify-between rounded-[1vw] p-[1vw]"
			>
				<div class="text-[1.5vw]">Let's Talk!</div>

				<a
					href="/friends/hangbot"
					class="relative flex flex-row items-center rounded-[1vw] bg-gradient-to-br from-[#C698FF] to-[#6C80E8] p-[1.5vw]"
				>
					<svg
						class="absolute right-[1vw] top-[1vw] w-[1vw]"
						viewBox="0 0 22 14"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M21.933 9.53576L20.6543 4.09763C20.0066 1.68055 17.8163 0 15.3138 0H6.6861C4.18364 0 1.99339 1.68051 1.34573 4.09763L0.0669751 9.53576C-0.260361 11.0957 0.640179 12.652 2.15637 13.1452L2.23114 13.1692C3.63442 13.626 5.16539 13.0372 5.90192 11.7584L7.01455 10.1132C7.29394 9.62819 7.81111 9.32904 8.37022 9.32904H13.6299C14.189 9.32904 14.7061 9.62819 14.9855 10.1132L16.0981 11.7584C16.8347 13.0372 18.366 13.626 19.7693 13.1692L19.8437 13.1452C21.3598 12.652 22.2604 11.0957 21.933 9.53576ZM8.209 5.89145H6.41767V7.68308H4.85812V5.89145H3.0668V4.33259H4.85812V2.54165H6.41767V4.33259H8.209V5.89145ZM16.1016 2.16842C16.6441 2.16842 17.0833 2.6076 17.0833 3.15017C17.0833 3.69201 16.6441 4.13119 16.1016 4.13119C15.5598 4.13119 15.1206 3.69201 15.1206 3.15017C15.1206 2.60756 15.5598 2.16842 16.1016 2.16842ZM14.1388 6.09426C13.597 6.09426 13.1575 5.65469 13.1575 5.11217C13.1575 4.57068 13.597 4.13115 14.1388 4.13115C14.681 4.13115 15.1202 4.57068 15.1202 5.11217C15.1202 5.65473 14.681 6.09426 14.1388 6.09426ZM16.1016 8.05665C15.5598 8.05665 15.1206 7.61746 15.1206 7.07563C15.1206 6.53306 15.5598 6.09388 16.1016 6.09388C16.6441 6.09388 17.0833 6.53306 17.0833 7.07563C17.0833 7.61746 16.6441 8.05665 16.1016 8.05665ZM18.0643 6.09426C17.5225 6.09426 17.0833 5.65469 17.0833 5.11217C17.0833 4.57068 17.5225 4.13115 18.0643 4.13115C18.6065 4.13115 19.046 4.57068 19.046 5.11217C19.046 5.65473 18.6065 6.09426 18.0643 6.09426Z"
							fill="white"
						/>
					</svg>

					<img class="w-[6vw]" src={hangbot} alt="Hangbot" />

					<div class="ml-[1vw] text-[1.1vw] text-white">
						Play <div class="inline-block text-[1.2vw]">Hangbot</div>
						<br /> with friends
					</div>
				</a>
			</div>

			<div class="relative flex w-full flex-1 flex-col overflow-hidden rounded-[2vw] p-[1vw]">
				<div class="flex flex-row items-center gap-[2vw]">
					<div
						style="background-image: url('https://cdn.discordapp.com/attachments/842737146321174558/1124349080521420820/image.png');"
						class="h-[3vw] w-[3vw] rounded-full bg-cover bg-center"
					/>
					<div class="rounded-[1vw] bg-gray-200 px-[1.5vw] py-[0.5vw] text-[1.2vw]">Hello</div>
				</div>

				<div
					class="absolute left-0 top-0 flex h-full w-full flex-col justify-center bg-[#000000C7] p-[4vw] text-white"
				>
					<div class="text-[3vw]">ไม่มีในเวอร์ชัน Trial</div>
					<div class="text-[2vw]">พูดคุยและ เล่นเกมกับเพื่อนๆ</div>
				</div>
			</div>
		</div>
	</div>
</div>
