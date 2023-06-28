<script lang="ts">
	import { isMobile } from '$lib/global/breakpoints';
	import type { LessonCardData } from '$lib/types/lesson';

	export let item: LessonCardData;

	let clazz = '';
	export { clazz as class };
</script>

<!-- Specify the size(width, height) of the card in the user of the component, not in the component itself. -->
<div
	style="background-image: url('{item.background}');"
	class={`relative overflow-hidden flex flex-col justify-between shadow-xl bg-center bg-cover ${
		$isMobile ? 'rounded-[6vw]' : 'rounded-[2vw]'
	} ${clazz}`}
>
	<a
		href="/lesson/{item.id}"
		class="w-full p-[2vw] bg-[#0000008C] backdrop-blur-sm flex flex-col texgt-white text-white font-bold relative"
	>
		<svg
			class="absolute top-[2vw] right-[2vw] w-[7%]"
			viewBox="0 0 39 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="Frame" clip-path="url(#clip0_1176_2309)">
				<path
					id="Vector"
					d="M1.95 14C0.873044 14 9.41505e-08 14.8955 0 16C-9.41505e-08 17.1046 0.873044 18 1.95 18V14ZM38.4288 17.4142C39.1903 16.6332 39.1903 15.3669 38.4288 14.5858L26.019 1.85788C25.2576 1.07683 24.023 1.07683 23.2614 1.85788C22.4999 2.63893 22.4999 3.90525 23.2614 4.68631L34.2923 16L23.2614 27.3138C22.4999 28.0948 22.4999 29.361 23.2614 30.1422C24.023 30.9232 25.2576 30.9232 26.019 30.1422L38.4288 17.4142ZM1.95 18H37.05V14H1.95V18Z"
					fill="white"
				/>
			</g>
			<defs>
				<clipPath id="clip0_1176_2309">
					<rect width="39" height="32" fill="white" />
				</clipPath>
			</defs>
		</svg>

		<div class="text-[1.5vw]">{item.topic}</div>
		<div class="mt-[1.2vh] text-[1.05vw] max-w-[90%]">{item.description}</div>

		<div class="flex flex-row gap-[1vw] mt-[2vh] text-[1vw]">
			<div class="px-[2vw] py-[1vh] rounded-full bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]">
				{item.level}
			</div>

			<div class="px-[1vw] py-[1vh] bg-white rounded-full">
				<div
					class="flex flex-row text-transparent bg-clip-text bg-gradient-to-r from-[#6C80E8] to-[#9BA1FD]"
				>
					+{item.exp}
					<svg
						class="ml-[0.6vw] w-[2.5vw]"
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
				</div>
			</div>
		</div>

		<div class="mt-[2vh] w-full h-[1.35vw] rounded-full bg-[#FFFFFF29] overflow-hidden">
			<div
				style="width: {item.progress * 100}%;"
				class="h-full bg-gradient-to-r rounded-full from-[#6C80E8] to-[#9BA1FD]"
			/>
		</div>
	</a>

	<div class="flex flex-row items-center h-[50%]">
		<div class="flex flex-col h-full justify-end ml-[5%]">
			<img class="max-h-full" src={item.avatar} alt="Avatar" />
		</div>

		<div
			class="relative right-[7%] bottom-[30%] h-fit p-[1vw] rounded-[2vw] rounded-bl-none bg-white font-bold text-[1.1vw]"
		>
			{item.avatarIntro}
		</div>
	</div>
</div>
