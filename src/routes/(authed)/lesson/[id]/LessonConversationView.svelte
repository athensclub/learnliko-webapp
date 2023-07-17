<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import ConversationView from '$lib/components/chatbox/ConversationView.svelte';
	import ConfirmModal from '$lib/components/modals/ConfirmModal.svelte';
	import { isMobile } from '$lib/global/breakpoints';
	import {
		chatContext,
		currentChatboxView,
		onRecapFinished,
		showChatbox
	} from '$lib/global/chatbox';
	import {
		checkConversationFinished,
		conversationFinished,
		currentGoal,
		history,
		isCheckConversationGoal,
		isConversationFriendSpeakSlower,
		maxDialogueCount,
		nextConversationGoal,
		saveCurrentConversation
	} from '$lib/global/conversation';
	import { getContext, onMount } from 'svelte';
	import type { Context } from 'svelte-simple-modal';
	import Typewriter from 'svelte-typewriter/Typewriter.svelte';
	import { get } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	export let onFinish: () => void;

	export let coinPerGoal: number;
	export let expPerGoal: number;
	export let totalCoin: number;
	export let totalExp: number;

	let briefing = true;

	// initialization
	onMount(() => {
		$isCheckConversationGoal = true;
		$saveCurrentConversation = true;
		$maxDialogueCount = 1000000;
	});

	const { open }: Context = getContext('simple-modal');
	const hideConversation = () =>
		open(ConfirmModal, {
			title: 'Confirm',
			description: 'Are you sure you want to finish this conversation?',
			onConfirm: () => {
				$showChatbox = false;
				$chatContext = null;
				window.history.back();
			}
		});

	const showRecap = () => {
		$onRecapFinished = () => {
			$showChatbox = false;
			onFinish();
		};
		$currentChatboxView = 'RECAP';
		$showChatbox = true;
	};

	const beforeUnload = (event: BeforeUnloadEvent) => {
		// Chrome requires returnValue to be set.
		event.returnValue = 'Are you sure you want to end conversation?';
		return 'Are you sure you want to end conversation?';
	};

	// window before unload won't trigger on navigation in the same site, use: https://stackoverflow.com/a/76238933
	beforeNavigate(({ cancel }) => {
		if (!confirm('Are you sure you want to end conversation?')) {
			cancel();
		}
	});
</script>

{#if $chatContext}
	<div
		transition:fade
		class="pointer-events-none absolute left-0 top-0 h-[100vh] w-[100vw] bg-cover bg-center text-white"
	>
		<div
			class={`flex h-full flex-row items-center ${
				$isMobile ? 'w-full' : `${briefing ? 'w-full justify-center' : 'w-[60%] justify-between'}`
			}`}
		>
			<!-- Mission Details container -->
			<div
				class={`pointer-events-auto flex border p-[1.5vw] font-line-seed shadow-sm backdrop-blur-lg backdrop-brightness-75 transition-transform ${
					$isMobile
						? `rounded-[3vw] absolute w-full text-[1.3vw] ${
								briefing
									? 'bottom-0 flex-col rounded-b-none'
									: 'top-0 flex-row items-center justify-between rounded-t-none pb-[4vh] pt-[25vw]'
						  }`
						: `h-fit flex-col rounded-[1vw] ${briefing ? 'w-[36%]' : 'ml-[5%] w-[45%]'}`
				}`}
			>
				{#if briefing}
					<div class={`font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.7vw]'}`}>🎯ภารกิจของคุณ</div>
					<div class={`${$isMobile ? 'mt-[3vw] text-[4.5vw]' : 'mt-[1vw] text-[1.3vw]'}`}>
						{$chatContext.conversation.details.learner.mission}
					</div>

					<!-- Divider -->
					<div
						class={`w-full bg-white ${$isMobile ? 'my-[6vw] h-[0.23vh]' : 'my-[2vw] h-[0.15vh]'}`}
					/>

					<div class={`font-bold ${$isMobile ? 'text-[6vw]' : 'text-[1.7vw]'}`}>เป้าหมาย</div>
					<div
						class={`whitespace-pre-wrap ${
							$isMobile ? 'mt-[3vw] text-[4.5vw]' : 'mt-[1vw] text-[1.3vw]'
						}`}
					>
						{$chatContext.conversation.details.learner.goal
							.map((g, i) => `${i + 1}. ${g}`)
							.join('\n')}
					</div>

					<div
						class={`flex flex-row items-center font-bold ${
							$isMobile ? 'mt-[5vw] text-[4vw]' : 'mt-[2vw] text-[1.1vw]'
						}`}
					>
						คุณจะได้รับรางวัลสูงสุด
						<div
							class="flex flex-row rounded-full bg-white {$isMobile
								? 'mx-[1.5vw] px-[2vw] py-[1vw] text-[3vw]'
								: 'mx-[0.5vw] px-[0.5vw] py-[0.3vw] text-[1.05vw]'}"
						>
							<div
								class="bg-gradient-to-br from-[#C698FF] to-[#6C80E8] bg-clip-text text-transparent"
							>
								{totalExp}
							</div>
							<svg
								class={$isMobile ? 'ml-[1vw] w-[7vw]' : 'ml-[0.3vw] w-[2.5vw]'}
								viewBox="0 0 1650 792"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M720.35 572C716.016 572 713.85 569.833 713.85 565.5V211.5C713.85 207.167 716.016 205 720.35 205H952.35C956.683 205 958.85 207.167 958.85 211.5V262C958.85 266.333 956.683 268.5 952.35 268.5H781.35V352H935.85C940.183 352 942.35 354.167 942.35 358.5V408C942.35 412.333 940.183 414.5 935.85 414.5H781.35V508.5H958.35C962.683 508.5 964.85 510.667 964.85 515V565.5C964.85 569.833 962.683 572 958.35 572H720.35ZM1000.41 572C997.742 572 995.908 571.333 994.908 570C994.242 568.333 994.575 566.333 995.908 564L1111.91 382.5L1003.91 213C1003.24 211 1002.91 209.833 1002.91 209.5C1002.91 208.167 1003.41 207.167 1004.41 206.5C1005.41 205.5 1006.74 205 1008.41 205H1069.91C1072.91 205 1075.41 206.5 1077.41 209.5L1154.91 336L1231.41 209.5C1233.07 206.5 1235.57 205 1238.91 205H1299.91C1302.57 205 1304.24 205.833 1304.91 207.5C1305.91 208.833 1305.74 210.667 1304.41 213L1196.41 382L1312.41 564C1313.07 566 1313.41 567.167 1313.41 567.5C1313.41 568.833 1312.91 570 1311.91 571C1310.91 571.667 1309.57 572 1307.91 572H1246.41C1243.41 572 1240.91 570.5 1238.91 567.5L1153.41 428L1068.91 567.5C1067.57 570.5 1065.07 572 1061.41 572H1000.41ZM1370.74 572C1366.41 572 1364.24 569.833 1364.24 565.5V211.5C1364.24 207.167 1366.41 205 1370.74 205H1481.74C1529.41 205 1565.57 216.167 1590.24 238.5C1614.91 260.5 1627.24 292 1627.24 333C1627.24 374 1614.91 405.667 1590.24 428C1565.57 450 1529.41 461 1481.74 461H1431.74V565.5C1431.74 569.833 1429.57 572 1425.24 572H1370.74ZM1431.74 267.5V398.5H1479.24C1531.24 398.5 1557.24 376.167 1557.24 331.5C1557.24 310.167 1550.57 294.167 1537.24 283.5C1523.91 272.833 1504.57 267.5 1479.24 267.5H1431.74Z"
									fill="url(#paint0_linear_1176_3107)"
								/>
								<path
									d="M282.85 113.15L0 396L282.85 678.85L565.7 396L282.85 113.15ZM141.425 396L282.85 254.575L424.275 396L282.85 537.425L141.425 396Z"
									fill="url(#paint1_linear_1176_3107)"
								/>
								<defs>
									<linearGradient
										id="paint0_linear_1176_3107"
										x1="664.72"
										y1="7.4717"
										x2="1126.64"
										y2="1028.66"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#C698FF" />
										<stop offset="1" stop-color="#6C80E8" />
									</linearGradient>
									<linearGradient
										id="paint1_linear_1176_3107"
										x1="-5.29141"
										y1="118.487"
										x2="368.376"
										y2="788.842"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#C698FF" />
										<stop offset="1" stop-color="#6C80E8" />
									</linearGradient>
								</defs>
							</svg>

							<div
								class="ml-[0.5vw] bg-gradient-to-t from-[#FFE08F] via-[#E4AE24] to-[#FFE08F] bg-clip-text text-transparent"
							>
								{totalCoin}
							</div>
							<svg
								class={$isMobile ? 'ml-[1vw] w-[8vw]' : 'ml-[0.3vw] w-[3vw]'}
								viewBox="0 0 2017 792"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M880.85 579C845.183 579 813.85 571.167 786.85 555.5C759.85 539.833 738.85 517.667 723.85 489C709.183 460 701.85 426.5 701.85 388.5C701.85 350.5 709.516 317.167 724.85 288.5C740.183 259.5 761.516 237.167 788.85 221.5C816.183 205.833 847.183 198 881.85 198C920.183 198 952.85 206.667 979.85 224C1006.85 241 1026.52 265.167 1038.85 296.5C1039.18 297.167 1039.35 298.167 1039.35 299.5C1039.35 302.5 1037.85 304.333 1034.85 305L981.35 320L979.35 320.5C976.35 320.5 974.35 319 973.35 316C964.683 299.333 952.516 286.5 936.85 277.5C921.516 268.5 903.516 264 882.85 264C848.183 264 821.016 275.333 801.35 298C781.683 320.333 771.85 350.5 771.85 388.5C771.85 426.5 781.683 456.833 801.35 479.5C821.35 501.833 848.516 513 882.85 513C906.85 513 927.183 507.333 943.85 496C960.85 484.667 973.35 467.667 981.35 445C982.683 441 985.35 439.5 989.35 440.5L1042.35 455.5C1046.35 456.5 1047.85 458.667 1046.85 462C1036.85 497.667 1017.52 526.167 988.85 547.5C960.183 568.5 924.183 579 880.85 579ZM1275.52 579C1240.19 579 1208.35 571.167 1180.02 555.5C1152.02 539.5 1130.02 517.167 1114.02 488.5C1098.35 459.5 1090.52 426.167 1090.52 388.5C1090.52 350.833 1098.35 317.667 1114.02 289C1130.02 260 1152.02 237.667 1180.02 222C1208.35 206 1240.19 198 1275.52 198C1310.85 198 1342.52 206 1370.52 222C1398.85 237.667 1420.85 260 1436.52 289C1452.52 317.667 1460.52 350.833 1460.52 388.5C1460.52 426.167 1452.52 459.5 1436.52 488.5C1420.85 517.167 1398.85 539.5 1370.52 555.5C1342.52 571.167 1310.85 579 1275.52 579ZM1275.52 513C1298.52 513 1318.69 507.667 1336.02 497C1353.69 486.333 1367.19 471.667 1376.52 453C1385.85 434 1390.52 412.5 1390.52 388.5C1390.52 364.5 1385.85 343.167 1376.52 324.5C1367.19 305.5 1353.69 290.667 1336.02 280C1318.69 269.333 1298.52 264 1275.52 264C1252.52 264 1232.19 269.333 1214.52 280C1197.19 290.667 1183.85 305.5 1174.52 324.5C1165.19 343.167 1160.52 364.5 1160.52 388.5C1160.52 412.5 1165.19 434 1174.52 453C1183.85 471.667 1197.19 486.333 1214.52 497C1232.19 507.667 1252.52 513 1275.52 513ZM1534.8 572C1530.47 572 1528.3 569.833 1528.3 565.5V211.5C1528.3 207.167 1530.47 205 1534.8 205H1589.3C1593.64 205 1595.8 207.167 1595.8 211.5V565.5C1595.8 569.833 1593.64 572 1589.3 572H1534.8ZM1682.26 572C1677.93 572 1675.76 569.833 1675.76 565.5V211.5C1675.76 207.167 1677.93 205 1682.26 205H1739.76C1743.1 205 1745.76 206.5 1747.76 209.5L1911.76 463V211.5C1911.76 207.167 1913.93 205 1918.26 205H1970.26C1974.6 205 1976.76 207.167 1976.76 211.5V565.5C1976.76 569.833 1974.6 572 1970.26 572H1913.26C1909.93 572 1907.26 570.5 1905.26 567.5L1740.76 313.5V565.5C1740.76 569.833 1738.6 572 1734.26 572H1682.26Z"
									fill="url(#paint0_linear_1176_3108)"
								/>
								<circle cx="282.85" cy="395.85" r="282.85" fill="url(#paint1_linear_1176_3108)" />
								<path
									d="M283.5 490.056H306.889C322.482 490.056 353.667 480.7 353.667 443.278C353.667 405.856 322.482 396.5 306.889 396.5H260.111C244.518 396.5 213.333 387.144 213.333 349.722C213.333 312.3 244.518 302.944 260.111 302.944H283.5M283.5 490.056H213.333M283.5 490.056V536.833M283.5 302.944H353.667M283.5 302.944V256.167M494 396.5C494 512.757 399.757 607 283.5 607C167.244 607 73 512.757 73 396.5C73 280.244 167.244 186 283.5 186C399.757 186 494 280.244 494 396.5Z"
									stroke="white"
									stroke-width="20"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<defs>
									<linearGradient
										id="paint0_linear_1176_3108"
										x1="1345.35"
										y1="0"
										x2="1345.35"
										y2="792"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#FFE08F" />
										<stop offset="0.255208" stop-color="#F0C862" />
										<stop offset="0.494792" stop-color="#E4AE24" />
										<stop offset="0.755208" stop-color="#F0C862" />
										<stop offset="1" stop-color="#FFE08F" />
									</linearGradient>
									<linearGradient
										id="paint1_linear_1176_3108"
										x1="282.85"
										y1="113"
										x2="282.85"
										y2="678.7"
										gradientUnits="userSpaceOnUse"
									>
										<stop stop-color="#FFE08F" />
										<stop offset="0.255208" stop-color="#F0C862" />
										<stop offset="0.494792" stop-color="#E4AE24" />
										<stop offset="0.755208" stop-color="#F0C862" />
										<stop offset="1" stop-color="#FFE08F" />
									</linearGradient>
								</defs>
							</svg>
						</div>
						สำหรับภารกิจนี้
					</div>

					<button
						on:click={() => (briefing = false)}
						class={`rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD] ${
							$isMobile
								? 'mx-auto my-[4vw] w-[90%] py-[1.5vh] text-[4.8vw]'
								: 'mt-[2vw] w-full py-[1.3vh] text-[1.3vw]'
						}`}
					>
						เริ่มการพูดคุย
					</button>
				{:else if $currentGoal < $chatContext.conversation.details.learner.goal.length}
					<div class="flex w-full flex-col">
						<div class="flex w-full {$isMobile ? 'flex-row items-center gap-[4vw]' : 'flex-col'}">
							<div
								class={`whitespace-pre-wrap text-center font-bold ${
									$isMobile ? 'text-[5vw]' : 'mt-[5vh] text-[1.7vw]'
								}`}
							>
								{$currentGoal + 1}. {$chatContext.conversation.details.learner.goal[$currentGoal]}
							</div>

							<div
								class={`w-fit h-fit rounded-full bg-white ${
									$isMobile
										? 'ml-auto px-[2vw] py-[1vw] text-[3vw]'
										: 'mx-auto mb-[5vh] mt-[3vh] px-[1vw] py-[0.3vw] text-[1.35vw]'
								}`}
							>
								<div
									class="flex flex-row rounded-full bg-white {$isMobile
										? 'mx-[1.5vw] px-[2vw] py-[1vw] text-[3vw]'
										: 'mx-[0.5vw] px-[0.5vw] py-[0.3vw] text-[1.05vw]'}"
								>
									<div
										class="bg-gradient-to-br from-[#C698FF] to-[#6C80E8] bg-clip-text text-transparent"
									>
										{expPerGoal}
									</div>
									<svg
										class={$isMobile ? 'ml-[1vw] w-[7vw]' : 'ml-[0.3vw] w-[2.5vw]'}
										viewBox="0 0 1650 792"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M720.35 572C716.016 572 713.85 569.833 713.85 565.5V211.5C713.85 207.167 716.016 205 720.35 205H952.35C956.683 205 958.85 207.167 958.85 211.5V262C958.85 266.333 956.683 268.5 952.35 268.5H781.35V352H935.85C940.183 352 942.35 354.167 942.35 358.5V408C942.35 412.333 940.183 414.5 935.85 414.5H781.35V508.5H958.35C962.683 508.5 964.85 510.667 964.85 515V565.5C964.85 569.833 962.683 572 958.35 572H720.35ZM1000.41 572C997.742 572 995.908 571.333 994.908 570C994.242 568.333 994.575 566.333 995.908 564L1111.91 382.5L1003.91 213C1003.24 211 1002.91 209.833 1002.91 209.5C1002.91 208.167 1003.41 207.167 1004.41 206.5C1005.41 205.5 1006.74 205 1008.41 205H1069.91C1072.91 205 1075.41 206.5 1077.41 209.5L1154.91 336L1231.41 209.5C1233.07 206.5 1235.57 205 1238.91 205H1299.91C1302.57 205 1304.24 205.833 1304.91 207.5C1305.91 208.833 1305.74 210.667 1304.41 213L1196.41 382L1312.41 564C1313.07 566 1313.41 567.167 1313.41 567.5C1313.41 568.833 1312.91 570 1311.91 571C1310.91 571.667 1309.57 572 1307.91 572H1246.41C1243.41 572 1240.91 570.5 1238.91 567.5L1153.41 428L1068.91 567.5C1067.57 570.5 1065.07 572 1061.41 572H1000.41ZM1370.74 572C1366.41 572 1364.24 569.833 1364.24 565.5V211.5C1364.24 207.167 1366.41 205 1370.74 205H1481.74C1529.41 205 1565.57 216.167 1590.24 238.5C1614.91 260.5 1627.24 292 1627.24 333C1627.24 374 1614.91 405.667 1590.24 428C1565.57 450 1529.41 461 1481.74 461H1431.74V565.5C1431.74 569.833 1429.57 572 1425.24 572H1370.74ZM1431.74 267.5V398.5H1479.24C1531.24 398.5 1557.24 376.167 1557.24 331.5C1557.24 310.167 1550.57 294.167 1537.24 283.5C1523.91 272.833 1504.57 267.5 1479.24 267.5H1431.74Z"
											fill="url(#paint0_linear_1176_3107)"
										/>
										<path
											d="M282.85 113.15L0 396L282.85 678.85L565.7 396L282.85 113.15ZM141.425 396L282.85 254.575L424.275 396L282.85 537.425L141.425 396Z"
											fill="url(#paint1_linear_1176_3107)"
										/>
										<defs>
											<linearGradient
												id="paint0_linear_1176_3107"
												x1="664.72"
												y1="7.4717"
												x2="1126.64"
												y2="1028.66"
												gradientUnits="userSpaceOnUse"
											>
												<stop stop-color="#C698FF" />
												<stop offset="1" stop-color="#6C80E8" />
											</linearGradient>
											<linearGradient
												id="paint1_linear_1176_3107"
												x1="-5.29141"
												y1="118.487"
												x2="368.376"
												y2="788.842"
												gradientUnits="userSpaceOnUse"
											>
												<stop stop-color="#C698FF" />
												<stop offset="1" stop-color="#6C80E8" />
											</linearGradient>
										</defs>
									</svg>

									<div
										class="ml-[0.5vw] bg-gradient-to-t from-[#FFE08F] via-[#E4AE24] to-[#FFE08F] bg-clip-text text-transparent"
									>
										{coinPerGoal}
									</div>
									<svg
										class={$isMobile ? 'ml-[1vw] w-[8vw]' : 'ml-[0.3vw] w-[3vw]'}
										viewBox="0 0 2017 792"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M880.85 579C845.183 579 813.85 571.167 786.85 555.5C759.85 539.833 738.85 517.667 723.85 489C709.183 460 701.85 426.5 701.85 388.5C701.85 350.5 709.516 317.167 724.85 288.5C740.183 259.5 761.516 237.167 788.85 221.5C816.183 205.833 847.183 198 881.85 198C920.183 198 952.85 206.667 979.85 224C1006.85 241 1026.52 265.167 1038.85 296.5C1039.18 297.167 1039.35 298.167 1039.35 299.5C1039.35 302.5 1037.85 304.333 1034.85 305L981.35 320L979.35 320.5C976.35 320.5 974.35 319 973.35 316C964.683 299.333 952.516 286.5 936.85 277.5C921.516 268.5 903.516 264 882.85 264C848.183 264 821.016 275.333 801.35 298C781.683 320.333 771.85 350.5 771.85 388.5C771.85 426.5 781.683 456.833 801.35 479.5C821.35 501.833 848.516 513 882.85 513C906.85 513 927.183 507.333 943.85 496C960.85 484.667 973.35 467.667 981.35 445C982.683 441 985.35 439.5 989.35 440.5L1042.35 455.5C1046.35 456.5 1047.85 458.667 1046.85 462C1036.85 497.667 1017.52 526.167 988.85 547.5C960.183 568.5 924.183 579 880.85 579ZM1275.52 579C1240.19 579 1208.35 571.167 1180.02 555.5C1152.02 539.5 1130.02 517.167 1114.02 488.5C1098.35 459.5 1090.52 426.167 1090.52 388.5C1090.52 350.833 1098.35 317.667 1114.02 289C1130.02 260 1152.02 237.667 1180.02 222C1208.35 206 1240.19 198 1275.52 198C1310.85 198 1342.52 206 1370.52 222C1398.85 237.667 1420.85 260 1436.52 289C1452.52 317.667 1460.52 350.833 1460.52 388.5C1460.52 426.167 1452.52 459.5 1436.52 488.5C1420.85 517.167 1398.85 539.5 1370.52 555.5C1342.52 571.167 1310.85 579 1275.52 579ZM1275.52 513C1298.52 513 1318.69 507.667 1336.02 497C1353.69 486.333 1367.19 471.667 1376.52 453C1385.85 434 1390.52 412.5 1390.52 388.5C1390.52 364.5 1385.85 343.167 1376.52 324.5C1367.19 305.5 1353.69 290.667 1336.02 280C1318.69 269.333 1298.52 264 1275.52 264C1252.52 264 1232.19 269.333 1214.52 280C1197.19 290.667 1183.85 305.5 1174.52 324.5C1165.19 343.167 1160.52 364.5 1160.52 388.5C1160.52 412.5 1165.19 434 1174.52 453C1183.85 471.667 1197.19 486.333 1214.52 497C1232.19 507.667 1252.52 513 1275.52 513ZM1534.8 572C1530.47 572 1528.3 569.833 1528.3 565.5V211.5C1528.3 207.167 1530.47 205 1534.8 205H1589.3C1593.64 205 1595.8 207.167 1595.8 211.5V565.5C1595.8 569.833 1593.64 572 1589.3 572H1534.8ZM1682.26 572C1677.93 572 1675.76 569.833 1675.76 565.5V211.5C1675.76 207.167 1677.93 205 1682.26 205H1739.76C1743.1 205 1745.76 206.5 1747.76 209.5L1911.76 463V211.5C1911.76 207.167 1913.93 205 1918.26 205H1970.26C1974.6 205 1976.76 207.167 1976.76 211.5V565.5C1976.76 569.833 1974.6 572 1970.26 572H1913.26C1909.93 572 1907.26 570.5 1905.26 567.5L1740.76 313.5V565.5C1740.76 569.833 1738.6 572 1734.26 572H1682.26Z"
											fill="url(#paint0_linear_1176_3108)"
										/>
										<circle
											cx="282.85"
											cy="395.85"
											r="282.85"
											fill="url(#paint1_linear_1176_3108)"
										/>
										<path
											d="M283.5 490.056H306.889C322.482 490.056 353.667 480.7 353.667 443.278C353.667 405.856 322.482 396.5 306.889 396.5H260.111C244.518 396.5 213.333 387.144 213.333 349.722C213.333 312.3 244.518 302.944 260.111 302.944H283.5M283.5 490.056H213.333M283.5 490.056V536.833M283.5 302.944H353.667M283.5 302.944V256.167M494 396.5C494 512.757 399.757 607 283.5 607C167.244 607 73 512.757 73 396.5C73 280.244 167.244 186 283.5 186C399.757 186 494 280.244 494 396.5Z"
											stroke="white"
											stroke-width="20"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<defs>
											<linearGradient
												id="paint0_linear_1176_3108"
												x1="1345.35"
												y1="0"
												x2="1345.35"
												y2="792"
												gradientUnits="userSpaceOnUse"
											>
												<stop stop-color="#FFE08F" />
												<stop offset="0.255208" stop-color="#F0C862" />
												<stop offset="0.494792" stop-color="#E4AE24" />
												<stop offset="0.755208" stop-color="#F0C862" />
												<stop offset="1" stop-color="#FFE08F" />
											</linearGradient>
											<linearGradient
												id="paint1_linear_1176_3108"
												x1="282.85"
												y1="113"
												x2="282.85"
												y2="678.7"
												gradientUnits="userSpaceOnUse"
											>
												<stop stop-color="#FFE08F" />
												<stop offset="0.255208" stop-color="#F0C862" />
												<stop offset="0.494792" stop-color="#E4AE24" />
												<stop offset="0.755208" stop-color="#F0C862" />
												<stop offset="1" stop-color="#FFE08F" />
											</linearGradient>
										</defs>
									</svg>
								</div>
							</div>
						</div>

						<div
							class="mt-[2vh] flex h-full w-full flex-row items-center justify-center {$isMobile
								? 'gap-[2vw] text-[4vw]'
								: 'gap-[1vw] text-[1.3vw]'}"
						>
							<Checkbox
								class={$isMobile ? 'w-[6vw] rounded-[1.5vw]' : 'w-[2vw] rounded-[0.5vw]'}
								bind:checked={$isConversationFriendSpeakSlower}
							/>
							ให้ AI พูดช้าลง
						</div>
					</div>
				{:else}
					<div class="{$isMobile?'text-[4.5vw] mx-auto':'text-[1.7vw]'}">🎉ภารกิจการสนทนาสำเร็จ!</div>
				{/if}
			</div>

			<!-- Avatar zone -->
			<div class={`flex h-full flex-col justify-end ${$isMobile ? 'w-full' : 'w-fit'}`}>
				<img
					class={`${
						$isMobile ? `mx-auto max-w-full ${briefing ?'max-h-[90%]':'max-h-[80%]'}` : `bottom-0 h-[90%] transition-transform`
					}`}
					src={$chatContext.conversation.avatar.models[$chatContext.bot.emotion]}
					alt="Avatar"
				/>
			</div>

			{#if !briefing}
				<div
					class={`pointer-events-auto z-50 fixed ${
						$isMobile
							? 'bottom-0 h-[40vh] w-[100vw]'
							: 'bottom-[15vh] right-[3vw] h-[70vh] w-[37vw]'
					}`}
				>
					<div
						transition:fly={{ y: 800, duration: 800 }}
						class={`relative flex h-full w-full flex-col items-center overflow-hidden rounded-[1.6vw] border-[1px] border-b-0 border-black/10 bg-transparent font-line-seed shadow-2xl shadow-gray-700 backdrop-blur-sm backdrop-brightness-75`}
					>
						<ConversationView
							onFinishClicked={showRecap}
							class="text-white"
							initializingClass="text-white"
							recorderClass="text-black bg-black/[0.5] backdrop-blur-md w-[90%]"
							finishButtonClass="border-white/[0.15]"
						/>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<svelte:window on:beforeunload|preventDefault={beforeUnload} />
