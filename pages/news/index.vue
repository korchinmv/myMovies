<script setup lang="ts">
	import type { TNews } from "~/types/News";

	useSeoMeta({
		title: "myMovies - Новости о фильмах 2025: премьеры, актеры, сюжеты",
		description:
			"myMovies - Читайте свежие новости о фильмах 2025 года. Узнайте о самых ожидаемых премьерах, актерах и сюжетах. Смотрите новинки кино в нашем онлайн-кинотеатре!",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Новости",
		},
	];

	const { data, pending, error } = useFetchData<{
		total: number;
		totalPages: number;
		items: TNews[];
	}>("v1/media_posts");
</script>

<template>
	<div class="news">
		<OrganismsHeroSection bgImage="img/bg/news.jpg">
			<OrganismsBreadcrumbs
				class="hero-section__breadcrumbs"
				:breadcrumbs="breadcrumbs"
			/>

			<AtomsMainTitle
				class="news__title"
				mainTitleStrong="Новости"
				mainTitle="кино"
			/>
		</OrganismsHeroSection>

		<OrganismsContentSection>
			<template #head-content>
				<AtomsTextBlock>
					<p class="text-block__text">
						Узнайте все о самых ожидаемых фильмах 2025 года на нашем сайте! Мы
						собрали для вас свежие новости о грядущих премьерах, интересные
						факты о съемках, а также эксклюзивные интервью с актерами и
						режиссерами. Откройте для себя новые блокбастеры, драмы, комедии и
						фантастику, которые уже скоро появятся в нашем онлайн-кинотеатре.
					</p>
				</AtomsTextBlock>
			</template>

			<template #body-content>
				<AtomsPreloader v-if="pending" />
				<AtomsErrorData v-else-if="error">
					Ошибка при получении данных
				</AtomsErrorData>
				<ul class="news__list" v-else>
					<li
						class="news__item"
						v-for="news in data?.items"
						:key="news.kinopoiskId"
					>
						<OrganismsNewsCard :news="news" />
					</li>
				</ul>
			</template>

			<template #link>
				<span v-show="error || pending">PAGINATION</span>
			</template>
		</OrganismsContentSection>
	</div>
</template>
