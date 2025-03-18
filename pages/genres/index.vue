<script setup lang="ts">
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
</script>

<template>
	<OrganismsHeroSection bgImage="/img/bg/genres-page.jpg">
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

	<OrganismsContentSection class="content-section">
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
			<MoleculesGenresList>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
				<li class="genres-list__item">
					<OrganismsGenreCard />
				</li>
			</MoleculesGenresList>
		</template>
	</OrganismsContentSection>
</template>
