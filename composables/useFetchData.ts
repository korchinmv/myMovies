export function useFetchData<T>(
	url: string,
	options?: {
		query?: Ref<Record<string, any>> | Record<string, any>;
		headers?: Ref<Record<string, string>> | Record<string, string>;
	}
) {
	const config = useRuntimeConfig();
	const data = ref<T | null>(null);
	const isLoading = ref(false);
	const error = ref<any>(null);

	// Дефолтные headers
	const defaultHeaders = {
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
		if (!options?.query) return {};

		const query = options.query;
		if (isRef(query)) {
			return query.value && typeof query.value === "object"
				? cleanQuery(query.value)
				: {};
		}
		return typeof query === "object" ? cleanQuery(query) : {};
	};

	// Функция для получения headers
	const getHeaders = () => {
		const customHeaders = options?.headers
			? isRef(options.headers)
				? options.headers.value
				: options.headers
			: {};

		return { ...defaultHeaders, ...customHeaders };
	};

	// Основная функция для выполнения запроса
	const fetchData = async (customOptions?: {
		headers?: Record<string, string>;
		query?: Record<string, any>;
	}) => {
		isLoading.value = true;
		error.value = null;

		try {
			const finalHeaders = customOptions?.headers
				? { ...getHeaders(), ...customOptions.headers }
				: getHeaders();

			const finalQuery = customOptions?.query
				? { ...getQueryParams(), ...customOptions.query }
				: getQueryParams();

			const response = await $fetch<T>(url, {
				headers: finalHeaders,
				query: finalQuery,
			});

			data.value = response;
			return response;
		} catch (err) {
			error.value = err;
			throw err;
		} finally {
			isLoading.value = false;
		}
	};

	// Отслеживаем изменения query и выполняем запрос
	if (options?.query) {
		watch(
			() => (isRef(options.query) ? options.query.value : options.query), // Отслеживаем изменения query
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
