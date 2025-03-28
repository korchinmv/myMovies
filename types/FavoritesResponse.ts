import type { TMovie } from "./Movie";

export type FavoritesResponse = Array<{
	movieId: number;
	movieData: TMovie;
	id: number;
	user_id: number;
}>;
