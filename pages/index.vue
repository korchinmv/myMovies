<script lang="ts" setup>
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const isLoading = ref<boolean>(true);
	const isError = ref<boolean>(false);

	useSeoMeta({
		title: "myMovies - Смотрите лучшие фильмы и сериалы онлайн",
		description:
			"myMovies - Большой каталог фильмов и сериалов онлайн. Без рекламы, без регистрации. Качество HD. Смотри лучшие фильмы и сериалы прямо сейчас!",
	});

	const { currentMonth } = currentDate();

	//Получаем премьеры
	const {
		data: dataPremieres,
		fetchData: fetchDataPremieres,
		error: errorPremieres,
	} = useFetchData<{
		total: number;
		items: TMovie[];
	}>(`v2.2/films/premieres?year=2024&month=${currentMonth}`);

	//Получаем популярные фильмы
	const {
		data: dataPopular,
		fetchData: fetchDataPopular,
		error: errorPopular,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(`v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`);

	//Получаем популярные сериалы
	const {
		data: dataSeries,
		fetchData: fetchDataSeries,
		error: errorSeries,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(`v2.2/films/collections?type=POPULAR_SERIES&page=1`);

	const fetchData = async () => {
		try {
			isLoading.value = true;
			isError.value = false;

			await Promise.all([
				fetchDataPremieres(),
				fetchDataPopular(),
				fetchDataSeries(),
			]);

			if (errorPremieres.value || errorPopular.value || errorSeries.value) {
				isError.value = true;
			}
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

	// Фильтрация на наличие названия фильма
	const { filteredMovies: filtredPremieres } = useMovieFilters(
		computed(() => dataPremieres.value?.items || [])
	);
	const { filteredMovies: filtredPopular } = useMovieFilters(
		computed(() => dataPopular.value?.items || [])
	);
	const { filteredMovies: filtredSeries } = useMovieFilters(
		computed(() => dataSeries.value?.items || [])
	);
</script>

<template>
	<AtomsPreloader v-if="isLoading" />

	<AtomsErrorData v-if="isError">Ошибка при получении данных</AtomsErrorData>

	<OrganismsHeroSection
		v-if="dataPremieres && !isError"
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
				v-for="movie in filtredPremieres"
				:key="movie.kinopoiskId"
				class="slider__item"
			>
				<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
			</swiper-slide>
		</MoleculesSlider>

		<NuxtLink class="hero-section__link button-primary" to="/premieres"
			>Премьеры</NuxtLink
		>
	</OrganismsHeroSection>

	<OrganismsContentSection v-if="dataPopular && !isError">
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Популярные"
				sectionTitle="фильмы"
		/></template>
		<template #body-content>
			<MoleculesMoviesList className="content-section__list">
				<li
					class="movies-list__item fade-in"
					v-for="movie in filtredPopular.slice(0, 6)"
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
			>
		</template>
	</OrganismsContentSection>

	<OrganismsContentSection v-if="dataSeries && !isError">
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Лучшие"
				sectionTitle="сериалы"
		/></template>

		<template #body-content>
			<MoleculesMoviesList className="content-section__list">
				<li
					class="movies-list__item fade-in"
					v-for="movie in filtredSeries.slice(0, 6)"
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
