<script lang="ts" setup>
	defineProps({
		sectionTitleStrong: {
			type: String,
			required: true,
		},
		sectionTitle: {
			type: String,
		},
	});
</script>

<template>
	<h2 class="section-title">
		<span class="section-title__span">{{ sectionTitleStrong }}</span>
		{{ sectionTitle }}
	</h2>
</template>
