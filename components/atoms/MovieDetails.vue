<script lang="ts" setup>
	interface Props {
		title: number | string | null | undefined;
		description: string;
	}

	const { title, description } = defineProps<Props>();

	const removeAgeFromString = computed(() => {
		if (typeof title === "string") {
			return title.replace(/age/g, "");
		}

		return title;
	});
</script>

<template>
	<span v-if="title" class="movie-details">{{
		`${removeAgeFromString}${description}`
	}}</span>
</template>
