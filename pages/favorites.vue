<script setup lang="ts">
	import type { FavoritesResponse } from "~/types/FavoritesResponse";

	const config = useRuntimeConfig();
	const tokenCookie = useCookie("token");

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

	onMounted(() => {
		fetchFavoritesMovies();
	});
</script>

<template>
	<div class="favorites-page">
		<!-- <AtomsPreloader v-if="isLoading" />
		<AtomsErrorData v-else-if="error">
			Ошибка при получении данных
		</AtomsErrorData> -->

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
							v-if="favoritesMovies?.length === 0 || errorFavoritesMovies"
						>
							Избранных фильмов пока что нет
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingFavoritesMovies"
						/>

						<MoleculesMoviesList>
							<li
								class="movies-list-preview__item fade-in"
								v-for="movie in favoritesMovies"
								:key="movie.movieData.kinopoiskId"
							>
								<OrganismsMovieCard
									class="movie-card movie-card--preview"
									:movie="movie.movieData"
								/>
							</li>
						</MoleculesMoviesList>
					</template>

					<template #tab2>
						<!-- <AtomsErrorData v-if="dataSequels?.length === 0 || errorSequels">
							Сиквелы не найдены
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingSequels"
						/> -->

						<!-- <MoleculesMoviesList>
							<li
								class="movies-list-preview__item fade-in"
								v-for="movie in filtredSequels"
								:key="movie.filmId"
							>
								<OrganismsMovieCard
									class="movie-card movie-card--preview"
									:movie="movie"
								/>
							</li>
						</MoleculesMoviesList> -->
						TAB2
					</template>
				</MoleculesTabsContent>
			</template>

			<template #link>
				<!-- <MoleculesPagination
					class="content-section__pagination"
					v-if="data?.items.length && totalPages > 1"
					v-model:page="page"
					:total="total"
					:totalPages="totalPages"
					:pageCount="20"
				/> -->
			</template>
		</OrganismsContentSection>
	</div>
</template>
