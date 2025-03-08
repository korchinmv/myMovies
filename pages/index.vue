<script lang="ts" setup>
	useSeoMeta({
		title: "myMovies - Смотрите лучшие фильмы и сериалы онлайн",
		description:
			"myMovies - Большой каталог фильмов и сериалов онлайн. Без рекламы, без регистрации. Качество HD. Смотри лучшие фильмы и сериалы прямо сейчас!",
	});
</script>

<template>
	<OrganismsHeroSection bgImage="/img/bg/bg-main-page.jpeg">
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Лучшие"
			mainTitle="новинки"
		/>
		<MoleculesSlider className="hero-section__slider" />
	</OrganismsHeroSection>

	<OrganismsContentSection>
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Популярные"
				sectionTitle="фильмы"
		/></template>
		<template #body-content>
			<MoleculesMoviesList className="content-section__list">
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
			</MoleculesMoviesList>
		</template>
		<template #link>
			<NuxtLink class="content-section__link button-primary" to="/movies"
				>Все фильмы</NuxtLink
			></template
		>
	</OrganismsContentSection>

	<OrganismsContentSection>
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Лучшие"
				sectionTitle="сериалы"
		/></template>

		<template #body-content>
			<MoleculesMoviesList>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
				<li class="movies-list__item">
					<OrganismsMovieCard class="movie-card movie-card--horizontal" />
				</li>
			</MoleculesMoviesList>
		</template>

		<template #link>
			<NuxtLink class="content-section__link button-primary" to="/series"
				>Все сериалы</NuxtLink
			></template
		>
	</OrganismsContentSection>
</template>
