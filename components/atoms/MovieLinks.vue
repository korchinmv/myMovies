<script setup lang="ts">
	import type { TFilterGenres } from "~/types/Filters";

	interface Props {
		links: TFilterGenres[];
	}

	defineProps<Props>();
</script>

<template>
	<ul class="movie-links">
		<li class="movie-links__item" v-for="link in links" :key="link.id">
			<NuxtLink class="movie-links__link" :to="`/genres/${link.id}`">{{
				firstWordUppercase(link.genre)
			}}</NuxtLink>
		</li>
	</ul>
</template>
