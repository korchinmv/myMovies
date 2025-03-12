<script setup lang="ts">
	import type { TFilm } from "~/types/ActorPage";

	interface Props {
		movie: TFilm;
	}

	const props = defineProps<Props>();

	const isValidRating = computed(() => {
		return props.movie.rating && Number(props.movie.rating) > 0;
	});
</script>

<template>
	<article class="actors-film">
		<NuxtLink class="actors-film__link" :to="`/movies/${movie.filmId}`">
			<h3 class="actors-film__title">{{ movie.nameRu }}</h3>

			<div class="actors-film__wrap">
				<span class="actors-film__descr">Роль: {{ movie.professionKey }}</span>
				<span class="actors-film__descr"
					>Персонаж: {{ movie.description }}</span
				>
			</div>

			<AtomsRating
				v-if="isValidRating"
				:ratingNum="movie.rating || 0"
				:ratingValue="movie.rating || 0"
			/>
		</NuxtLink>
	</article>
</template>
