<script lang="ts">
	export let src: string;
	export let type = 'audio/mpeg';
</script>

<audio
	controls
	style="border:10px solid #B8DDFF; 
	border-radius: 50px;"
>
	<source {src} {type} />
	Your browser does not support the audio element.
</audio>

<style>
	audio::-webkit-media-controls-panel {
		background-color: #56aeff;
	}

</style>
