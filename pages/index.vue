<script lang="ts" setup>
	import { useGenresAndCountriesFilter } from "~/store/useGenresAndCountriesFilter";
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	useSeoMeta({
		title: "myMovies - Смотрите лучшие фильмы и сериалы онлайн",
		description:
			"myMovies - Большой каталог фильмов и сериалов онлайн. Без рекламы, без регистрации. Качество HD. Смотри лучшие фильмы и сериалы прямо сейчас!",
	});

	const { setDataGenresAndCountriesFilters } = useGenresAndCountriesFilter();
	const { currentYear, currentMonth } = currentDate();

	//Получаем премьеры
	const {
		data: dataPremieres,
		isLoading: isLoadingPremieres,
		error: errorPremieres,
		fetchData: fetchDataPremieres,
	} = useFetchData<{
		total: number;
		items: TMovie[];
	}>(`/v2.2/films/premieres?year=${currentYear}&month=${currentMonth}`);

	//Получаем данные стран и жанров для фильтра
	const { data: dataFilters, fetchData: fetchDataFilters } =
		useFetchData<TGenresAndCountries>("/v2.2/films/filters");

	//Если премьеры есть, то показываем контролы
	const showControls = computed(() => !!dataPremieres.value);

	//Если данные есть, то добавляем состояние в Pinia
	watch(dataFilters, (newFilters) => {
		if (newFilters) {
			setDataGenresAndCountriesFilters(newFilters);
		}
	});

	onMounted(() => {
		fetchDataPremieres();
		fetchDataFilters();
	});
</script>

<template>
	<OrganismsHeroSection bgImage="/img/bg/bg-main-page.jpeg">
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Лучшие"
			mainTitle="новинки"
		/>

		<AtomsPreloaderDots v-if="isLoadingPremieres" />
		<AtomsErrorData v-else-if="errorPremieres">
			Ошибка при получении данных
		</AtomsErrorData>
		<MoleculesSlider
			className="hero-section__slider"
			:controls="showControls"
			v-else
		>
			<swiper-slide
				v-for="movie in dataPremieres?.items"
				:key="movie.kinopoiskId"
				class="slider__item"
			>
				<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
			</swiper-slide>
		</MoleculesSlider>
	</OrganismsHeroSection>

	<OrganismsContentSection>
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Популярные"
				sectionTitle="фильмы"
		/></template>
		<template #body-content>
			<!-- <MoleculesMoviesList className="content-section__list">
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
			</MoleculesMoviesList> -->
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
			<!-- <MoleculesMoviesList>
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
			</MoleculesMoviesList> -->
		</template>

		<template #link>
			<NuxtLink class="content-section__link button-primary" to="/series"
				>Все сериалы</NuxtLink
			></template
		>
	</OrganismsContentSection>
</template>
