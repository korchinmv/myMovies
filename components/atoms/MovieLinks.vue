<script setup lang="ts">
	import type { TMovie } from "~/types/Movie";
	interface Props {
		genres: TMovie["genres"];
	}

	defineProps<Props>();
</script>

<template>
	<ul class="movie-links">
		<li class="movie-links__item" v-for="genre in genres">
			<NuxtLink class="movie-links__link" to="#">{{
				firstWordUppercase(genre.genre)
			}}</NuxtLink>
		</li>
	</ul>
</template>
