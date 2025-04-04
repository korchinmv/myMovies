<script lang="ts" setup>
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";
	import { useAuth } from "~/store/useAuth";
	import { Analytics } from "@vercel/analytics/nuxt";

	const isLoading = ref<boolean>(true);
	const isError = ref<boolean>(false);
	const auth = useAuth();
	const config = useRuntimeConfig();
	const tokenCookie = useCookie("token");

	useSeoMeta({
		title: "myMovies - Смотрите лучшие фильмы и сериалы онлайн",
		description:
			"myMovies - Большой каталог фильмов и сериалов онлайн. Без рекламы, без регистрации. Качество HD. Смотри лучшие фильмы и сериалы прямо сейчас!",
	});

	const { currentMonth } = currentDate();

	//Получаем данные стран и жанров для фильтра
	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries>(
		config.public.baseUrl + "v2.2/films/filters"
	);

	//Получаем премьеры
	const {
		data: dataPremieres,
		error: errorPremieres,
		fetchData: fetchDataPremieres,
	} = useFetchData<{
		total: number;
		items: TMovie[];
	}>(
		config.public.baseUrl +
			`v2.2/films/premieres?year=2024&month=${currentMonth}`
	);

	//Получаем популярные фильмы
	const {
		data: dataPopular,
		error: errorPopular,
		fetchData: fetchDataPopular,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(
		config.public.baseUrl +
			"v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1"
	);

	//Получаем популярные сериалы
	const {
		data: dataSeries,
		error: errorSeries,
		fetchData: fetchDataSeries,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(
		config.public.baseUrl + "v2.2/films/collections?type=POPULAR_SERIES&page=1"
	);

	const fetchData = async () => {
		try {
			isLoading.value = true;
			isError.value = false;

			await Promise.all([
				fetchDataPremieres(),
				fetchDataPopular(),
				fetchDataSeries(),
				fetchDataFilters(),
			]);

			if (
				errorPremieres.value ||
				errorPopular.value ||
				errorSeries.value ||
				errorFilters.value
			) {
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

	onMounted(async () => {
		await auth.checkAuth(tokenCookie.value, config.public.serverUrl);
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

	//Функция добавления id жанров
	const updatePremieresMovieWithGenres = computed(() => {
		if (filtredPremieres.value && dataFilters.value) {
			return addGenreIds(filtredPremieres.value, dataFilters.value.genres);
		}
		return filtredPremieres.value;
	});

	const updatePopularMovieWithGenres = computed(() => {
		if (filtredPopular.value && dataFilters.value) {
			return addGenreIds(filtredPopular.value, dataFilters.value.genres);
		}
		return filtredPopular.value;
	});

	const updateSeriesMovieWithGenres = computed(() => {
		if (filtredSeries.value && dataFilters.value) {
			return addGenreIds(filtredSeries.value, dataFilters.value.genres);
		}
		return filtredSeries.value;
	});
</script>

<template>
	<Analytics />
	<AtomsPreloader v-if="isLoading" />

	<AtomsErrorData v-if="isError">Ошибка при получении данных</AtomsErrorData>

	<OrganismsHeroSection
		class="fade-in"
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
				class="slider__item"
				v-for="movie in updatePremieresMovieWithGenres"
				:key="movie.kinopoiskId"
			>
				<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
			</swiper-slide>
		</MoleculesSlider>

		<NuxtLink class="hero-section__link button-primary" to="/premieres"
			>Премьеры</NuxtLink
		>
	</OrganismsHeroSection>

	<OrganismsContentSection class="fade-in" v-if="dataPopular && !isError">
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
					v-for="movie in updatePopularMovieWithGenres.slice(0, 6)"
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

	<OrganismsContentSection class="fade-in" v-if="dataSeries && !isError">
		<template #head-content>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Лучшие"
				sectionTitle="сериалы"
		/></template>

		<template #body-content>
			<MoleculesMoviesList className="content-section__list">
				<li
					class="movies-list__item"
					v-for="movie in updateSeriesMovieWithGenres.slice(0, 6)"
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
