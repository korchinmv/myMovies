<script lang="ts" setup>
	import type { TGenresAndCountries } from "~/types/Filters";

	const route = useRoute();

	const {
		data: dataFilters = { genres: [], countries: [] }, // Значение по умолчанию
		isLoading: isLoadingFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries>("v2.2/films/filters");

	const {
		data: genresFilms,
		isLoading: isLoadingGenresFilms,
		error: errorGenresFilms,
		fetchData: fetchDataGenresFilms,
	} = useFetchData(`v2.2/films?genres=${route.params.id}`);

	onMounted(() => {
		fetchDataGenresFilms();
		fetchDataFilters();
	});

	const genreName = computed(() => {
		if (!dataFilters.value) {
			return "Загрузка..."; // Если данные еще не загружены
		}

		const genre = dataFilters.value.genres.find(
			(genre) => genre.id === Number(route.params.id)
		);
		return genre ? genre.genre : "Жанр не найден";
	});
</script>

<template>
	<div>
		<p>ID жанра: {{ route.params.id }}</p>
		<p>Название жанра: {{ genreName }}</p>
	</div>
</template>
