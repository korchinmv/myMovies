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

	//Получаем популярные фильмы
	const {
		data: dataPopular,
		error: errorPopular,
		isLoading: isLoadingPopular,
		fetchData: fetchDataPopular,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>("v2.2/films/collections?type=TOP_POPULAR_MOVIES&", query);

	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>("v2.2/films/filters");

	onMounted(() => {
		fetchDataPopular();
		fetchDataFilters();
	});

	watch(dataPopular, (newDataPopular) => {
		if (newDataPopular) {
			total.value = newDataPopular.total;
			totalPages.value = newDataPopular.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		if (newPage) {
			query.value.page = newPage; // Обновляем query
			router.push({ query: { page: newPage } }); // Обновляем URL
			fetchDataPopular(); // Выполняем запрос
		}
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => dataPopular.value?.items || [])
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
	<AtomsPreloader v-if="isLoadingPopular" />

	<AtomsErrorData v-if="errorPopular"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		class="fade-in"
		v-if="dataPopular && !errorPopular"
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
		v-if="(dataPopular && !errorPopular) || errorFilters"
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
				v-if="dataPopular?.items.length"
				v-model:page="page"
				:total="total"
				:totalPages="totalPages"
				:pageCount="20"
			/>
		</template>
	</OrganismsContentSection>
</template>
