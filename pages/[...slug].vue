<script setup>
	const router = useRouter();

	useSeoMeta({
		title: "404 - Страница не найдена",
	});

	definePageMeta({
		layout: "clear",
	});

	const goBack = () => {
		router.go(-1);
	};
</script>

<template>
	<div class="page-404">
		<h1 class="page-404__title">404</h1>
		<p class="page-404__text">
			Извините, но страница, которую вы ищете, не существует или не доступна.
		</p>
		<button class="page-404__link button-primary" @click="goBack">
			Вернуться назад
		</button>
	</div>
</template>
