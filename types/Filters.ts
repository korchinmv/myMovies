export type TFilterData = {
	id: number;
	genre: string;
};

export type TGenresAndCountries = {
	genres: TFilterData[];
	countries: TFilterData[];
};
