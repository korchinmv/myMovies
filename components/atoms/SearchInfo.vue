<script setup lang="ts">
	interface Props {
		searchName: string;
		searchedCount: number;
	}

	defineProps<Props>();
</script>

<template>
	<div class="search-info">
		<span class="search-info__text">Вы искали: {{ searchName }}</span>

		<span class="search-info__text">Найдено: {{ searchedCount }} фильмов</span>
	</div>
</template>
