export function useFetchData<T>(url: string, query?: Record<string, any>) {
	const config = useRuntimeConfig();
	const data = ref<T | null>(null);
	const isLoading = ref(false);
	const error = ref<any>(null);

	const headers = {
		"X-API-KEY": config.public.apiKey,
		"Content-Type": "application/json",
	};

	async function fetchData() {
		isLoading.value = true;
		error.value = null;

		try {
			const response = await $fetch<T>(config.public.baseUrl + url, {
				headers,
				query: { ...query }, // Копируем query, чтобы избежать мутаций
			});
			data.value = response;
		} catch (err) {
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	}

	// Отслеживаем изменения query и выполняем запрос
	watch(
		() => ({ ...query }), // Создаем новый объект для отслеживания изменений
		() => {
			fetchData();
		},
		{ deep: true } // Глубокое отслеживание изменений в query
	);

	return {
		data,
		isLoading,
		error,
		fetchData,
	};
}
