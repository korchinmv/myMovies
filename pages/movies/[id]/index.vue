<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TScreenshot } from "~/types/Screenshots";
	import type { TActor } from "~/types/Actor";
	import type { TMovie } from "~/types/Movie";

	const route = useRoute();
	const config = useRuntimeConfig();
	const favoriteId = ref<number | null>(null); // ID записи в избранном
	const watchLaterId = ref<number | null>(null); // ID записи в списке "потом"
	const isFavorite = computed(() => !!favoriteId.value);
	const isWatchLater = computed(() => !!watchLaterId.value);

	const { fetchList: fetchFavorites, toggleItem: toggleFavorite } =
		useFavorites();

	const { fetchList: fetchWatchLater, toggleItem: toggleWatchLater } =
		useWatchLater();

	// Конфигурация вкладок
	const tabs = [
		{ title: "О фильме" },
		{ title: "Скриншоты" },
		{ title: "Сиквелы" },
		{ title: "Похожие фильмы" },
	];

	// Хлебные крошки
	const breadcrumbs = ref([
		{ label: "Главная", to: "/" },
		{ label: "Фильмы", to: "/movies" },
		{ label: "" }, // Динамическое название фильма будет добавлено позже
	]);

	// Запросы данных
	const {
		data: dataMovie,
		isLoading: isLoadingMovie,
		error: errorMovie,
		fetchData: fetchDataMovie,
	} = useFetchData<TMovie>(
		config.public.baseUrl + `v2.2/films/${route.params.id}`
	);

	const {
		data: dataActors,
		error: errorActors,
		isLoading: isLoadingActors,
		fetchData: fetchDataActors,
	} = useFetchData<TActor[]>(
		config.public.baseUrl + `v1/staff?filmId=${route.params.id}`
	);

	const {
		data: dataScreens,
		error: errorScreens,
		isLoading: isLoadingScreens,
		fetchData: fetchDataScreens,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TScreenshot[];
	}>(
		config.public.baseUrl +
			`v2.2/films/${route.params.id}/images?type=SCREENSHOT&page=1`
	);

	const {
		data: dataSequels,
		error: errorSequels,
		isLoading: isLoadingSequels,
		fetchData: fetchDataSequels,
	} = useFetchData<TMovie[]>(
		config.public.baseUrl + `v2.1/films/${route.params.id}/sequels_and_prequels`
	);

	const {
		data: dataSimilars,
		error: errorSimilars,
		isLoading: isLoadingSimilars,
		fetchData: fetchDataSimilars,
	} = useFetchData<{
		total: number;
		items: TMovie[];
	}>(config.public.baseUrl + `v2.2/films/${route.params.id}/similars`);

	const { data: dataFilters, fetchData: fetchDataFilters } =
		useFetchData<TGenresAndCountries>(
			config.public.baseUrl + "v2.2/films/filters"
		);

	// Загрузка данных при монтировании компонента
	onMounted(() => {
		fetchDataMovie();
		fetchDataScreens();
		fetchDataActors();
		fetchDataSequels();
		fetchDataSimilars();
		fetchDataFilters();
	});

	// Инициализация Kinobox
	onMounted(() => {
		setTimeout(() => {
			if ((window as any).kbox) {
				(window as any).kbox(".kinobox-player", {
					search: {
						kinopoisk: route.params.id,
					},
				});
			} else {
				console.error("Kinobox script is not loaded.");
			}
		}, 500);
	});

	// Проверка статуса избранного
	const checkFavoriteStatus = async (movie: TMovie) => {
		try {
			const favorites = await fetchFavorites();
			const favorite = favorites.find(
				(item: any) => item.movieData.kinopoiskId === movie.kinopoiskId
			);
			favoriteId.value = favorite?.id || null;
		} catch (error) {
			console.error("Error checking favorite status:", error);
		}
	};

	const checkWatchLaterStatus = async (movie: TMovie) => {
		try {
			const watchLater = await fetchWatchLater();
			const watching = watchLater.find(
				(item: any) => item.movieData.kinopoiskId === movie.kinopoiskId
			);
			watchLaterId.value = watching?.id || null;
		} catch (error) {
			console.error("Error checking favorite status:", error);
		}
	};

	const handleToggleFavorite = async (movie: TMovie) => {
		const result = await toggleFavorite(movie, favoriteId.value);
		if (result.success) {
			favoriteId.value = result.itemId;
		}
	};

	const handleToggleWatchLater = async (movie: TMovie) => {
		const result = await toggleWatchLater(movie, watchLaterId.value);
		if (result.success) {
			watchLaterId.value = result.itemId;
		}
	};

	// Обновление SEO-метаданных при изменении данных о фильме
	watch(dataMovie, (newData) => {
		if (newData) {
			useSeoMeta({
				title: `myMovies - ${newData.nameRu} (${newData.year}г.) смотреть онлайн бесплатно, в хорошем качестве`,
				description: `myMovies - Смотрите ${newData.nameRu} бесплатно, в хорошем качестве на русском. Смотрите все фильмы онлайн в 4K на myMovies с телефона или компьютера бесплатно.`,
			});

			// Обновление хлебных крошек
			breadcrumbs.value[2].label = newData.nameRu;
			//Проверяем статус избранного и смотреть позже
			checkFavoriteStatus(newData);
			checkWatchLaterStatus(newData);
		}
	});

	// Активная вкладка
	const activeTabIndex = ref<number>(0);

	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};

	// Ленивая загрузка компонента галереи
	const GalleryComponent = defineAsyncComponent(
		() => import("~/components/atoms/GalleryClient.vue")
	);

	// Фильтрация на наличие названия фильма
	const { filteredMovies: filtredSequels } = useMovieFilters(
		computed(() => dataSequels.value || [])
	);

	const { filteredMovies: filtredSimilars } = useMovieFilters(
		computed(() => dataSimilars.value?.items || [])
	);

	// Функция для добавления id к жанрам
	const updateMovieWithGenres = computed(() => {
		if (dataMovie.value && dataFilters.value) {
			return addGenreIds(dataMovie.value, dataFilters.value.genres);
		}
		return dataMovie.value;
	});
</script>

<template>
	<AtomsPreloader v-if="isLoadingMovie" />

	<AtomsErrorData v-else-if="errorMovie">
		Ошибка при получении данных
	</AtomsErrorData>

	<div class="movie" v-if="dataMovie">
		<OrganismsHeroSection
			:bgImage="dataMovie?.coverUrl || `/img/bg/bg-movie-page.jpg`"
			class="fade-in"
		>
			<OrganismsBreadcrumbs
				class="hero-section__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>

			<div class="movie__hero-wrapper">
				<AtomsPageTitle class="movie__title" :pageTitle="dataMovie?.nameRu" />

				<div class="movie__hero-inner">
					<AtomsAddFavoritesBtn
						@click="handleToggleFavorite(updateMovieWithGenres)"
						:class="{ 'is-favorite': isFavorite }"
						:text="isFavorite ? 'Удалить из избранного' : 'В избранное'"
					/>

					<AtomsBeWatchingBtn
						class="movie__watching-btn"
						:class="{ 'is-watching': isWatchLater }"
						@click="handleToggleWatchLater(updateMovieWithGenres)"
						:text="isWatchLater ? 'Убрать из списка' : 'Смотреть позже'"
					/>
				</div>
			</div>

			<p class="movie__slogan" v-if="dataMovie?.slogan">
				{{ dataMovie.slogan }}
			</p>

			<div class="movie__content">
				<div class="movie__content-left">
					<div class="movie__content-head">
						<NuxtImg
							class="movie__content-img"
							:src="dataMovie?.posterUrl"
							:alt="dataMovie?.nameRu"
						/>

						<div class="movie__content-info">
							<ul class="movie__details">
								<li class="movie__details-item" v-if="dataMovie?.year">
									<AtomsMovieDetails
										:title="dataMovie?.year"
										:description="'г'"
									/>
								</li>

								<li class="movie__details-item" v-if="dataMovie?.filmLength">
									<AtomsMovieDetails
										:title="dataMovie?.filmLength"
										:description="'мин'"
									/>
								</li>

								<li
									class="movie__details-item"
									v-if="dataMovie?.ratingAgeLimits"
								>
									<AtomsMovieDetails
										:title="dataMovie?.ratingAgeLimits"
										:description="'+'"
									/>
								</li>
							</ul>

							<div class="movie__content-movie" v-if="dataMovie?.nameOriginal">
								<span class="movie__content-movie-title">Название (EN): </span>
								<span class="movie__content-movie-title">{{
									dataMovie?.nameOriginal
								}}</span>
							</div>

							<div
								class="movie__content-movie"
								v-if="dataMovie?.ratingKinopoisk"
							>
								<span class="movie__content-movie-title">Кинопоиск: </span>
								<AtomsRating
									class="movie__rating"
									:ratingNum="dataMovie?.ratingKinopoisk || 0"
									:ratingValue="dataMovie?.ratingKinopoisk || 0"
								/>
							</div>

							<div class="movie__content-movie" v-if="dataMovie?.ratingImdb">
								<span class="movie__content-movie-title">IMDb: </span>
								<span class="movie__content-movie-title">{{
									dataMovie.ratingImdb
								}}</span>
							</div>

							<div class="movie__content-movie" v-if="dataMovie?.genres">
								<span class="movie__content-movie-title">Жанр: </span>
								<AtomsMovieLinks
									v-if="updateMovieWithGenres?.genres"
									:links="updateMovieWithGenres.genres || []"
								/>
							</div>

							<div class="movie__content-movie" v-if="dataMovie?.countries">
								<span class="movie__content-movie-title">Страна: </span>
								<ul class="movie__countries-list">
									<li
										class="movie__countries-item"
										v-for="(country, index) in dataMovie.countries"
										:key="index"
									>
										{{ country.country }}
									</li>
								</ul>
							</div>
						</div>
					</div>

					<p class="movie__text" v-if="dataMovie?.description">
						{{ dataMovie.description }}
					</p>
				</div>

				<div class="movie__content-video kinobox-player">Загрузка...</div>
			</div>
		</OrganismsHeroSection>

		<OrganismsContentSection class="movie__info fade-in">
			<template #head-content>
				<MoleculesTabs
					class="movie__tabs"
					:tabs="tabs"
					@tab-change="onTabChange"
				/>
			</template>

			<template #body-content>
				<MoleculesTabsContent :active-tab-index="activeTabIndex">
					<template #tab1>
						<AtomsErrorData v-if="dataActors?.length === 0 || errorActors">
							Полного списка актеров пока что нет
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingActors"
						/>

						<div class="movie__actors-tab" v-else>
							<AtomsSubTitle class="movie__subtitle" subtitle="Актеры" />

							<MoleculesActorsList class="movie__actors-list">
								<li
									class="actors-list__item fade-in"
									v-for="actor in dataActors
										?.filter((actor) => actor.professionKey === 'ACTOR')
										.filter((actor) => actor.nameRu)"
									:key="actor.staffId"
								>
									<OrganismsActorCard :actor="actor" />
								</li>
							</MoleculesActorsList>

							<AtomsSubTitle class="movie__subtitle" subtitle="Режисеры" />

							<MoleculesActorsList class="movie__actors-list">
								<li
									class="actors-list__item fade-in"
									v-for="actor in dataActors
										?.filter((actor) => actor.professionKey === 'DIRECTOR')
										.filter((actor) => actor.nameRu)"
									:key="actor.staffId"
								>
									<OrganismsActorCard :actor="actor" />
								</li>
							</MoleculesActorsList>
						</div>
					</template>

					<template #tab2>
						<AtomsErrorData
							v-if="dataScreens?.items.length === 0 || errorScreens"
						>
							Скриншотов пока что нет
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingScreens"
						/>

						<ul class="gallery fade-in" v-else>
							<ClientOnly>
								<li
									class="gallery__item"
									v-for="(screen, index) in dataScreens?.items"
									:key="index"
								>
									<GalleryComponent
										:preview="screen.previewUrl"
										:original="screen.imageUrl"
									/>
								</li>
							</ClientOnly>
						</ul>
					</template>

					<template #tab3>
						<AtomsErrorData v-if="dataSequels?.length === 0 || errorSequels">
							Сиквелы не найдены
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingSequels"
						/>

						<MoleculesMoviesList>
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
						</MoleculesMoviesList>
					</template>

					<template #tab4>
						<AtomsErrorData
							v-if="dataSimilars?.items.length === 0 || errorSimilars"
						>
							Похожие фильмы еще не сняли..
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingSimilars"
						/>

						<MoleculesMoviesList>
							<li
								class="movies-list-preview__item fade-in"
								v-for="movie in filtredSimilars"
								:key="movie.filmId"
							>
								<OrganismsMovieCard
									class="movie-card movie-card--preview"
									:movie="movie"
								/>
							</li>
						</MoleculesMoviesList>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
