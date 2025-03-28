import type { FavoritesResponse } from "~/types/FavoritesResponse";
import type { TMovie } from "~/types/Movie";

type ListType = "favorites" | "watch-later";

export const useListManager = (listType: ListType = "favorites") => {
	const config = useRuntimeConfig();
	const apiUrl = `${config.public.serverUrl}/${listType}`;
	const tokenCookie = useCookie("token");
	const isLoading = ref(false);

	const fetchList = async (): Promise<FavoritesResponse> => {
		try {
			const response = await $fetch<FavoritesResponse>(apiUrl, {
				headers: {
					Authorization: `Bearer ${tokenCookie.value}`,
				},
			});
			return response;
		} catch (error) {
			console.error(`Error fetching ${listType}:`, error);
			throw error;
		}
	};

	const toggleItem = async (movie: TMovie, currentItemId: number | null) => {
		isLoading.value = true;
		try {
			if (currentItemId) {
				// Удаляем из списка
				await $fetch(`${apiUrl}/${currentItemId}`, {
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${tokenCookie.value}`,
					},
				});
				return { success: true, itemId: null };
			} else {
				// Добавляем в список
				const response = await $fetch<{ id: number }>(apiUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${tokenCookie.value}`,
					},
					body: JSON.stringify({
						movieId: movie.kinopoiskId,
						movieData: movie,
					}),
				});
				return { success: true, itemId: response.id };
			}
		} catch (error) {
			console.error(`Error toggling ${listType} item:`, error);
			return {
				success: false,
				error: `Failed to toggle ${listType} item`,
				itemId: currentItemId,
			};
		} finally {
			isLoading.value = false;
		}
	};

	return {
		fetchList,
		toggleItem,
		isLoading,
	};
};

// Создаем конкретные экземпляры для каждого типа списка
export const useFavorites = () => useListManager("favorites");
export const useWatchLater = () => useListManager("watch-later");
