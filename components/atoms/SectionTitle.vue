<script lang="ts" setup>
	interface Props {
		sectionTitleStrong: string;
		sectionTitle: string;
	}

	defineProps<Props>();
</script>

<template>
	<h2 class="section-title">
		<span class="section-title__span">{{ sectionTitleStrong }}</span>
		{{ sectionTitle }}
	</h2>
</template>
