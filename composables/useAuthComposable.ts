import type { TLoginResponse } from "~/types/LoginResponse";
import type { TRegisterResponse } from "~/types/RegisterResponse";
import type { TUser } from "~/types/User";
import { useAuth } from "~/store/useAuth";

export const useAuthComposable = () => {
	const authStore = useAuth();
	const config = useRuntimeConfig();
	const error = ref<string | null>(null);
	const isLoading = ref(false);
	const redirectPath = useCookie("redirectPath");

	// Общая функция для установки токена
	const setAuthToken = (token: string, userData: TUser) => {
		const tokenCookie = useCookie("token", {
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
			secure: true,
			sameSite: "strict",
		});

		tokenCookie.value = token;
		authStore.setToken(token, { setCookie: true, setLocalStorage: true });
		authStore.setUser(userData);
	};

	// Функция регистрации
	const register = async (credentials: {
		email: string;
		name: string;
		password: string;
	}) => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await $fetch<TRegisterResponse>(
				`${config.public.serverUrl}/register`,
				{
					method: "POST",
					body: credentials,
				}
			);

			if (!response.token) throw new Error("Токен не получен от сервера");

			setAuthToken(response.token, response.data);
			return { success: true };
		} catch (err: any) {
			error.value =
				err.data?.message || "Ошибка регистрации. Попробуйте позже.";
			return { success: false, error: error.value };
		} finally {
			isLoading.value = false;
		}
	};

	// Функция входа
	const login = async (credentials: { email: string; password: string }) => {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await $fetch<TLoginResponse>(
				`${config.public.serverUrl}/auth`,
				{
					method: "POST",
					body: credentials,
				}
			);

			if (!response.token) throw new Error("Токен не получен от сервера");

			setAuthToken(response.token, response.data);
			return { success: true };
		} catch (err: any) {
			error.value = "Не удалось войти, проверьте данные";
			return { success: false, error: error.value };
		} finally {
			isLoading.value = false;
		}
	};

	return {
		error,
		isLoading,
		redirectPath,
		register,
		login,
		setAuthToken,
	};
};
