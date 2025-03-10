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
	spouses: Array<{
		personId: number;
		name: string;
		divorced: boolean;
		divorcedReason: string;
		sex: string;
		children: number;
		webUrl: string;
		relation: string;
	}>;
	hasAwards: number;
	profession: string;
	facts: Array<string>;
	films: Array<{
		filmId: number;
		nameRu?: string;
		nameEn?: string;
		rating?: string;
		general: boolean;
		description: string;
		professionKey: string;
	}>;
};
