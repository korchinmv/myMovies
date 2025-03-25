export const useMovieFilters = <
	T extends { nameRu: string | null; nameEn: string | null },
>(
	data: ComputedRef<T[] | undefined>,
	filterCondition: (movie: T) => boolean = (movie) =>
		movie.nameRu !== null || movie.nameEn !== null
) => {
	const filteredMovies = computed(() => {
		return data.value?.filter(filterCondition) || [];
	});

	return {
		filteredMovies,
	};
};
