export type TFilm = {
	filmId: number;
	nameRu?: string;
	nameEn?: string;
	rating?: string;
	general: boolean;
	description: string;
	professionKey: string;
};

export type TSpouse = {
	personId: number;
	name: string;
	divorced: boolean;
	divorcedReason: string;
	sex: string;
	children: number;
	webUrl: string;
	relation: string;
};

export type TActorPage = {
	personId: number;
	webUrl: string;
	nameRu: string;
	nameEn: string;
	sex: string;
	posterUrl: string;
	growth: number;
	birthday: string;
	death: number;
	age: number;
	birthplace: string;
	deathplace: string;
	spouses: TSpouse[];
	hasAwards: number;
	profession: string;
	facts: string[];
	films: TFilm[];
};
