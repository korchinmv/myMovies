<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const route = useRoute();
	const router = useRouter();
	const page = ref(Number(route.query.page) || 1);
	const query = ref({
		page: page.value,
	});
	const total = ref(0);
	const totalPages = ref(0);

	useSeoMeta({
		title:
			"myMovies - Смотрите лучшие сериалы онлайн в HD-качестве | Популярные новинки, классика и подборки",
		description:
			"myMovies - Ваш онлайн-кинотеатр для просмотра сериалов! Смотрите лучшие сериалы в HD-качестве: популярные новинки, классические многосезонные проекты, подборки по жанрам и настроению. Удобный поиск, подробные описания и рейтинги. Наслаждайтесь просмотром на любом устройстве!",
	});

	const breadcrumbs = ref([
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Сериалы",
		},
	]);

	//Получаем популярные фильмы
	const {
		data: dataSeries,
		error: errorSeries,
		isLoading: isLoadingSeries,
		fetchData: fetchDataSeries,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>("v2.2/films/collections?type=POPULAR_SERIES", query);

	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>("v2.2/films/filters");

	onMounted(() => {
		fetchDataSeries();
		fetchDataFilters();
	});

	watch(dataSeries, (newDataSeries) => {
		if (newDataSeries) {
			total.value = newDataSeries.total;
			totalPages.value = newDataSeries.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		if (newPage) {
			query.value.page = newPage; // Обновляем query
			router.push({ query: { page: newPage } }); // Обновляем URL
			fetchDataSeries(); // Выполняем запрос
		}
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => dataSeries.value?.items || [])
	);

	// Функция добавления id жанров
	const updateMovieWithGenres = computed(() => {
		if (filteredMovies.value && dataFilters.value) {
			return addGenreIds(filteredMovies.value, dataFilters.value.genres);
		}
		return filteredMovies.value || [];
	});
</script>

<template>
	<AtomsPreloader v-if="isLoadingSeries" />

	<AtomsErrorData v-if="errorSeries"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		class="fade-in"
		v-if="dataSeries && !errorSeries"
		bgImage="/img/bg/series-page.jpg"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle class="hero-section__title" :mainTitleStrong="'Сериалы'" />
	</OrganismsHeroSection>

	<OrganismsContentSection
		class="fade-in"
		v-if="(dataSeries && !errorSeries) || errorFilters"
	>
		<template #head-content> </template>

		<template #body-content>
			<MoleculesMoviesList>
				<li
					class="movies-list-preview__item"
					v-for="movie in updateMovieWithGenres"
					:key="movie.filmId"
				>
					<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
				</li>
			</MoleculesMoviesList>
		</template>

		<template #link>
			<MoleculesPagination
				class="content-section__pagination"
				v-if="dataSeries?.items.length"
				v-model:page="page"
				:total="total"
				:totalPages="totalPages"
				:pageCount="20"
			/>
		</template>
	</OrganismsContentSection>
</template>
