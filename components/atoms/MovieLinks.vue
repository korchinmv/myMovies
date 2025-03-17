<script setup lang="ts">
	import type { TMovie } from "~/types/Movie";
	interface Props {
		links?: TMovie["countries"] | TMovie["genres"];
	}

	defineProps<Props>();
</script>

<template>
	<ul class="movie-links">
		<li class="movie-links__item" v-for="(link, index) in links" :key="index">
			<NuxtLink class="movie-links__link" to="#">{{
				firstWordUppercase("genre" in link ? link.genre : link.country)
			}}</NuxtLink>
		</li>
	</ul>
</template>
