<script setup lang="ts">
	import type { TActorPage } from "~/types/ActorPage";

	const activeTabIndex = ref<number>(0);
	const route = useRoute();
	const router = useRouter();
	const tabs = [{ title: "Фильмы" }, { title: "Факты" }];
	const onTabChange = (index: number) => {
		activeTabIndex.value = index;
	};

	const { data, isLoading, error, fetchData } = useFetchData<TActorPage>(
		`v1/staff/${route.params.id}`
	);

	// Количество отображаемых фильмов
	const visibleFilmsCount = ref(16); // Начальное количество фильмов
	const showMoreFilms = () => {
		visibleFilmsCount.value += 16; // Увеличиваем количество на 16
	};

	// Фильтрация фильмов
	const filtredFilms = computed(() => {
		return data.value?.films?.filter((movie) => movie.nameRu !== null) || [];
	});

	// Обрезанный массив фильмов
	const visibleFilms = computed(() => {
		return filtredFilms.value.slice(0, visibleFilmsCount.value);
	});

	// Проверка, есть ли ещё фильмы для отображения
	const hasMoreFilms = computed(() => {
		return visibleFilmsCount.value < filtredFilms.value.length;
	});

	watch(data, (newData) => {
		if (newData) {
			useSeoMeta({
				title: `myMovies - ${newData.nameRu} - Об актере, фильмы, факты`,
				description: `myMovies - Полная информация о актере ${newData.nameRu}`,
			});
		}
	});

	onMounted(() => {
		fetchData();
	});

	const goBack = () => {
		router.go(-1);
	};
</script>

<template>
	<div class="actor">
		<OrganismsHeroSection bgImage="/img/bg/actor-page.jpg" class="fade-in">
			<AtomsPageTitle
				class="actor__title"
				:pageTitle="data?.nameRu || 'Загрузка...'"
			/>
			<AtomsPreloader v-if="isLoading" />
			<AtomsErrorData v-else-if="error">
				Ошибка при получении данных
			</AtomsErrorData>
			<div v-else class="actor__wrapper">
				<div class="actor__inner">
					<NuxtImg
						class="actor__img"
						:src="data?.posterUrl"
						:alt="data?.nameRu"
						width="240"
					/>

					<ul class="actor__content-list" v-if="data">
						<li class="actor__content-item">
							<span class="actor__content-text">Карьера:</span>
							<span class="actor__content-text">{{
								data.profession || "Нет данных"
							}}</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Всего фильмов:</span>
							<span class="actor__content-text">{{
								data.films.length || "Нет данных"
							}}</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Родился:</span>
							<span class="actor__content-text">{{
								dateStringFormat(data.birthday) || "Нет данных"
							}}</span>
						</li>
						<li v-show="data.death" class="actor__content-item">
							<span class="actor__content-text">Умер:</span>
							<span class="actor__content-text">{{
								data.death || "Нет данных"
							}}</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Место рождения:</span>
							<span class="actor__content-text">{{
								data.birthplace || "Нет данных"
							}}</span>
						</li>
						<li v-show="data.deathplace" class="actor__content-item">
							<span class="actor__content-text">Место смерти:</span>
							<span class="actor__content-text">{{
								data.deathplace || "Нет данных"
							}}</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Возраст:</span>
							<span class="actor__content-text">{{
								`${data.age} лет` || "Нет данных"
							}}</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Рост:</span>
							<span class="actor__content-text">{{
								`${data.growth} см` ||
								"Нет данных" ||
								data.growth ||
								"Нет данных"
							}}</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Муж/жена:</span>

							<span v-if="data.spouses.length === 0" class="actor__content-text"
								>Нет данных</span
							>

							<span
								v-for="(spouse, index) in data.spouses"
								:key="spouse.personId"
								class="actor__content-text"
								>{{ spouse.name
								}}<span v-if="index !== data.spouses.length - 1">,</span>
							</span>
						</li>
						<li class="actor__content-item">
							<span class="actor__content-text">Награды:</span>
							<span class="actor__content-text">{{
								data.hasAwards || "Нет данных"
							}}</span>
						</li>
					</ul>
				</div>

				<button
					v-show="data"
					class="actor__link button-primary"
					@click="goBack"
				>
					Вернуться назад
				</button>
			</div>
		</OrganismsHeroSection>
		<OrganismsContentSection class="fade-in">
			<template #head-content>
				<MoleculesTabs
					class="actor__tabs"
					:tabs="tabs"
					@tab-change="onTabChange"
				/>
			</template>

			<template #body-content>
				<MoleculesTabsContent :active-tab-index="activeTabIndex">
					<template #tab1>
						<ul class="actor__movie-list" v-if="visibleFilms.length">
							<li
								v-for="movie in visibleFilms"
								class="actor__movie-item fade-in"
								:key="movie.filmId"
							>
								<MoleculesActorsFilm :movie="movie" />
							</li>
						</ul>
						<button
							class="actor__show-more button-primary"
							v-if="hasMoreFilms"
							@click="showMoreFilms"
						>
							Показать ещё
						</button>
					</template>

					<template #tab2>
						<ul class="actor__facts" v-if="data?.facts">
							<li
								v-for="(fact, index) in data.facts"
								class="actor__facts-item fade-in"
								:key="index"
							>
								{{ fact }}
							</li>
						</ul>
					</template>
				</MoleculesTabsContent>
			</template>
		</OrganismsContentSection>
	</div>
</template>
