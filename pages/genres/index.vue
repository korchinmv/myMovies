<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";

	const config = useRuntimeConfig();

	useSeoMeta({
		title:
			"myMovies - Фильмы по жанрам: смотреть онлайн лучшие комедии, драмы, боевики, фантастику и другие жанры",
		description:
			"myMovies - Смотрите фильмы по жанрам онлайн: комедии, драмы, боевики, фантастика, ужасы и многое другое. Выбирайте лучшие фильмы в нашем онлайн-кинотеатре и наслаждайтесь просмотром в HD-качестве!",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Жанры",
		},
	];

	//Получаем данные стран и жанров для фильтра
	const {
		data: dataFilters,
		fetchData: fetchDataFilters,
		isLoading: isLoadingFilters,
		error: errorFilters,
	} = useFetchData<TGenresAndCountries>(
		config.public.baseUrl + "v2.2/films/filters"
	);

	onMounted(() => {
		fetchDataFilters();
	});

	const filtredGenres = computed(() => {
		return (
			dataFilters.value?.genres?.filter((genre) => genre.genre !== "") || []
		);
	});
</script>

<template>
	<AtomsPreloader v-if="isLoadingFilters" />

	<AtomsErrorData v-if="errorFilters"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		class="fade-in"
		v-if="dataFilters && !errorFilters"
		bgImage="/img/bg/genres-page.jpg"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Жанры"
			mainTitle="фильмов"
		/>
	</OrganismsHeroSection>

	<OrganismsContentSection
		class="content-section fade-in"
		v-if="dataFilters && !errorFilters"
	>
		<template #head-content>
			<AtomsTextBlock>
				<p class="text-block__text">
					Добро пожаловать в раздел жанров нашего онлайн-кинотеатра! Здесь вы
					найдёте огромный каталог фильмов, отсортированных по различным жанрам.
					Независимо от ваших предпочтений — будь то комедии, драмы, боевики,
					мультфильмы или научная фантастика — у нас есть всё, что вам нужно!
				</p>
			</AtomsTextBlock>
		</template>

		<template #body-content>
			<MoleculesList>
				<li class="list__item" v-for="genre in filtredGenres" :key="genre.id">
					<OrganismsGenreCard :genre="genre" />
				</li>
			</MoleculesList>
		</template>
	</OrganismsContentSection>
</template>
