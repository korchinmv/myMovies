<script setup lang="ts">
	import type { TNews } from "~/types/News";

	const config = useRuntimeConfig();

	useSeoMeta({
		title: "myMovies - Свежие новинки, анонсы и обзоры фильмов и сериалов",
		description:
			"myMovies - Читайте свежие новости о кино на нашем онлайн-кинотеатре. Узнавайте первыми о новинках, анонсах фильмов, эксклюзивных интервью и обзорах. Все самое интересное из мира кино в одном месте!",
	});

	const route = useRoute();
	const router = useRouter();
	const page = ref(Number(route.query.page) || 1);
	const query = ref({
		page: page.value,
	});
	const total = ref(0);
	const totalPages = ref(0);

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Новости",
		},
	];

	const { data, isLoading, error, fetchData } = useFetchData<{
		total: number;
		totalPages: number;
		items: TNews[];
	}>(config.public.baseUrl + "v1/media_posts", { query });

	watch(
		() => route.query.page,
		(newPage) => {
			if (newPage) {
				page.value = Number(newPage);
				query.value.page = Number(newPage); // Обновляем query
			}
		}
	);

	// Обновляем total и totalPages при изменении данных
	watch(data, (newData) => {
		if (newData) {
			total.value = newData.total;
			totalPages.value = newData.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		query.value.page = newPage; // Обновляем query
		router.push({ query: { page: newPage } }); // Обновляем URL
		fetchData(); // Выполняем запрос
	});

	onMounted(() => {
		fetchData();
	});
</script>

<template>
	<div class="news">
		<AtomsPreloader v-if="isLoading" />
		<AtomsErrorData v-else-if="error">
			Ошибка при получении данных
		</AtomsErrorData>

		<OrganismsHeroSection
			v-if="data"
			bgImage="/img/bg/news-page.jpg"
			class="fade-in"
		>
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

		<OrganismsContentSection v-if="data" class="fade-in">
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
				<ul class="news__list">
					<li
						class="news__item fade-in"
						v-for="news in data?.items"
						:key="news.kinopoiskId"
					>
						<OrganismsNewsCard :news="news" />
					</li>
				</ul>
			</template>

			<template #link>
				<MoleculesPagination
					class="news__pagination"
					v-if="data?.items.length && totalPages > 1"
					v-model:page="page"
					:total="total"
					:totalPages="totalPages"
					:pageCount="20"
				/>
			</template>
		</OrganismsContentSection>
	</div>
</template>
