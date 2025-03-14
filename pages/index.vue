<script lang="ts" setup>
	import { useGenresAndCountriesFilter } from "~/store/useGenresAndCountriesFilter";
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const isLoading = ref<boolean>(true);
	const isError = ref<boolean>(false);

	useSeoMeta({
		title: "myMovies - Смотрите лучшие фильмы и сериалы онлайн",
		description:
			"myMovies - Большой каталог фильмов и сериалов онлайн. Без рекламы, без регистрации. Качество HD. Смотри лучшие фильмы и сериалы прямо сейчас!",
	});

	const { setDataGenresAndCountriesFilters } = useGenresAndCountriesFilter();
	const { currentYear, currentMonth } = currentDate();

	//Получаем премьеры
	const { data: dataPremieres, fetchData: fetchDataPremieres } = useFetchData<{
		total: number;
		items: TMovie[];
	}>(`/v2.2/films/premieres?year=${currentYear}&month=${currentMonth}`);

	//Получаем популярные фильмы
	const { data: dataPopular, fetchData: fetchDataPopular } = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(`/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`);

	//Получаем популярные сериалы
	const { data: dataSeries, fetchData: fetchDataSeries } = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(`/v2.2/films/collections?type=POPULAR_SERIES&page=1`);

	//Получаем данные стран и жанров для фильтра
	const { data: dataFilters, fetchData: fetchDataFilters } =
		useFetchData<TGenresAndCountries>("/v2.2/films/filters");

	//Если данные есть, то добавляем состояние в Pinia
	watch(dataFilters, (newFilters) => {
		if (newFilters) {
			setDataGenresAndCountriesFilters(newFilters);
		}
	});

	const fetchData = async () => {
		try {
			isLoading.value = true;
			await Promise.all([
				fetchDataPremieres(),
				fetchDataPopular(),
				fetchDataSeries(),
				fetchDataFilters(),
			]);
		} catch (error) {
			console.error("Ошибка при загрузке данных:", error);
			isError.value = true;
		} finally {
			isLoading.value = false;
		}
	};

	onMounted(() => {
		fetchData();
	});
</script>

<template>
	<AtomsPreloader v-if="isLoading" />
	<AtomsErrorData v-else-if="isError">
		Ошибка при получении данных
	</AtomsErrorData>

	<OrganismsHeroSection
		v-if="dataPremieres"
		bgImage="/img/bg/bg-main-page.jpeg"
	>
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Лучшие"
			mainTitle="новинки"
			v-if="dataPremieres"
		/>

		<MoleculesSlider className="hero-section__slider">
			<swiper-slide
				v-for="movie in dataPremieres?.items"
				:key="movie.kinopoiskId"
				class="slider__item"
			>
				<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
			</swiper-slide>
		</MoleculesSlider>
	</OrganismsHeroSection>

	<OrganismsContentSection v-if="dataPopular">
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Популярные"
				sectionTitle="фильмы"
		/></template>
		<template #body-content>
			<MoleculesMoviesList className="content-section__list">
				<li
					class="movies-list__item"
					v-for="movie in dataPopular?.items.slice(0, 6)"
					:key="movie.kinopoiskId"
				>
					<OrganismsMovieCard
						class="movie-card movie-card--horizontal"
						:movie="movie"
					/>
				</li>
			</MoleculesMoviesList>
		</template>
		<template #link>
			<NuxtLink class="content-section__link button-primary" to="/movies"
				>Все фильмы</NuxtLink
			></template
		>
	</OrganismsContentSection>

	<OrganismsContentSection v-if="dataSeries">
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Лучшие"
				sectionTitle="сериалы"
		/></template>

		<template #body-content>
			<MoleculesMoviesList>
				<li
					class="movies-list__item"
					v-for="movie in dataSeries?.items.slice(0, 6)"
					:key="movie.kinopoiskId"
				>
					<OrganismsMovieCard
						class="movie-card movie-card--horizontal"
						:movie="movie"
					/>
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
