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
		{ title: "Скриншоты", name: "tab1" },
		{ title: "Отзывы", name: "tab2" },
		{ title: "Сиквелы", name: "tab3" },
		{ title: "Похожие фильмы", name: "tab4" },
	];

	const activeTabIndex = ref<number>(0);

	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};
</script>

<template>
	<div class="movie-page">
		<OrganismsHeroSection
			bgImage="https://avatars.mds.yandex.net/get-ott/2419418/2a0000017c27e0e090b55381c1b06e5c5b0b/orig"
		>
			<OrganismsBreadcrumbs
				class="movie-page__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>

			<div class="movie-page__hero-wrapper">
				<AtomsMovieTitle class="movie-page__title" movieTitle="Матрица" />

				<div class="movie-page__hero-inner">
					<AtomsAddFavoritesBtn
						class="movie-page__favorites-btn"
						text="В избранное"
					/>

					<AtomsBeWatchingBtn
						class="movie-page__watching-btn"
						text="Буду смотреть"
					/>
				</div>
			</div>

			<div class="movie-page__content">
				<div class="movie-page__content-left">
					<div class="movie-page__content-head">
						<NuxtImg
							class="movie-page__content-img"
							src="https://kinopoiskapiunofficial.tech/images/posters/kp_small/301.jpg"
						/>

						<div class="movie-page__content-info">
							<AtomsRating
								class="movie-page__rating"
								:ratingNum="8.5"
								:ratingValue="0.4"
							/>

							<ul class="movie-page__details">
								<li class="movie-page__details-item">
									<AtomsMovieDetails :title="1999" :description="'г'" />
								</li>

								<li class="movie-page__details-item">
									<AtomsMovieDetails :title="136" :description="'мин'" />
								</li>

								<li class="movie-page__details-item">
									<AtomsMovieDetails :title="16" :description="'+'" />
								</li>
							</ul>

							<div class="movie-page__content-movie">
								<span class="movie-page__content-movie-title">Жанр: </span>
								<AtomsMovieLinks />
							</div>

							<div class="movie-page__content-movie">
								<span class="movie-page__content-movie-title">Страна: </span>
								<AtomsMovieLinks />
							</div>
						</div>
					</div>

					<p class="movie-page__text">
						Жизнь Томаса Андерсона разделена на две части: днём он — самый
						обычный офисный работник, получающий нагоняи от начальства, а ночью
						превращается в хакера по имени Нео, и нет места в сети, куда он бы
						не смог проникнуть. Но однажды всё меняется. Томас узнаёт ужасающую
						правду о реальности.
					</p>
				</div>

				<div class="movie-page__content-video">Тут видео</div>
			</div>
		</OrganismsHeroSection>

		<OrganismsContentSection class="movie-page__info">
			<template #head-content>
				<MoleculesTabs
					class="movie-page__tabs"
					:tabs="tabs"
					@tab-change="onTabChange"
				/>
			</template>
		</OrganismsContentSection>
	</div>
</template>
