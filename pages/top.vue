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
		title: "myMovies - Топ 250 фильмов всех времен - рейтинг лучших фильмов",
		description:
			"myMovies - Смотрите Топ 250 лучших фильмов всех времен по версии Кинопоиска. Рейтинг включает классику мирового кинематографа и современные шедевры. Выбирайте фильмы для просмотра на myMovies!",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Топ 250",
		},
	];

	const { data, fetchData, error, isLoading } = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>("v2.2/films/collections?type=TOP_250_MOVIES", query);

	//Получаем данные стран и жанров для фильтра
	const { data: dataFilters, fetchData: fetchDataFilters } =
		useFetchData<TGenresAndCountries>("v2.2/films/filters");

	// Обновляем total и totalPages при изменении данных
	watch(data, (newData) => {
		if (newData) {
			total.value = newData.total;
			totalPages.value = newData.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		query.value.page = newPage; // Обновляем query
		router.push({ query: { page: newPage } }); // Обновляем URL
		fetchData(); // Выполняем запрос
	});

	onMounted(() => {
		fetchData();
		fetchDataFilters();
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => data.value?.items || [])
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
	<div class="top">
		<AtomsPreloader v-if="isLoading" />
		<AtomsErrorData v-else-if="error">
			Ошибка при получении данных
		</AtomsErrorData>

		<OrganismsHeroSection
			v-if="data"
			bgImage="/img/bg/top.jpeg"
			class="fade-in"
		>
			<OrganismsBreadcrumbs
				class="hero-section__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>
			<AtomsMainTitle
				class="hero-section__title"
				mainTitleStrong="Топ"
				mainTitle="250"
			/>
		</OrganismsHeroSection>

		<OrganismsContentSection v-if="data" class="fade-in">
			<template #head-content>
				<AtomsTextBlock>
					<p class="text-block__text">
						Каждый фильм из списка – это уникальная история, великолепная
						режиссура и актерская игра, которые оставили неизгладимый след в
						истории кино. Здесь вы найдете как культовые ленты, так и редкие
						жемчужины, которые стоит посмотреть каждому.
					</p>
				</AtomsTextBlock>
			</template>

			<template #body-content>
				<MoleculesMoviesList class="top__movie-list">
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
					class="top__pagination"
					v-if="data?.items.length"
					v-model:page="page"
					:total="total"
					:totalPages="totalPages"
					:pageCount="20"
				/>
			</template>
		</OrganismsContentSection>
	</div>
</template>
