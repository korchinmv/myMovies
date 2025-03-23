<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const route = useRoute();
	const router = useRouter();
	const page = ref(Number(route.query.page) || 1);
	const total = ref(0);
	const totalPages = ref(0);

	// Используем reactive для query
	const query = reactive({
		page: page.value,
		countries: route.query.countries || "",
		genres: route.query.genres || "",
		ratingFrom: Number(route.query.ratingFrom) || "",
		ratingTo: Number(route.query.ratingTo) || "",
		yearFrom: Number(route.query.yearFrom) || "",
		yearTo: Number(route.query.yearTo) || "",
	});

	useSeoMeta({
		title:
			"myMovies - Смотрите лучшие фильмы онлайн в HD-качестве | Популярные новинки, классика и подборки",
		description:
			"myMovies - Ваш кинотеатр онлайн! Смотрите лучшие фильмы в HD-качестве: популярные новинки, классика кино, подборки по жанрам и настроению. Удобный поиск, подробные описания и рейтинги. Наслаждайтесь просмотром на любом устройстве!",
	});

	const breadcrumbs = ref([
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Фильмы",
		},
	]);

	// Получаем фильтры (страны и жанры)
	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>("v2.2/films/filters");

	// Получаем фильмы с учетом фильтров
	const {
		data: dataFilms,
		error: errorFilms,
		isLoading: isLoadingFilms,
		fetchData: fetchDataFilms,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>("v2.2/films", query); // Передаем reactive объект

	onMounted(() => {
		fetchDataFilms();
		fetchDataFilters();
	});

	watch(dataFilms, (newDataFilms) => {
		if (newDataFilms) {
			total.value = newDataFilms.total;
			totalPages.value = newDataFilms.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		if (newPage) {
			query.page = newPage; // Обновляем свойство page в reactive объекте
			router.push({ query: { ...route.query, page: newPage } });
			fetchDataFilms();
		}
	});

	const handleFiltersUpdate = (filters: Record<string, any>) => {
		page.value = 1;

		// Обновляем query
		query.countries = filters.selectedCountry || "";
		query.genres = filters.selectedGenre || "";
		query.ratingFrom = filters.ratingFrom || 0;
		query.ratingTo = filters.ratingTo || 10;
		query.yearFrom = filters.yearFrom || 1000;
		query.yearTo = filters.yearTo || 3000;
		query.page = 1;

		// Обновляем URL
		router.push({ query: { ...filters, page: 1 } }).then(() => {
			// Выполняем запрос после обновления URL
			fetchDataFilms();
		});
	};

	const { filteredMovies } = useMovieFilters(
		computed(() => dataFilms.value?.items || [])
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
	<AtomsPreloader v-if="isLoadingFilms" />

	<AtomsErrorData v-if="errorFilms">Ошибка при получении данных</AtomsErrorData>

	<OrganismsHeroSection
		class="fade-in"
		v-if="dataFilms && !errorFilms"
		bgImage="/img/bg/movies-page.jpg"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle class="hero-section__title" :mainTitleStrong="'Фильмы'" />
	</OrganismsHeroSection>

	<OrganismsContentSection
		class="fade-in"
		v-if="(dataFilms && !errorFilms) || errorFilters"
	>
		<template #head-content>
			<OrganismsFilters
				v-if="dataFilters"
				:dataFilters="dataFilters"
				@update-filters="handleFiltersUpdate"
			/>
		</template>

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
				v-if="dataFilms?.items.length"
				v-model:page="page"
				:total="total"
				:totalPages="totalPages"
				:pageCount="20"
			/>
		</template>
	</OrganismsContentSection>
</template>
