<script lang="ts" setup></script>

<template>
	<div class="movie-card movie-card--preview">
		<NuxtLink class="movie-card__cover" to="#">
			<NuxtImg
				class="movie-card__img"
				src="https://i.pinimg.com/originals/55/31/25/553125e086080a2ddd11d8fed9eb0599.jpg"
			/>

			<Icon
				class="movie-card__play"
				name="solar:play-circle-outline"
				size="40px"
			/>
		</NuxtLink>

		<div class="movie-card__content">
			<h3 class="movie-card__title">
				<NuxtLink to="#">
					The Lord of the Rings: The Fellowship of the Ring</NuxtLink
				>
			</h3>

			<ul class="movie-card__genres">
				<li class="movie-card__genre">
					<NuxtLink class="movie-card__genre-link" to="#">Adventure</NuxtLink>
				</li>

				<li class="movie-card__genre">
					<NuxtLink class="movie-card__genre-link" to="#">Action</NuxtLink>
				</li>
			</ul>

			<span class="movie-card__rate">9.0</span>
		</div>
	</div>
</template>
