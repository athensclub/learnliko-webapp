<script lang="ts">
	import { closeModal } from '$lib/global/modal';

	export let title: string;
	export let description: string;

	export let onConfirm: () => void;

	const handleConfirmClicked = () => {
		onConfirm();
		closeModal();
	};
</script>

<div class="w-full h-full bg-white font-line-seed flex flex-col">

	<div class="font-bold text-xl text-center">{title}</div>
	<div class="text-lg mt-1 text-center">{description}</div>
	<div class="w-full flex flex-row justify-end mr-10">
		<button on:click={closeModal} class="px-1 py-2 mr-3">Cancel</button>
		<button on:click={handleConfirmClicked} class="px-1 py-2 mr-3">OK</button>
	</div>
</div>
