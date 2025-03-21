<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	useSeoMeta({
		title:
			"myMovies - Премьеры фильмов: смотреть онлайн лучшие комедии, драмы, боевики, фантастику и другие жанры",
		description:
			"myMovies - Смотрите премьеры фильмов по жанрам онлайн: комедии, драмы, боевики, фантастика, ужасы и многое другое. Выбирайте лучшие фильмы в нашем онлайн-кинотеатре и наслаждайтесь просмотром в HD-качестве!",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Премьеры",
		},
	];

	const { currentMonth } = currentDate();

	//Получаем премьеры
	const {
		data: dataPremieres,
		isLoading: isLoadingPremieres,
		error: errorPremieres,
		fetchData: fetchDataPremieres,
	} = useFetchData<{
		total: number;
		items: TMovie[];
	}>(`v2.2/films/premieres?year=2025&month=${currentMonth}`);

	//Получаем данные стран и жанров для фильтра
	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries>("v2.2/films/filters");

	onMounted(() => {
		fetchDataPremieres();
		fetchDataFilters();
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => dataPremieres.value?.items || [])
	);

	// Количество отображаемых фильмов
	const visibleFilmsCount = ref(20); // Начальное количество фильмов
	const showMoreFilms = () => {
		visibleFilmsCount.value += 20; // Увеличиваем количество на 16
	};

	// Проверка, есть ли ещё фильмы для отображения
	const hasMoreFilms = computed(() => {
		return visibleFilmsCount.value < filteredMovies.value.length;
	});

	//Функция добавления id жанров
	const updatePremieresMovieWithGenres = computed(() => {
		if (filteredMovies.value && dataFilters.value) {
			return addGenreIds(filteredMovies.value, dataFilters.value.genres);
		}
		return filteredMovies.value;
	});

	// Обрезанный массив фильмов
	const visibleFilms = computed(() => {
		return updatePremieresMovieWithGenres.value.slice(
			0,
			visibleFilmsCount.value
		);
	});
</script>

<template>
	<AtomsPreloader v-if="isLoadingPremieres" />

	<AtomsErrorData v-if="errorPremieres || errorFilters"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		v-if="(dataPremieres && !errorPremieres) || errorFilters"
		bgImage="/img/bg/premieres.jpg"
		class="fade-in"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Премьеры"
			mainTitle="фильмов"
		/>
	</OrganismsHeroSection>

	<OrganismsContentSection v-if="dataPremieres" class="fade-in">
		<template #head-content>
			<AtomsTextBlock>
				<p class="text-block__text">
					Каждую неделю в мире кино происходят яркие события — премьеры новых
					фильмов, которые становятся главными темами для обсуждения. На нашем
					сайте вы всегда найдете самые свежие новинки, которые только вышли в
					прокат или скоро появятся на экранах.
				</p>
			</AtomsTextBlock>
		</template>

		<template #body-content>
			<MoleculesMoviesList>
				<li
					class="movies-list-preview__item fade-in"
					v-for="movie in visibleFilms"
					:key="movie.filmId"
				>
					<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
				</li>
			</MoleculesMoviesList>
		</template>

		<template #link>
			<button
				class="actor__show-more button-primary"
				v-if="hasMoreFilms"
				@click="showMoreFilms"
			>
				Показать ещё
			</button>
		</template>
	</OrganismsContentSection>
</template>
