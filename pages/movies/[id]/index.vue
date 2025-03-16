<script setup lang="ts">
	import type { TActor } from "~/types/Actor";
	import type { TMovie } from "~/types/Movie";
	import type { TScreenshot } from "~/types/Screenshots";

	const route = useRoute();

	const tabs = [
		{ title: "О фильме" },
		{ title: "Скриншоты" },
		{ title: "Сиквелы" },
		{ title: "Похожие фильмы" },
	];

	const breadcrumbs = ref([
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Фильмы",
			to: "/movies",
		},
		{
			label: "",
		},
	]);

	const { data, isLoading, error, fetchData } = useFetchData<TMovie>(
		`/v2.2/films/${route.params.id}`
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
	}>(`/v2.2/films/${route.params.id}/images?type=SCREENSHOT&page=1`);

	const {
		data: dataActors,
		error: errorActors,
		isLoading: isLoadingActors,
		fetchData: fetchDataActors,
	} = useFetchData<TActor[]>(`/v1/staff?filmId=${route.params.id}`);

	onMounted(() => {
		fetchData();
		fetchDataScreens();
		fetchDataActors();
	});

	onMounted(() => {
		setTimeout(() => {
			if ((window as any).kbox) {
				(window as any).kbox(".kinobox_player", {
					search: {
						kinopoisk: route.params.id,
					},
				});
			} else {
				console.error("Kinobox script is not loaded.");
			}
		}, 500);
	});

	watch(data, (newData) => {
		if (newData) {
			useSeoMeta({
				title: `myMovies - ${newData.nameRu} (${newData.year}г.) смотреть онлайн бесплатно, в хорошем качестве`,
				description: `myMovies - Смотрите ${newData.nameRu} бесплатно, в хорошем качестве на русском. Смотрите все фильмы онлайн в 4K на myMovies с телефона или компьютера бесплатно.`,
			});
		}
	});

	watch(data, (newData) => {
		if (newData) {
			breadcrumbs.value[2].label = newData.nameRu;
		}
	});

	const activeTabIndex = ref<number>(0);

	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};

	const GalleryComponent = defineAsyncComponent(
		() => import("~/components/atoms/GalleryClient.vue")
	);
</script>

<template>
	<AtomsPreloader v-if="isLoading" />
	<AtomsErrorData v-else-if="error">
		Ошибка при получении данных
	</AtomsErrorData>

	<div class="movie" v-if="data">
		<OrganismsHeroSection
			:bgImage="data?.coverUrl || `/img/bg/bg-movie-page.jpg`"
		>
			<OrganismsBreadcrumbs
				class="hero-section__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>

			<div class="movie__hero-wrapper">
				<AtomsPageTitle class="movie__title" :pageTitle="data?.nameRu" />

				<div class="movie__hero-inner">
					<AtomsAddFavoritesBtn
						class="movie__favorites-btn"
						text="В избранное"
					/>

					<AtomsBeWatchingBtn
						class="movie__watching-btn"
						text="Буду смотреть"
					/>
				</div>
			</div>

			<p class="movie__slogan" v-if="data?.slogan">{{ data.slogan }}</p>

			<div class="movie__content">
				<div class="movie__content-left">
					<div class="movie__content-head">
						<NuxtImg
							class="movie__content-img"
							:src="data?.posterUrl"
							:alt="data?.nameRu"
						/>

						<div class="movie__content-info">
							<ul class="movie__details">
								<li class="movie__details-item" v-if="data?.year">
									<AtomsMovieDetails :title="data?.year" :description="'г'" />
								</li>

								<li class="movie__details-item" v-if="data?.filmLength">
									<AtomsMovieDetails
										:title="data?.filmLength"
										:description="'мин'"
									/>
								</li>

								<li class="movie__details-item" v-if="data?.ratingAgeLimits">
									<AtomsMovieDetails
										:title="data?.ratingAgeLimits"
										:description="'+'"
									/>
								</li>
							</ul>

							<div class="movie__content-movie" v-if="data?.nameOriginal">
								<span class="movie__content-movie-title">Название (EN): </span>
								<span class="movie__content-movie-title">{{
									data?.nameOriginal
								}}</span>
							</div>

							<div class="movie__content-movie" v-if="data?.ratingKinopoisk">
								<span class="movie__content-movie-title">Кинопоиск: </span>
								<AtomsRating
									class="movie__rating"
									:ratingNum="data?.ratingKinopoisk || 0"
									:ratingValue="data?.ratingKinopoisk || 0"
								/>
							</div>

							<div class="movie__content-movie" v-if="data?.ratingImdb">
								<span class="movie__content-movie-title">IMDb: </span>
								<span class="movie__content-movie-title">{{
									data.ratingImdb
								}}</span>
							</div>

							<div class="movie__content-movie" v-if="data?.genres">
								<span class="movie__content-movie-title">Жанр: </span>
								<AtomsMovieLinks v-if="data?.genres" :links="data.genres" />
							</div>

							<div class="movie__content-movie" v-if="data?.countries">
								<span class="movie__content-movie-title">Страна: </span>
								<AtomsMovieLinks
									v-if="data?.countries"
									:links="data.countries"
								/>
							</div>
						</div>
					</div>

					<p class="movie__text" v-if="data?.description">
						{{ data.description }}
					</p>
				</div>

				<div class="movie__content-video kinobox_player">Загрузка...</div>
			</div>
		</OrganismsHeroSection>

		<OrganismsContentSection class="movie__info">
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
							Списка актеров пока что нет
						</AtomsErrorData>

						<AtomsPreloaderLocal
							class="movie__actors-tab-preloader"
							v-if="isLoadingActors"
						/>

						<div class="movie__actors-tab" v-else>
							<AtomsSubTitle class="movie__subtitle" subtitle="Актеры" />

							<MoleculesActorsList class="movie__actors-list">
								<li
									class="actors-list__item"
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
									class="actors-list__item"
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

						<ul class="gallery" v-else>
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
						<MoleculesMoviesList className="content-section__list">
							<li class="movies-list__item">
								<!-- <OrganismsMovieCard class="movie-card movie-card--horizontal" /> -->
							</li>
						</MoleculesMoviesList>
					</template>

					<template #tab4>
						<MoleculesMoviesList className="content-section__list">
							<li class="movies-list__item">
								<!-- <OrganismsMovieCard class="movie-card movie-card--horizontal" /> -->
							</li>
						</MoleculesMoviesList>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
