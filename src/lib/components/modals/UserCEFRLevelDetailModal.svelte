<script lang="ts">
	import userSession from '$lib/stores/userSession';
	import CEFRLevelItem from './CEFRLevelItem.svelte';
</script>

<div class="w-full bg-transparent px-[5vw] font-line-seed flex flex-col gap-[3vh]">
	{#if $userSession.profile}
		<CEFRLevelItem
			title="General Level"
			level={$userSession.profile.CEFRLevel.general}
			textScale={1.2}
		/>
		<CEFRLevelItem title="Grammar" level={$userSession.profile.CEFRLevel.grammar} />
		<CEFRLevelItem title="Vocabulary" level={$userSession.profile.CEFRLevel.vocabulary} />
		<CEFRLevelItem title="Communication" level={$userSession.profile.CEFRLevel.communication} />
	{/if}
</div>
