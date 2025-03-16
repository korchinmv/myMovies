<script setup lang="ts">
	interface Props {
		preview: string;
		original: string;
	}

	defineProps<Props>();
</script>
<template>
	<a class="gallery-link" :href="original" data-fancybox="gallery">
		<img class="gallery-link__img" :src="preview" />
	</a>
</template>
