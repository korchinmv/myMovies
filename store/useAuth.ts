import type { TUser } from "~/types/User";

export const useAuth = defineStore("auth", {
	state: () => ({
		token: null as string | null,
		isAuth: false,
		user: null as TUser | null,
	}),

	actions: {
		// Метод для установки токена (теперь принимает cookie и localStorage как параметры)
		setToken(
			token: string,
			options?: { setCookie?: boolean; setLocalStorage?: boolean }
		) {
			this.token = token;
			this.isAuth = true;

			// Опционально устанавливаем куки (должно вызываться из компонента)
			if (options?.setCookie && process.server) {
				const tokenCookie = useCookie("token", {
					path: "/",
					maxAge: 60 * 60 * 24 * 7,
					secure: true,
					sameSite: "strict",
				});
				tokenCookie.value = token;
			}

			// Опционально устанавливаем localStorage
			if (options?.setLocalStorage && process.client) {
				localStorage.setItem("token", token);
			}
		},

		setUser(user: TUser) {
			this.user = user;
		},

		// Метод для выхода (теперь принимает флаги для очистки)
		logout(options?: { clearCookie?: boolean; clearLocalStorage?: boolean }) {
			this.$reset();

			// Очистка кук (работает только при SSR)
			if (options?.clearCookie) {
				const tokenCookie = useCookie("token");
				tokenCookie.value = null;
			}

			// Очистка localStorage (только на клиенте)
			if (options?.clearLocalStorage && process.client) {
				localStorage.removeItem("token");
			}

			// Для клиентской очистки кук добавляем document.cookie
			if (options?.clearCookie && process.client) {
				document.cookie =
					"token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			}
		},

		// Метод проверки аутентификации (теперь принимает токен и serverUrl как параметры)
		async checkAuth(token?: string | null, serverUrl?: string) {
			// Если токен не передан, пытаемся получить его из аргументов или состояния
			const authToken =
				token ||
				this.token ||
				(process.client ? localStorage.getItem("token") : null);

			if (!authToken) return false;

			try {
				const user = await $fetch<TUser>(`${serverUrl}/auth_me`, {
					headers: { Authorization: `Bearer ${authToken}` },
				});

				// Обновляем состояние без автоматической установки кук/localStorage
				this.token = authToken;
				this.isAuth = true;
				this.user = user;

				return true;
			} catch (error) {
				console.error("Auth check failed:", error);
				// Вызываем logout без автоматической очистки хранилищ
				this.$reset();
				return false;
			}
		},
	},
});
