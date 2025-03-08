<script setup lang="ts">
	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Фильмы",
			to: "/movies",
		},
		{
			label: "Матрица",
		},
	];

	const tabs = [
		{ title: "Скриншоты" },
		{ title: "О фильме" },
		{ title: "Сиквелы" },
		{ title: "Похожие фильмы" },
	];

	const images = [
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
	];

	const activeTabIndex = ref<number>(0);

	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};

	const GalleryComponent = defineAsyncComponent(
		() => import("~/components/atoms/GalleryClient.vue")
	);
</script>

<template>
	<div class="movie">
		<OrganismsHeroSection
			bgImage="https://avatars.mds.yandex.net/get-ott/2419418/2a0000017c27e0e090b55381c1b06e5c5b0b/orig"
		>
			<OrganismsBreadcrumbs
				class="hero-section__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>

			<div class="movie__hero-wrapper">
				<AtomsPageTitle class="movie__title" pageTitle="Матрица" />

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

			<div class="movie__content">
				<div class="movie__content-left">
					<div class="movie__content-head">
						<NuxtImg
							class="movie__content-img"
							src="https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg"
						/>

						<div class="movie__content-info">
							<AtomsRating
								class="movie__rating"
								:ratingNum="8.5"
								:ratingValue="0.4"
							/>

							<ul class="movie__details">
								<li class="movie__details-item">
									<AtomsMovieDetails :title="1999" :description="'г'" />
								</li>

								<li class="movie__details-item">
									<AtomsMovieDetails :title="136" :description="'мин'" />
								</li>

								<li class="movie__details-item">
									<AtomsMovieDetails :title="16" :description="'+'" />
								</li>
							</ul>

							<div class="movie__content-movie">
								<span class="movie__content-movie-title">Жанр: </span>
								<AtomsMovieLinks />
							</div>

							<div class="movie__content-movie">
								<span class="movie__content-movie-title">Страна: </span>
								<AtomsMovieLinks />
							</div>
						</div>
					</div>

					<p class="movie__text">
						Жизнь Томаса Андерсона разделена на две части: днём он — самый
						обычный офисный работник, получающий нагоняи от начальства, а ночью
						превращается в хакера по имени Нео, и нет места в сети, куда он бы
						не смог проникнуть. Но однажды всё меняется. Томас узнаёт ужасающую
						правду о реальности.
					</p>
				</div>

				<div class="movie__content-video">Тут видео</div>
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
						<ul class="gallery">
							<ClientOnly>
								<li
									class="gallery__item"
									v-for="(img, index) in images"
									:key="index"
								>
									<GalleryComponent />
								</li>
							</ClientOnly>
						</ul>
					</template>

					<template #tab2>
						<AtomsSubTitle class="movie__subtitle" subtitle="Режисеры" />

						<MoleculesActorsList class="movie__actors-list" />

						<AtomsSubTitle class="movie__subtitle" subtitle="Актеры" />

						<MoleculesActorsList class="movie__actors-list" />
					</template>

					<template #tab3>
						<MoleculesMoviesList className="content-section__list">
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
						</MoleculesMoviesList>
					</template>

					<template #tab4>
						<MoleculesMoviesList className="content-section__list">
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
							<li class="movies-list__item">
								<OrganismsMovieCard class="movie-card movie-card--horizontal" />
							</li>
						</MoleculesMoviesList>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
