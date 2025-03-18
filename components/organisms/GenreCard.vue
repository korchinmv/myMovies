<script setup lang="ts">
	import type { TFilterData } from "~/types/Filters";

	const route = useRoute();

	interface Props {
		genre: TFilterData;
	}

	defineProps<Props>();
</script>

<template>
	<article class="genre-card">
		<NuxtLink class="genre-card__cover" :to="`/genres/${genre.id}`">
			<h3 class="genre-card__title">{{ firstWordUppercase(genre.genre) }}</h3>
		</NuxtLink>
	</article>
</template>
