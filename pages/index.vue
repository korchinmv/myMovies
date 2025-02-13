<script lang="ts" setup>
	useSeoMeta({
		title: "myMovies - смотрите Лучшие Фильмы и Сериалы Онлайн",
		description:
			"myMovies - большой каталог фильмов и сериалов онлайн. Без рекламы, без регистрации. Качество HD. Смотри лучшие фильмы и сериалы прямо сейчас!",
	});
</script>

<template>
	<OrganismsHeroSection bgImage="img/bg/bg-main-page.jpeg">
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Лучшие"
			mainTitle="новинки"
		/>
		<MoleculesSlider className="hero-section__slider" />
	</OrganismsHeroSection>

	<OrganismsContentSection>
		<template #title>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Популярные"
				sectionTitle="фильмы"
		/></template>
		<template #link>
			<NuxtLink class="content-section__link button-primary" to="/movies"
				>Все фильмы</NuxtLink
			></template
		>
	</OrganismsContentSection>

	<OrganismsContentSection>
		<template #title>
			<AtomsSectionTitle
				class="content-section__title"
				sectionTitleStrong="Лучшие"
				sectionTitle="сериалы"
		/></template>

		<template #link>
			<NuxtLink class="content-section__link button-primary" to="/series"
				>Все сериалы</NuxtLink
			></template
		>
	</OrganismsContentSection>
</template>
