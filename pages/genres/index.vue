<script setup lang="ts">
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
	<OrganismsHeroSection bgImage="img/bg/genres.jpg">
		<AtomsMainTitle
			class="hero-section__title hero-section__title--genres"
			mainTitleStrong="Жанры"
			mainTitle="фильмов"
		/>
		<OrganismsBreadcrumbs :breadcrumbs="breadcrumbs" />
	</OrganismsHeroSection>
	<OrganismsContentSection>
		<template #text>
			<AtomsTextBlock>
				<p class="text-block__text">
					Добро пожаловать в раздел жанров нашего онлайн-кинотеатра! Здесь вы
					найдёте огромный каталог фильмов, отсортированных по различным жанрам.
					Независимо от ваших предпочтений — будь то комедии, драмы, боевики,
					мультфильмы или научная фантастика — у нас есть всё, что вам нужно!
				</p>
			</AtomsTextBlock>
		</template>
	</OrganismsContentSection>
</template>
