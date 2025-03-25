<script lang="ts" setup>
	import type { TMovie } from "~/types/Movie";
	interface Props {
		movie: TMovie;
	}

	defineProps<Props>();
</script>

<template>
	<article class="movie-card">
		<NuxtLink
			class="movie-card__cover"
			:to="`/movies/${movie.kinopoiskId || movie.filmId}`"
		>
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
				<NuxtLink :to="`/movies/${movie.kinopoiskId}`">{{
					movie.nameRu || movie.nameEn
				}}</NuxtLink>
			</h3>

			<AtomsMovieLinks
				class="movie-card__genres"
				:links="movie.genres"
				v-if="movie.genres"
			/>

			<div
				class="movie-card__info"
				v-if="
					movie.ratingKinopoisk ||
					movie.year ||
					movie.filmLength ||
					movie.ratingAgeLimits
				"
			>
				<AtomsRating
					class="movie-card__rating"
					v-if="movie.ratingKinopoisk"
					:ratingNum="movie.ratingKinopoisk"
					:ratingValue="movie.ratingKinopoisk"
				/>

				<AtomsMovieDetails
					class="movie-card__year"
					v-if="movie.year"
					:title="movie.year"
					description="г"
				/>

				<AtomsMovieDetails
					class="movie-card__time"
					v-if="movie.filmLength"
					:title="movie.filmLength"
					description="мин"
				/>

				<AtomsMovieDetails
					class="movie-card__time"
					v-if="movie.ratingAgeLimits"
					:title="movie.ratingAgeLimits"
					description="+"
				/>
			</div>

			<p class="movie-card__descr" v-if="movie.description">
				{{ movie.description }}
			</p>
		</div>
	</article>
</template>
