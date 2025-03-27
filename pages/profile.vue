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
				&#128075 Привет, {{ user?.name }}. В личном кабинете можно изменять данные профиля. 
			</AtomsTextBlock>
		</template>

		<template #body-content>
			<h2>{{ user?.name }}</h2>
		</template>

		<template #link>
			<button class="content-section__link button-primary" @click="logout">
				Выйти из профиля
			</button>
		</template>
	</OrganismsContentSection>
</template>
