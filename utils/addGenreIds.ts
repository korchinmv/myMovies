import type { TFilterGenres } from "~/types/Filters";
import type { TMovie } from "~/types/Movie";

const addGenreIds = (
	input: TMovie | TMovie[],
	genres: TFilterGenres[]
): any => {
	// Если входной аргумент — массив
	if (Array.isArray(input)) {
		return input.map((movie) => ({
			...movie,
			genres: movie.genres?.map((movieGenre) => ({
				...movieGenre,
				id:
					genres.find((genre) => genre.genre === movieGenre.genre)?.id || null,
			})),
		}));
	}

	// Если входной аргумент — одиночный объект
	return {
		...input,
		genres: input.genres?.map((movieGenre) => ({
			...movieGenre,
			id: genres.find((genre) => genre.genre === movieGenre.genre)?.id || null,
		})),
	};
};

export default addGenreIds;
