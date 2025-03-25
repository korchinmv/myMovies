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

	const breadcrumbs = ref([{ label: "Главная", to: "/" }, { label: "Поиск" }]);

	const {
		data: dataFilms,
		isLoading: isLoadingFilms,
		error: errorFilms,
		fetchData: fetchDataFilms,
	} = useFetchData<{
		keyword: string;
		pagesCount: number;
		searchFilmsCountResult: number;
		films: TMovie[];
	}>(`v2.1/films/search-by-keyword?keyword=${route.params.id}`, query);

	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>("v2.2/films/filters");

	watch(dataFilms, (newDataFilms) => {
		if (newDataFilms) {
			useSeoMeta({
				title: `myMovies - Результаты поиска: "${route.params.id}"`,
				description: `myMovies - Найдено ${total.value} фильмов и сериалов по запросу "${route.params.id}". Смотрите лучшие фильмы онлайн в HD-качестве на myMovies. Популярные новинки, классика кино и подборки по жанрам.`,
			});
		}
	});

	watch(
		() => route.query.page,
		(newPage) => {
			if (newPage) {
				page.value = Number(newPage);
				query.value.page = Number(newPage); // Обновляем query
			}
		}
	);

	// Обновляем total и totalPages при изменении данных
	watch(dataFilms, (newData) => {
		if (newData) {
			total.value = newData.searchFilmsCountResult;
			totalPages.value = newData.pagesCount;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		query.value.page = newPage; // Обновляем query
		router.push({ query: { page: newPage } }); // Обновляем URL
		fetchDataFilms(); // Выполняем запрос
	});

	onMounted(() => {
		fetchDataFilms();
		fetchDataFilters();
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => dataFilms.value?.films || [])
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

	<AtomsErrorData v-if="errorFilms || errorFilters"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		v-if="dataFilms && !errorFilms"
		bgImage="/img/bg/search-page.jpg"
		class="fade-in"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>

		<AtomsMainTitle
			class="news__title"
			mainTitleStrong="Результаты"
			mainTitle="поиска"
		/>
	</OrganismsHeroSection>

	<OrganismsContentSection class="fade-in">
		<template #head-content>
			<AtomsSearchInfo
				class="fade-in"
				:searchName="route.params.id as string"
				:searchedCount="total"
			/>
		</template>

		<template #body-content>
			<AtomsErrorData v-if="dataFilms?.films.length === 0"
				>Фильмы не найдены</AtomsErrorData
			>

			<MoleculesMoviesList v-else>
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
				v-if="dataFilms?.films.length && totalPages > 1"
				v-model:page="page"
				:total="total"
				:totalPages="totalPages"
				:pageCount="20"
			/>
		</template>
	</OrganismsContentSection>
</template>
