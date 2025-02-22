<script lang="ts" setup>
	defineProps({
		movieTitle: {
			type: String,
		},
	});
</script>

<template>
	<h1 class="movie-title">
		{{ movieTitle }}
	</h1>
</template>
