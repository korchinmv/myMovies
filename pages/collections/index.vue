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
	<OrganismsHeroSection bgImage="/img/bg/collections-page.jpg" class="fade-in">
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

	<OrganismsContentSection class="content-section fade-in">
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

		<template #body-content>
			<MoleculesList>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Популярные фильмы'"
						image="/img/collections/movies.jpg"
						url="/collections/TOP_POPULAR_MOVIES"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Популярные сериалы'"
						image="/img/collections/series.jpg"
						url="/collections/POPULAR_SERIES"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Супергерои'"
						image="/img/collections/comics.jpg"
						url="/collections/COMICS_THEME"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Про вампиров'"
						image="/img/collections/vampires.jpg"
						url="/collections/VAMPIRE_THEME"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Семейные'"
						image="/img/collections/family.jpg"
						url="/collections/FAMILY"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Получившие Оскар'"
						image="/img/collections/oscar.jpg"
						url="/collections/OSKAR_WINNERS_2021"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Про зомби'"
						image="/img/collections/zombie.jpg"
						url="/collections/ZOMBIE_THEME"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Мелодрамы'"
						image="/img/collections/love.png"
						url="/collections/LOVE_THEME"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Катастрофы'"
						image="/img/collections/cata.jpg"
						url="/collections/CATASTROPHE_THEME"
					/>
				</li>
				<li class="list__item">
					<OrganismsCollectionCard
						:name="'Для детей'"
						image="/img/collections/mult.jpg"
						url="/collections/KIDS_ANIMATION_THEME"
					/>
				</li>
			</MoleculesList>
		</template>
	</OrganismsContentSection>
</template>
