<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";
	import type { TMovie } from "~/types/Movie";

	const route = useRoute();
	const router = useRouter();
	const page = ref(Number(route.query.page) || 1);
	const query = ref({
		page: page.value,
	});
	const total = ref(0);
	const totalPages = ref(0);

	interface Collections {
		[key: string]: {
			title: string;
			description: string;
		};
	}

	const collections: Collections = {
		TOP_POPULAR_MOVIES: {
			title: "Популярные фильмы",
			description:
				"Самые популярные фильмы, которые покорили зрителей. Откройте для себя лучшие киноленты, которые обсуждают все!",
		},
		POPULAR_SERIES: {
			title: "Популярные сериалы",
			description:
				"Лучшие сериалы, которые затянут вас с первых минут. Драмы, комедии, триллеры — выбирайте то, что вам по душе.",
		},
		COMICS_THEME: {
			title: "Супергерои",
			description:
				"Мир супергероев, где добро борется со злом. Приключения, экшен и захватывающие сюжеты ждут вас!",
		},
		VAMPIRE_THEME: {
			title: "Про вампиров",
			description:
				"Таинственные истории о вампирах, их любви, борьбе и вечной жизни. Погрузитесь в мир тьмы и магии.",
		},
		FAMILY: {
			title: "Семейные",
			description:
				"Фильмы для всей семьи, которые подарят тепло и радость. Смотрите вместе с детьми и наслаждайтесь добрыми историями.",
		},
		OSKAR_WINNERS_2021: {
			title: "Получившие Оскар",
			description:
				"Лучшие фильмы, отмеченные премией Оскар. Шедевры кинематографа, которые стоит посмотреть каждому.",
		},
		ZOMBIE_THEME: {
			title: "Про зомби",
			description:
				"Мир, охваченный апокалипсисом, где зомби — главная угроза. Ужасы, экшен и борьба за выживание.",
		},
		LOVE_THEME: {
			title: "Мелодрамы",
			description:
				"Трогательные истории о любви, которые заставят вас смеяться и плакать. Романтика, которая тронет сердце.",
		},
		CATASTROPHE_THEME: {
			title: "Катастрофы",
			description:
				"Фильмы о глобальных катастрофах и борьбе человечества за выживание. Напряжение, драма и спецэффекты.",
		},
		KIDS_ANIMATION_THEME: {
			title: "Для детей",
			description:
				"Яркие и добрые мультфильмы для маленьких зрителей. Веселые приключения и поучительные истории.",
		},
	};

	const breadcrumbs = ref([
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Подборки",
			to: "/collections",
		},
		{
			label: "",
		},
	]);

	const {
		data: dataCollection,
		error: errorCollection,
		isLoading: isLoadingCollection,
		fetchData: fetchDataCollection,
	} = useFetchData<{
		total: number;
		totalPages: number;
		items: TMovie[];
	}>(`v2.2/films/collections?type=${route.params.id}`, query);

	const {
		data: dataFilters,
		error: errorFilters,
		fetchData: fetchDataFilters,
	} = useFetchData<TGenresAndCountries | null>("v2.2/films/filters");

	onMounted(() => {
		fetchDataCollection();
		fetchDataFilters();
	});

	const updateCollection = computed(() => {
		const collectionId = String(route.params.id); // Приводим к строке
		return (
			collections[collectionId] || {
				title: "Неизвестная коллекция",
				description: "",
			}
		);
	});

	watchEffect(() => {
		const title = updateCollection.value.title;
		if (title) {
			useSeoMeta({
				title: `myMovies - Подборка ${title} - cмотрите самые лучшие фильмы онлайн в хорошем качестве`,
				description: `myMovies - Смотрите лучшие фильмы онлайн в коллекции ${title} на myMovies! У нас собрана большая коллекция фильмов, которые поднимут вам настроение и подарят незабываемые эмоции. Наслаждайтесь просмотром в HD-качестве.`,
			});

			// Обновление хлебных крошек
			breadcrumbs.value[2].label = title;
		}
	});

	watch(dataCollection, (newDataCollection) => {
		if (newDataCollection) {
			total.value = newDataCollection.total;
			totalPages.value = newDataCollection.totalPages;
		}
	});

	// Отслеживаем изменения page и обновляем query и URL
	watch(page, (newPage) => {
		if (newPage) {
			query.value.page = newPage; // Обновляем query
			router.push({ query: { page: newPage } }); // Обновляем URL
			fetchDataCollection(); // Выполняем запрос
		}
	});

	const { filteredMovies } = useMovieFilters(
		computed(() => dataCollection.value?.items || [])
	);

	// Функция добавления id жанров
	const updateMovieWithGenres = computed(() => {
		if (filteredMovies.value && dataFilters.value) {
			return addGenreIds(filteredMovies.value, dataFilters.value.genres);
		}
		return filteredMovies.value || [];
	});
</script>

<template>
	<AtomsPreloader v-if="isLoadingCollection" />

	<AtomsErrorData v-if="errorCollection"
		>Ошибка при получении данных</AtomsErrorData
	>

	<OrganismsHeroSection
		class="fade-in"
		v-if="dataCollection && !errorCollection"
		bgImage="/img/bg/collection-page.jpeg"
	>
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle
			class="hero-section__title"
			:mainTitleStrong="updateCollection.title"
		/>
	</OrganismsHeroSection>

	<OrganismsContentSection
		class="fade-in"
		v-if="(dataCollection && !errorCollection) || errorFilters"
	>
		<template #head-content>
			<AtomsTextBlock>
				<p class="text-block__text">{{ updateCollection.description }}</p>
			</AtomsTextBlock>
		</template>

		<template #body-content>
			<MoleculesMoviesList class="top__movie-list">
				<li
					class="movies-list-preview__item"
					v-for="movie in updateMovieWithGenres"
					:key="movie.filmId"
				>
					<OrganismsMovieCard class="movie-card--preview" :movie="movie" />
				</li>
			</MoleculesMoviesList>
		</template>

		<template #link>
			<MoleculesPagination
				class="content-section__pagination"
				v-if="dataCollection?.items.length"
				v-model:page="page"
				:total="total"
				:totalPages="totalPages"
				:pageCount="20"
			/>
		</template>
	</OrganismsContentSection>
</template>
