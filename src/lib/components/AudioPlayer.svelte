<script lang="ts">
	export let src: string;
	export let type = 'audio/ogg; codecs=opus';
</script>

<audio controls>
	<source {src} {type} />
	Your browser does not support the audio element.
</audio>
