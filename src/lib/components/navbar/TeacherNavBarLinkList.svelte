<script lang="ts">
	import NavBarLink from './NavBarLink.svelte';

	export let noText = false;
</script>

<NavBarLink href="/dashboard/overall" text={noText ? '' : 'Overall'} />

<NavBarLink href="/dashboard/students" text={noText ? '' : 'My Students'} />

<slot name="center" />

<NavBarLink href="/dashboard/activities" text={noText ? '' : 'Activities'} />

<NavBarLink href="/dashboard/ai" text={noText ? '' : 'Ai for teacher'} />

<NavBarLink href="/dashboard/cert" text={noText ? '' : 'Certificate'} />
