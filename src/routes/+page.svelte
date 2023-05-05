<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	

	// if (browser) {
	// 	goto('/play');
	// }
</script>

<template>
	<div>
	  <html>
		<!-- path to your HTML file goes here -->
		<iframe src="../index.html" frameborder="0" width="200" height="300"></iframe>
	  </html>
	</div>
  </template>
