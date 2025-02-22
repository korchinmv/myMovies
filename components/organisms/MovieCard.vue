<script lang="ts" setup></script>

<template>
	<article class="movie-card">
		<NuxtLink class="movie-card__cover" to="#">
			<NuxtImg
				class="movie-card__img"
				src="https://m.media-amazon.com/images/M/MV5BNWJmOTE0ZGQtMDU0MS00ODYyLTk0NTAtZjE4NjUwNGIyMjQ1XkEyXkFqcGdeQXVyNDUyMTU0NDg@._V1_FMjpg_UX1000_.jpg"
			/>

			<Icon
				class="movie-card__play"
				name="solar:play-circle-outline"
				size="40px"
			/>
		</NuxtLink>

		<div class="movie-card__content">
			<h3 class="movie-card__title">
				<NuxtLink to="#"> Titanic</NuxtLink>
			</h3>

			<AtomsMovieLinks class="movie-card__genres" />

			<div class="movie-card__info">
				<AtomsRating :ratingNum="8" :ratingValue="0.6" />

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
