<script lang="ts" setup>
	import { useAuth } from "~/store/useAuth";

	const authStore = useAuth();
	const { user } = storeToRefs(authStore);
	

	useSeoMeta({
		title: "myMovies - Профиль пользователя",
		description:
			"myMovies - На странице профиля можно посмотреть подробную информацию о пользователе",
	});

	const breadcrumbs = [
		{
			label: "Главная",
			to: "/",
		},
		{
			label: "Профиль",
		},
	];

	const logout = () => {
		authStore.logout({ clearCookie: true, clearLocalStorage: true });
		navigateTo("/");
	};
</script>

<template>
	<div class="profile-page">
	<OrganismsHeroSection bgImage="/img/bg/profile-page.jpg" class="fade-in">
		<OrganismsBreadcrumbs
			class="hero-section__breadcrumbs"
			:breadcrumbs="breadcrumbs"
		/>
		<AtomsMainTitle
			class="hero-section__title"
			mainTitleStrong="Профиль"
			mainTitle="Пользователя"
		/>
	</OrganismsHeroSection>

	<OrganismsContentSection class="fade-in">
		<template #head-content>
			<AtomsTextBlock>
				<p class="text-block__text">&#128075 Привет, {{ user?.name }}</p>
			</AtomsTextBlock>
		</template>

		<template #body-content>
			<ul class="profile-page__content-list">
				<li class="profile-page__content-item">Ваш email: {{ user?.email }}</li>
				<li class="profile-page__content-item">Имя: {{ user?.name }}</li>
			</ul>
		</template>

		<template #link>
		<div class="profile-page__wrap-btns">
			<NuxtLink
				class="button-primary"
				to="/favorites"
				>Перейти в избранное</NuxtLink>

				<button class="button-primary button-primary--red" @click="logout">
				Выйти из профиля
			</button>
		</div>
		</template>
	</OrganismsContentSection>
</div>
</template>
