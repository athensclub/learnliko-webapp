<script lang="ts">
	import { LanguageLevel } from '$gql/generated/graphqll';
	import userSession from '$lib/stores/userSession';
	import CEFRLevelItem from './CEFRLevelItem.svelte';
</script>

<div class="flex w-full flex-col gap-[3vh] bg-transparent px-[5vw] font-line-seed">
	{#if $userSession.accountData}
		<CEFRLevelItem
			title="General Level"
			level={$userSession.accountData.languageLevel?.overall.level ?? LanguageLevel.PreA1}
			textScale={1.2}
		/>
		<CEFRLevelItem
			title="Grammar"
			level={$userSession.accountData.languageLevel?.grammar.level ?? LanguageLevel.PreA1}
		/>
		<CEFRLevelItem
			title="Vocabulary"
			level={$userSession.accountData.languageLevel?.vocabulary.level ?? LanguageLevel.PreA1}
		/>
		<CEFRLevelItem
			title="Communication"
			level={$userSession.accountData.languageLevel?.communication.level ?? LanguageLevel.PreA1}
		/>
	{/if}
</div>
