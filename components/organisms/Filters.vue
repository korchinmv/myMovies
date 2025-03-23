<script setup lang="ts">
	import type { TGenresAndCountries } from "~/types/Filters";

	defineProps<{
		dataFilters: TGenresAndCountries;
	}>();

	const filters = reactive({
		selectedCountry: "" as string | number,
		selectedGenre: "" as string | number,
		ratingFrom: "" as string | number,
		ratingTo: "" as string | number,
		yearFrom: "" as string | number,
		yearTo: "" as string | number,
	});

	const emit = defineEmits<{
		(e: "update-filters", filters: Record<string, any>): void;
	}>();

	const applyFilters = () => {
		emit("update-filters", { ...filters });
	};
</script>

<template>
	<div class="filters">
		<MoleculesCustomSelect
			v-model="filters.selectedCountry"
			:options="
				dataFilters.countries.map((country) => ({
					id: country.id,
					country: country.country,
				}))
			"
			placeholder="Все страны"
		/>

		<MoleculesCustomSelect
			v-model="filters.selectedGenre"
			:options="
				dataFilters.genres.map((genre) => ({
					id: genre.id ?? 0,
					genre: genre.genre,
				}))
			"
			placeholder="Все жанры"
		/>

		<!-- <MoleculesCustomSelect
			v-model="filters.ratingFrom"
			:options="
				dataFilters.genres.map((genre) => ({
					id: genre.id ?? 0,
					genre: genre.genre,
				}))
			"
			placeholder="Все жанры"
		/> -->

		<input
			class="custom-input"
			type="text"
			v-model="filters.yearFrom"
			placeholder="Год от"
		/>
		<input
			class="custom-input"
			type="text"
			v-model="filters.yearTo"
			placeholder="Год до"
		/>

		<button class="button-primary" @click="applyFilters">Применить</button>
	</div>
</template>
