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
		<NuxtLink class="actors-film__cover" :to="`/movies/${movie.filmId}`">
			<div class="actors-film__inner">
				<h3 class="actors-film__title">{{ movie.nameRu }}</h3>

				<AtomsRating
					class="actors-film__rating"
					v-if="isValidRating"
					:ratingNum="movie.rating || 0"
					:ratingValue="movie.rating || 0"
				/>
			</div>

			<div class="actors-film__wrap">
				<span class="actors-film__descr">Роль: {{ movie.professionKey }}</span>
				<span class="actors-film__descr"
					>Персонаж: {{ movie.description }}</span
				>
			</div>
		</NuxtLink>
	</article>
</template>
