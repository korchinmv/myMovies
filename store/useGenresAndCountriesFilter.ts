import type { TFilterData, TGenresAndCountries } from "~/types/Filters";

export const useGenresAndCountriesFilter = defineStore(
	"genresAndCountriesFilter",
	{
		state: () => ({
			filterGenresAndCountries: {
				genres: [] as TFilterData[],
				countries: [] as TFilterData[],
			},
		}),
		actions: {
			// Действие для обновления данных
			setDataGenresAndCountriesFilters(data: TGenresAndCountries) {
				this.filterGenresAndCountries = data;
			},
		},
	}
);
