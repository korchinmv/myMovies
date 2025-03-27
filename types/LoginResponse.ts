import type { TUser } from "./User";

export type TLoginResponse = {
	token: string;
	data: TUser;
};
