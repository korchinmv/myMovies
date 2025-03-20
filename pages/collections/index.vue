<script setup lang="ts">
	useSeoMeta({
		title:
			"myMovies - Лучшие подборки фильмов — смотрите топовые коллекции настроению",
		description:
			"myMovies - Наслаждайтесь лучшими подборками фильмов на myMovies! Топовые коллекции по жанрам, рейтингам и настроению. Откройте для себя новые фильмы, классику кино и скрытые жемчужины. Смотрите онлайн в отличном качестве!",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Подборки",
		},
	];
</script>
<template>
	<OrganismsHeroSection bgImage="/img/bg/collections-page.jpg">
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Подборки"
			mainTitle="фильмов"
		/>
	</OrganismsHeroSection>

	<OrganismsContentSection class="content-section">
		<template #head-content>
			<AtomsTextBlock>
				<p class="text-block__text">
					На этой странице вы найдете уникальные подборки фильмов, которые
					помогут вам выбрать идеальный фильм для любого настроения и случая. Мы
					собрали для вас коллекции по жанрам, годам, рейтингам и популярным
					темам. Независимо от того, ищете ли вы захватывающие боевики,
					трогательные драмы, увлекательные фантастические фильмы или веселые
					комедии, у нас есть что-то для каждого.
				</p>
			</AtomsTextBlock>
		</template>

		<template #body-content> </template>
	</OrganismsContentSection>
</template>
