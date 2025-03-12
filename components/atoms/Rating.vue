<script setup lang="ts">
	import numForRatingFormat from "~/utils/numForRatingFormat";

	interface Props {
		ratingNum: number | string;
		ratingValue: number | string;
	}

	const props = defineProps<Props>();

	// Форматирование значения рейтинга
	const formattedRatingValue = computed(() =>
		numForRatingFormat(props.ratingValue)
	);
</script>

<template>
	<div class="rating">
		<NuxtRating
			:read-only="true"
			:rating-value="formattedRatingValue"
			:rating-step="0.1"
			:rating-size="16"
			:rating-count="1"
			:border-width="1.5"
			border-color="#fff"
			active-color="#ff55a5"
			inactive-color="#333"
		/>

		<span class="rating__num">{{ ratingNum }}</span>
	</div>
</template>
