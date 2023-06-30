<script lang="ts">
	import PurchaseProfileItemModal from '$lib/components/modals/PurchaseProfileItemModal.svelte';
	import NavBar from '$lib/components/navbar/NavBar.svelte';
	import { getContext } from 'svelte';
	import type { Context } from 'svelte-simple-modal';

	type ShopFilter = 'ProfileImage' | 'ProfileBackground';
	const filters: { label: string; filter: ShopFilter }[] = [
		{ label: 'รูปโปรไฟล์', filter: 'ProfileImage' },
		{ label: 'รูปปก', filter: 'ProfileBackground' }
	];

	const { open }: Context = getContext('simple-modal');
	const promptPurchase = (image: string, price: number) =>
		open(PurchaseProfileItemModal, { image, price });

	let currentFilter: ShopFilter = 'ProfileImage';
	$: items =
		currentFilter === 'ProfileImage'
			? [
					{
						image:
							'https://cdn.discordapp.com/attachments/842737146321174558/1124349032685379605/image.png',
						owned: false,
						using: false,
						price: 100
					},
					{
						image:
							'https://cdn.discordapp.com/attachments/842737146321174558/1124349080521420820/image.png',
						owned: true,
						using: true,
						price: 100
					},
					{
						image:
							'https://cdn.discordapp.com/attachments/842737146321174558/1124349468247068764/image.png',
						owned: true,
						using: false,
						price: 100
					}
			  ]
			: [
					{
						image:
							'https://cdn.discordapp.com/attachments/842737146321174558/1124347056245452830/image.png',
						owned: false,
						using: false,
						price: 100
					},
					{
						image:
							'https://cdn.discordapp.com/attachments/842737146321174558/1124347122121195590/image.png',
						owned: false,
						using: false,
						price: 100
					}
			  ];
</script>

<div class="w-full h-full min-h-[100vh] bg-[#F4F4F4] flex flex-row font-line-seed">
	<NavBar spaced />
	<div class="flex flex-col flex-1 px-[3vw] py-[2vh]">
		<div class="font-bold text-[2.5vw]">Shop</div>

		<div class="flex flex-row gap-[2vw] mt-[2vw] font-bold">
			{#each filters as filter (filter.filter)}
				<button
					on:click={() => (currentFilter = filter.filter)}
					class="text-[1.35vw] px-[1.5vw] py-[0.5vw] rounded-full {currentFilter === filter.filter
						? 'bg-black text-white'
						: 'bg-white text-black'}"
				>
					{filter.label}
				</button>
			{/each}
		</div>

		<div
			class="grid gap-[4vw] mt-[4vw] {currentFilter === 'ProfileImage'
				? 'grid-cols-3'
				: 'grid-cols-2'}"
		>
			{#each items as item, index (index)}
				<div class="w-full flex flex-col items-center font-bold">
					<div
						style="background-image: url('{item.image}');"
						class="w-full bg-cover bg-center rounded-[2vw] {currentFilter === 'ProfileImage'
							? 'aspect-square'
							: 'aspect-[16/9]'}"
					>
						{#if item.using}
							<div
								class="text-[1.3vw] px-[1.5vw] py-[0.35vw] rounded-full w-fit mt-[1vw] ml-auto mr-[2vw] bg-black text-white"
							>
								กำลังใช้
							</div>
						{:else if !item.owned}
							<div
								class="flex flex-row items-center px-[1vw] py-[0.35vw] rounded-full w-fit mt-[1vw] ml-auto mr-[2vw] bg-white"
							>
								<div
									class="text-[1.3vw] text-transparent bg-clip-text bg-gradient-to-t from-[#FFE08F] via-[#E4AE24] to-[#FFE08F]"
								>
									{item.price}
								</div>

								<svg
									class="ml-[0.3vw] w-[3vw]"
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
						{/if}
					</div>

					{#if !item.owned}
						<button
							on:click={() => promptPurchase(item.image, item.price)}
							class="w-fit px-[2.5vw] py-[0.35vw] mt-[2vw] rounded-full text-[1.35vw] border border-black"
						>
							ซื้อ
						</button>
					{:else if item.owned && !item.using}
						<button
							class="w-fit px-[2.5vw] py-[0.35vw] mt-[2vw] rounded-full text-[1.35vw] border border-black"
						>
							ใช้งาน
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>
