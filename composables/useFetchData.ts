import { ref, watch, isRef } from "vue";

export function useFetchData<T>(
	url: string,
	query?: Ref<Record<string, any>> | Record<string, any> // Принимаем Ref или reactive
) {
	const config = useRuntimeConfig();
	const data = ref<T | null>(null);
	const isLoading = ref(false);
	const error = ref<any>(null);

	const headers = {
		"X-API-KEY": config.public.apiKey,
		"Content-Type": "application/json",
	};

	// Функция для очистки query от пустых значений
	const cleanQuery = (query: Record<string, any>) => {
		const cleanedQuery: Record<string, any> = {};
		for (const key in query) {
			if (
				query[key] !== "" &&
				query[key] !== undefined &&
				query[key] !== null
			) {
				cleanedQuery[key] = query[key];
			}
		}
		return cleanedQuery;
	};

	// Функция для получения query параметров
	const getQueryParams = () => {
		if (isRef(query)) {
			// Проверяем, что query.value является объектом
			if (
				query.value &&
				typeof query.value === "object" &&
				!Array.isArray(query.value)
			) {
				return cleanQuery(query.value); // Очищаем query.value
			}
			return {}; // Если query.value не объект, возвращаем пустой объект
		} else if (query && typeof query === "object" && !Array.isArray(query)) {
			return cleanQuery(query); // Очищаем query
		}
		return {}; // Если query не передан или не объект, возвращаем пустой объект
	};

	// Основная функция для выполнения запроса
	const fetchData = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			const queryParams = getQueryParams(); // Получаем очищенные параметры запроса

			const response = await $fetch<T>(config.public.baseUrl + url, {
				headers,
				query: queryParams, // Используем очищенные параметры запроса
			});
			data.value = response;
		} catch (err) {
			error.value = err;
		} finally {
			isLoading.value = false;
		}
	};

	// Отслеживаем изменения query и выполняем запрос
	if (query) {
		watch(
			() => (isRef(query) ? query.value : query), // Отслеживаем изменения query
			() => {
				fetchData();
			},
			{ deep: true } // Глубокое отслеживание изменений
		);
	}

	return {
		data,
		isLoading,
		error,
		fetchData,
	};
}
