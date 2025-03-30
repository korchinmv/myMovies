<script setup lang="ts">
	import type { FavoritesResponse } from "~/types/FavoritesResponse";

	const config = useRuntimeConfig();
	const tokenCookie = useCookie("token");

	const { clearList: clearFavorites, deleteItem: deleteFavoriteMovie } =
		useFavorites();
	const { clearList: clearWatchLater, deleteItem: deleteWatchLaterMovie } =
		useWatchLater();

	useSeoMeta({
		title: "myMovies - Ваша персональная коллекция лучших фильмов",
		description:
			"myMovies - Ваша коллекция избранных фильмов на myMovies. Сохраняйте любимые фильмы, получайте рекомендации и делитесь своей подборкой.",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Избранное",
		},
	];

	const tabs = [{ title: "Избранное" }, { title: "Буду смотреть" }];

	const activeTabIndex = ref<number>(0);

	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};

	const {
		data: favoritesMovies,
		error: errorFavoritesMovies,
		isLoading: isLoadingFavoritesMovies,
		fetchData: fetchFavoritesMovies,
	} = useFetchData<FavoritesResponse>(config.public.serverUrl + "favorites", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${tokenCookie.value}`,
		},
	});

	const {
		data: laterMovies,
		error: errorLaterMovies,
		isLoading: isLoadingLaterMovies,
		fetchData: fetchLaterMovies,
	} = useFetchData<FavoritesResponse>(config.public.serverUrl + "watch-later", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${tokenCookie.value}`,
		},
	});

	onMounted(() => {
		fetchFavoritesMovies();
		fetchLaterMovies();
	});

	const handleClearFavoritesList = async () => {
		const result = await clearFavorites();
		if (result.success) {
			await fetchFavoritesMovies();
		}
	};

	const handleClearLaterList = async () => {
		const result = await clearWatchLater();
		if (result.success) {
			await fetchLaterMovies();
		}
	};

	const handleDeleteFavoriteMovie = async (movieId: number) => {
		const result = await deleteFavoriteMovie(movieId);

		if (!result) {
			console.error("Unexpected error: result is undefined");
			return;
		}

		if (result.success) {
			await fetchFavoritesMovies();
		} else {
			console.error("Error deleting movie:", result.error);
		}
	};

	const handleDeleteWatchLaterMovie = async (movieId: number) => {
		const result = await deleteWatchLaterMovie(movieId);

		if (!result) {
			console.error("Unexpected error: result is undefined");
			return;
		}

		if (result.success) {
			await fetchLaterMovies();
		} else {
			console.error("Error deleting movie:", result.error);
		}
	};
</script>

<template>
	<div class="favorites-page">
		<AtomsPreloader
			class="favorites-page__preloader"
			v-if="isLoadingFavoritesMovies || isLoadingLaterMovies"
		/>
		<AtomsErrorData
			class="favorites-page__error"
			v-else-if="errorFavoritesMovies || errorLaterMovies"
		>
			Ошибка при получении данных
		</AtomsErrorData>

		<OrganismsHeroSection bgImage="/img/bg/favorites-page.jpg" class="fade-in">
			<OrganismsBreadcrumbs
				class="hero-section__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>
			<AtomsMainTitle
				class="hero-section__title"
				mainTitleStrong="Избранные"
				mainTitle="фильмы"
			/>
		</OrganismsHeroSection>

		<OrganismsContentSection class="favorites-page__info fade-in">
			<template #head-content>
				<AtomsTextBlock>
					<p class="text-block__text">
						Ваша личная кинотека с любимыми фильмами — удобный доступ к
						сохранённым подборкам на myMovies.
					</p>
				</AtomsTextBlock>

				<MoleculesTabs
					class="favorites-page__tabs"
					:tabs="tabs"
					@tab-change="onTabChange"
				/>
			</template>

			<template #body-content>
				<MoleculesTabsContent :active-tab-index="activeTabIndex">
					<template #tab1>
						<AtomsErrorData
							class="favorites-page__error"
							v-if="favoritesMovies?.length === 0 || errorFavoritesMovies"
						>
							Избранных фильмов пока что нет
						</AtomsErrorData>

						<MoleculesMoviesList class="favorites-page__movie-list">
							<li
								class="movies-list-preview__item fade-in"
								v-for="movie in favoritesMovies"
								:key="movie.movieData.kinopoiskId"
							>
								<OrganismsMovieCard
									class="movie-card movie-card--preview"
									:movie="movie.movieData"
									:id="movie.id"
									@delete-movie="handleDeleteFavoriteMovie"
								/>
							</li>
						</MoleculesMoviesList>

						<button
							class="favorites-page__clear-btn button-primary"
							@click="handleClearFavoritesList"
							v-if="favoritesMovies?.length !== 0"
						>
							Очистить избранное
						</button>
					</template>

					<template #tab2>
						<AtomsErrorData
							class="favorites-page__error"
							v-if="laterMovies?.length === 0 || errorLaterMovies"
						>
							Фильмы не добавлены
						</AtomsErrorData>

						<MoleculesMoviesList class="favorites-page__movie-list">
							<li
								class="movies-list-preview__item fade-in"
								v-for="movie in laterMovies"
								:key="movie.movieData.kinopoiskId"
							>
								<OrganismsMovieCard
									class="movie-card movie-card--preview"
									:movie="movie.movieData"
									:id="movie.id"
									@delete-movie="handleDeleteWatchLaterMovie"
								/>
							</li>
						</MoleculesMoviesList>

						<button
							class="favorites-page__clear-btn button-primary"
							@click="handleClearLaterList"
							v-if="laterMovies?.length !== 0"
						>
							Очистить список
						</button>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
