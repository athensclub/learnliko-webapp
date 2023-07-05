<script lang="ts">
	import NavBarLink from './NavBarLink.svelte';

	export let noText = false;
</script>

<NavBarLink href="/dashboard/overall" text={noText ? '' : 'ภาพรวม'} />

<NavBarLink href="/dashboard/students" text={noText ? '' : 'ห้องเรียน'} />

<slot name="center" />

<NavBarLink href="/dashboard/activities" text={noText ? '' : 'การเรียนรู้ของนักเรียน'} />

<NavBarLink href="/dashboard/ai" text={noText ? '' : 'เอไอช่วยครู'} />

<NavBarLink href="/dashboard/cert" text={noText ? '' : 'ใบรับรอง'} />
