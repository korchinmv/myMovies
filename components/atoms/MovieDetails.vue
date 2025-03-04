<script lang="ts" setup>
	interface Props {
		title: number | string;
		description: string;
	}

	defineProps<Props>();
</script>

<template>
	<span class="movie-details">{{ `${title}${description}` }}</span>
</template>
