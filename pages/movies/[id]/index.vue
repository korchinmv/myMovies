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
		{ title: "Отзывы" },
		{ title: "Сиквелы" },
		{ title: "Похожие фильмы" },
	];

	const activeTabIndex = ref<number>(0);

	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};

	const images = [
		{
			img: "/img/bg/360.webp",
		},
		{
			img: "/img/bg/360.webp",
		},
	];

	onMounted(() => {
		console.log("Fancybox is available:", window.Fancybox); // Лог для проверки
	});
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

			<template #body-content>
				<MoleculesTabsContent :active-tab-index="activeTabIndex">
					<template #tab1>
						<ul class="gallery">
							<ClientOnly>
								<a
									v-for="(img, index) in images"
									:key="index"
									:href="img.img"
									data-fancybox="gallery"
								>
									<img :src="img.img" />
								</a>
							</ClientOnly>
						</ul>
					</template>
					<template #tab2>
						<div class="">tab2</div>
					</template>
					<template #tab3>
						<div class="">tab3</div>
					</template>
					<template #tab4>
						<div class="">tab4</div>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
