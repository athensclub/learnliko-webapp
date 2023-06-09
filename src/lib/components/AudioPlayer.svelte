<script lang="ts">
	export let src: string;
	export let type = 'audio/mpeg';

	export let blockWidth = 10;
	export let blockSpacing = 2;

	export let smallBlockHeightPercentage = 30;
	export let mediumBlockHeightPercentage = 70;
	export let largeBlockHeightPercentage = 100;

	export let defaultBlockColor = 'black';
	export let playedBlockColor = 'white';
	export let playColor = 'white';
	export let pauseColor = 'white';

	let clazz = '';
	export { clazz as class };

	let player: HTMLAudioElement | null = null;
	let currentTime: number;
	let duration: number;

	let width = 0;

	type Block = { heightPercentage: number; played: boolean };
	let blocks: Block[] = [];
	let blocksParent: HTMLDivElement;

	const updateBlocksLength = (targetLength: number) => {
		if (targetLength > blocks.length) {
			let toAdd: Block[] = [];
			for (let i = blocks.length; i < targetLength; i++) {
				toAdd.push({
					heightPercentage:
						i % 7 === 0
							? smallBlockHeightPercentage
							: i % 7 === 1
							? mediumBlockHeightPercentage
							: largeBlockHeightPercentage,
					played: false
				});
			}
			blocks = [...blocks, ...toAdd];
		} else if (targetLength < blocks.length) {
			blocks = blocks.filter((_, index) => index < targetLength);
		}
	};

	// derivation of the formula
	// n*bw + (n-1)*bs <= width
	// n*bw + n*bs - bs <= width
	// n*(bw+bs) <= width+bs
	// n <= (width+bs) / (bw+bs)
	$: updateBlocksLength(Math.floor((width + blockSpacing) / (blockWidth + blockSpacing)));

	// a more efficient version will be easy to cause bugs, so imma just use this version.
	const updatePlayed = () => {
		const playedIndex = (currentTime / duration) * blocks.length;
		blocks = blocks.map((block, index) => ({
			...block,
			played: index < playedIndex
		}));
	};
	$: currentTime, updatePlayed();

	let playing = false;
	const togglePlaying = async () => {
		playing = !playing;
		if (playing) {
			player!.play();
		} else {
			player!.pause();
		}
	};

	const onClicked = (e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement }) => {
		currentTime = ((e.clientX - blocksParent.getBoundingClientRect().left) / width) * duration;
	};

	// somehow duration is infinity for ogg format and is set when audio is played.
	// https://stackoverflow.com/a/41245574
	const fixDuration = async () => {
		if (player) {
			player.volume = 0;
			currentTime = 24 * 60 * 60;

			// reset current time AFTER the browser set the currentTime to duration (because duration changed from infinity).
			const timeListener: EventListenerOrEventListenerObject = (e) => {
				player!.removeEventListener('timeupdate', timeListener);
				currentTime = 0;
			};
			player!.addEventListener('timeupdate', timeListener);
			const durationListener: EventListenerOrEventListenerObject = async (e) => {
				if (Number.isFinite(duration)) {
					player!.removeEventListener('durationchange', durationListener);
					player!.pause();
					player!.volume = 1;
					player!.remove;
				}
			};
			player.addEventListener('durationchange', durationListener);
		}
	};
	$: if (!Number.isFinite(duration)) {
		fixDuration();
	}

	// https://stackoverflow.com/a/1322771
	$: timeText = Number.isFinite(duration - currentTime)
		? new Date((duration - currentTime) * 1000).toISOString().slice(14, 19)
		: '00:00';
</script>

<div class={`flex flex-row items-center px-5 py-1 gap-3 ${clazz}`}>
	<button on:click={togglePlaying} class="h-[50%] flex">
		{#if playing}
			<svg
				class="h-full"
				fill={pauseColor}
				viewBox="0 0 32 32"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>pause</title>
				<path
					d="M5.92 24.096q0 0.832 0.576 1.408t1.44 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.44 0.576t-0.576 1.44v16.16zM18.016 24.096q0 0.832 0.608 1.408t1.408 0.608h4.032q0.832 0 1.44-0.608t0.576-1.408v-16.16q0-0.832-0.576-1.44t-1.44-0.576h-4.032q-0.832 0-1.408 0.576t-0.608 1.44v16.16z"
				/>
			</svg>
		{:else}
			<svg
				class="h-full"
				fill={playColor}
				viewBox="0 0 32 32"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>play</title>
				<path
					d="M5.92 24.096q0 1.088 0.928 1.728 0.512 0.288 1.088 0.288 0.448 0 0.896-0.224l16.16-8.064q0.48-0.256 0.8-0.736t0.288-1.088-0.288-1.056-0.8-0.736l-16.16-8.064q-0.448-0.224-0.896-0.224-0.544 0-1.088 0.288-0.928 0.608-0.928 1.728v16.16z"
				/>
			</svg>
		{/if}
	</button>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		bind:this={blocksParent}
		on:click={onClicked}
		bind:clientWidth={width}
		class="flex flex-row items-center flex-1 h-[80%]"
		style="gap: 0px;"
	>
		{#each blocks as block, index}
			<div
				class="bg-white w-2"
				style="width: {blockWidth}%; height: 5px; background-color: {block.played
					? playedBlockColor
					: defaultBlockColor};"
			/>
		{/each}

		<div class="bg-white text-black rounded-full px-2 text-[0.8vw] ml-2">
			{timeText}
		</div>
	</div>

	<audio bind:duration bind:currentTime bind:this={player}>
		<source {src} {type} />
		Your browser does not support the audio element.
	</audio>
</div>
