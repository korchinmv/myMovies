<script lang="ts" setup>
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const route = useRoute();
	const router = useRouter();
	const page = ref(Number(route.query.page) || 1);
	const total = ref(0);
	const totalPages = ref(0);

	const breadcrumbs = ref([
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Жанры",
			to: "/genres",
		},
		{
			label: "",
		},
	]);

	const queryParams = computed(() => ({
		genres: route.params.id,
		page: page.value,
	}));

	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>("v2.2/films/filters");

	const {
		data: genresFilms,
		isLoading: isLoadingGenresFilms,
		error: errorGenresFilms,
		fetchData: fetchDataGenresFilms,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>("v2.2/films", queryParams);

	onMounted(() => {
		fetchDataGenresFilms();
		fetchDataFilters();
	});

	const genreName = computed(() => {
		if (!dataFilters.value) {
			return "Загрузка..."; // Если данные еще не загружены
		}

		const genres = dataFilters.value.genres || []; // Значение по умолчанию для genres
		const genre = genres.find((genre) => genre.id === Number(route.params.id));
		return genre ? firstWordUppercase(genre.genre) : "Жанр не найден";
	});

	watch(genreName, (newGenreName) => {
		if (newGenreName) {
			useSeoMeta({
				title: `myMovies - ${newGenreName} - cмотрите лучшие фильмы онлайн`,
				description: `myMovies - Смотрите лучшие фильмы в жанре ${newGenreName} онлайн на myMovies! У нас собрана большая коллекция фильмов, которые поднимут вам настроение и подарят незабываемые эмоции. Наслаждайтесь просмотром в HD-качестве.`,
			});

			// Обновление хлебных крошек
			breadcrumbs.value[2].label = newGenreName;
		}
	});

	watch(genresFilms, (newGenresFilms) => {
		if (newGenresFilms) {
			total.value = newGenresFilms.total;
			totalPages.value = newGenresFilms.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		router.push({ query: { page: newPage } }); // Обновляем URL
		fetchDataGenresFilms(); // Выполняем запрос
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => genresFilms.value?.items || [])
	);

	//Функция добавления id жанров
	const updateMovieWithGenres = computed(() => {
		if (filteredMovies.value && dataFilters.value) {
			return addGenreIds(filteredMovies.value, dataFilters.value.genres);
		}
		return filteredMovies.value;
	});
</script>

<template>
	<AtomsPreloader v-if="isLoadingGenresFilms" />

	<AtomsErrorData v-if="errorGenresFilms"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		v-if="genresFilms && !errorGenresFilms"
		bgImage="/img/bg/genre.jpg"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle class="hero-section__title" :mainTitleStrong="genreName" />
	</OrganismsHeroSection>

	<OrganismsContentSection
		v-if="(genresFilms && !errorGenresFilms) || errorFilters"
	>
		<template #head-content>
			<AtomsTextBlock>
				<p class="text-block__text">
					Не важно, какой жанр вы предпочитаете, — на нашем сайте вы найдете
					фильмы, которые подарят вам незабываемые эмоции. Смотрите кино в
					HD-качестве, без рекламы и в удобное для вас время. Погрузитесь в мир
					кино вместе с нами!
				</p>
			</AtomsTextBlock>
		</template>

		<template #body-content>
			<MoleculesMoviesList class="top__movie-list">
				<li
					class="movies-list-preview__item fade-in"
					v-for="movie in updateMovieWithGenres"
					:key="movie.filmId"
				>
					<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
				</li>
			</MoleculesMoviesList>
		</template>

		<template #link>
			<MoleculesPagination
				class="top__pagination"
				v-if="genresFilms?.items.length"
				v-model:page="page"
				:total="total"
				:totalPages="totalPages"
				:pageCount="20"
			/>
		</template>
	</OrganismsContentSection>
</template>
