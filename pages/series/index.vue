<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const route = useRoute();
	const router = useRouter();
	const page = ref(Number(route.query.page) || 1);
	const total = ref(0);
	const totalPages = ref(0);
	const config = useRuntimeConfig();

	const query = reactive({
		page: page.value,
		countries: route.query.countries || "",
		genres: route.query.genres || "",
		ratingFrom: Number(route.query.ratingFrom) || "",
		ratingTo: Number(route.query.ratingTo) || "",
		yearFrom: Number(route.query.yearFrom) || "",
		yearTo: Number(route.query.yearTo) || "",
		order: route.query.order || "",
	});

	useSeoMeta({
		title:
			"myMovies - Смотрите лучшие сериалы онлайн в HD-качестве | Популярные новинки, классика и подборки",
		description:
			"myMovies - Ваш кинотеатр онлайн! Смотрите лучшие сериалы в HD-качестве: популярные новинки, классика кино, подборки по жанрам и настроению. Удобный поиск, подробные описания и рейтинги. Наслаждайтесь просмотром на любом устройстве!",
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

	// Получаем фильтры (страны и жанры)
	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>(
		config.public.baseUrl + "v2.2/films/filters"
	);

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
	}>(config.public.baseUrl + "v2.2/films?type=TV_SERIES", { query }); // Передаем reactive объект

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
		Object.assign(query, {
			countries: filters.selectedCountry || "",
			genres: filters.selectedGenre || "",
			ratingFrom: filters.ratingFrom || "",
			ratingTo: filters.ratingTo || "",
			yearFrom: filters.yearFrom || "",
			yearTo: filters.yearTo || "",
			order: filters.order || "NUM_VOTE",
			page: 1,
		});

		//Если в URL нету параметров, то удаляем их
		const cleanFiltersUrl = {
			...(filters.selectedCountry && { countries: filters.selectedCountry }),
			...(filters.selectedGenre && { genres: filters.selectedGenre }),
			...(filters.ratingFrom && { ratingFrom: filters.ratingFrom }),
			...(filters.ratingTo && { ratingTo: filters.ratingTo }),
			...(filters.yearFrom && { yearFrom: filters.yearFrom }),
			...(filters.yearTo && { yearTo: filters.yearTo }),
			...(filters.order && { order: filters.order }),
			page: 1,
		};

		router.push({ query: cleanFiltersUrl }).then(() => {
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
		bgImage="/img/bg/series-page.jpg"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle class="hero-section__title" mainTitleStrong="Сериалы" />
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
			<MoleculesFilmsInfo :total="total" :films="filteredMovies" />
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
	<OrganismsMobileFilters
		v-if="dataFilters"
		:dataFilters="dataFilters"
		@update-filters="handleFiltersUpdate"
	/>
</template>
