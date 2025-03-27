import { useAuth } from "~/store/useAuth";

export default defineNuxtRouteMiddleware(async (to) => {
	const config = useRuntimeConfig();
	const auth = useAuth();
	const { isAuth } = storeToRefs(auth);

	// 1. Получаем токен из куки независимо от isAuth
	const token = useCookie("token").value;

	// 2. Определяем типы маршрутов
	const protectedRoutes = ["/profile", "/favorites", "/settings"];
	const guestRoutes = ["/login", "/register", "/auth"];

	// 3. Проверяем тип текущего маршрута
	const isProtected = protectedRoutes.some((route) =>
		to.path.startsWith(route)
	);
	const isGuestOnly = guestRoutes.some((route) => to.path.startsWith(route));

	// 4. Если маршрут публичный - пропускаем
	if (!isProtected && !isGuestOnly) return;

	// 5. Если есть токен, но isAuth еще false - проверяем авторизацию
	if (token && !isAuth.value) {
		try {
			await auth.checkAuth(token, config.public.serverUrl); // Дожидаемся проверки
		} catch (e) {
			console.error("Auth check failed", e);
		}
	}

	// 6. После проверки снова смотрим isAuth
	if (isProtected) {
		if (isAuth.value) {
			return; // Разрешаем доступ
		}
		// Сохраняем исходный URL и перенаправляем
		return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
	}

	// 7. Для гостевых маршрутов
	if (isGuestOnly && isAuth.value) {
		return navigateTo("/");
	}
});
