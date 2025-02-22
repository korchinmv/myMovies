<script lang="ts" setup>
	defineProps({
		title: {
			type: Number || String,
			required: true,
		},
		description: {
			type: String,
		},
	});
</script>

<template>
	<span class="movie-details">{{ `${title}${description}` }}</span>
</template>
