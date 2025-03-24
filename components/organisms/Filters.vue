<script setup lang="ts">
	import orderOptions from "~/data/orderOptions";
	import ratingOptions from "~/data/ratingOptions";
	import yearsOptions from "~/data/yearsOptions";
	import type { TGenresAndCountries } from "~/types/Filters";

	defineProps<{
		dataFilters: TGenresAndCountries;
	}>();

	const selectKey = ref(0);

	const filters = reactive({
		selectedCountry: "" as string | number,
		selectedGenre: "" as string | number,
		ratingFrom: "" as string | number,
		ratingTo: "" as string | number,
		yearFrom: "" as string | number,
		yearTo: "" as string | number,
		order: "" as string | number,
	});

	const hasActiveFilters = computed(() => {
		return Object.values(filters).some(
			(value) => value !== "" && value !== null && value !== undefined
		);
	});

	const emit = defineEmits<{
		(e: "update-filters", filters: Record<string, any>): void;
	}>();

	const applyFilters = () => {
		emit("update-filters", { ...filters });
	};

	const resetFilters = () => {
		Object.assign(filters, {
			selectedCountry: "",
			selectedGenre: "",
			ratingFrom: "",
			ratingTo: "",
			yearFrom: "",
			yearTo: "",
			order: "",
		});

		selectKey.value += 1;

		emit("update-filters", { ...filters });
	};
</script>

<template>
	<div class="filters">
		<div class="filters__selects">
			<MoleculesCustomSelect
				v-model="filters.selectedCountry"
				:key="'country-' + selectKey"
				:options="
					dataFilters.countries.map((country) => ({
						id: country.id,
						optionName: country.country,
					}))
				"
				placeholder="Все страны"
			>
				<Icon
					class="custom-select__icon"
					name="material-symbols:arrow-drop-down"
					size="20px"
			/></MoleculesCustomSelect>

			<MoleculesCustomSelect
				v-model="filters.selectedGenre"
				:key="'genre-' + selectKey"
				:options="
					dataFilters.genres.map((genre) => ({
						id: genre.id ?? 0,
						optionName: genre.genre,
					}))
				"
				placeholder="Все жанры"
			>
				<Icon
					class="custom-select__icon"
					name="material-symbols:arrow-drop-down"
					size="20px"
			/></MoleculesCustomSelect>

			<MoleculesCustomSelect
				v-model="filters.ratingFrom"
				:key="'rating-' + selectKey"
				:options="
					ratingOptions.map((rating) => ({
						id: rating.id ?? 0,
						optionName: rating.label,
					}))
				"
				placeholder="Рейтинг"
			>
				<Icon
					class="custom-select__icon"
					name="material-symbols:arrow-drop-down"
					size="20px"
			/></MoleculesCustomSelect>

			<MoleculesCustomSelect
				v-model="filters.yearFrom"
				:key="'year-' + selectKey"
				:options="
					yearsOptions.map((year) => ({
						id: year.id ?? 0,
						optionName: year.label,
					}))
				"
				placeholder="Год"
			>
				<Icon
					class="custom-select__icon"
					name="material-symbols:arrow-drop-down"
					size="20px"
			/></MoleculesCustomSelect>

			<MoleculesCustomSelect
				v-model="filters.order"
				:key="'order-' + selectKey"
				:options="
					orderOptions.map((order) => ({
						id: order.id ?? 0,
						optionName: order.label,
					}))
				"
				placeholder="Сортировка"
			>
				<Icon class="custom-select__icon" name="iconoir:sort-down" size="20px"
			/></MoleculesCustomSelect>

			<button
				class="filters__reset"
				@click="resetFilters"
				v-if="hasActiveFilters"
			>
				<Icon name="solar:close-circle-linear" size="30px" />
			</button>
		</div>

		<button class="filters__btn button-primary" @click="applyFilters">
			Применить
		</button>
	</div>
</template>
