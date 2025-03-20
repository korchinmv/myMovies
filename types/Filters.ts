export type TFilterGenres = {
	id?: number;
	genre: string;
};

export type TFilterCountries = {
	id: number;
	genre: string;
};

export type TGenresAndCountries = {
	genres: TFilterGenres[];
	countries: TFilterCountries[];
};
