<script setup lang="ts">
	defineProps({
		ratingNum: {
			type: Number,
			required: true,
		},
		ratingValue: {
			type: Number,
			required: true,
		},
	});
</script>

<template>
	<div class="rating">
		<NuxtRating
			:read-only="true"
			:rating-value="ratingValue"
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
