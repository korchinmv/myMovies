import type { TUser } from "./User";

export type TRegisterResponse = {
	token: string;
	data: TUser;
};
