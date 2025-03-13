<script lang="ts" setup>
	import type { TMovie } from "~/types/Movie";
	interface Props {
		movie: TMovie;
	}

	const props = defineProps<Props>();
</script>

<template>
	<article class="movie-card">
		<NuxtLink class="movie-card__cover" :to="`/movies/${movie.kinopoiskId}`">
			<NuxtImg
				class="movie-card__img"
				:src="movie.posterUrlPreview"
				:alt="movie.nameRu"
			/>

			<Icon
				class="movie-card__play"
				name="solar:play-circle-outline"
				size="40px"
			/>
		</NuxtLink>

		<div class="movie-card__content">
			<h3 class="movie-card__title">
				<NuxtLink to="#">{{ movie.nameRu }}</NuxtLink>
			</h3>

			<AtomsMovieLinks class="movie-card__genres" :genres="movie.genres" />

			<div class="movie-card__info">
				<AtomsRating
					class="movie-card__rating"
					v-if="movie.ratingKinopoisk"
					:ratingNum="movie.ratingKinopoisk"
					:ratingValue="movie.ratingKinopoisk"
				/>

				<AtomsMovieDetails
					class="movie-card__year"
					title="2022"
					description="г"
				/>

				<AtomsMovieDetails
					class="movie-card__time"
					title="136"
					description="мин"
				/>
			</div>

			<p class="movie-card__descr">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi aut Lorem
				ipsum dolor, sit amet consectetur adipisicing elit. Modi aut Lorem ipsum
				dolor, sit amet consectetur adipisicing elit. Modi aut Lorem ipsum
				dolor, sit amet consectetur adipisicing elit. Modi aut
			</p>
		</div>
	</article>
</template>
