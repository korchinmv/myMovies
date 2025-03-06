export const useFetchData = <T>(url: string) => {
	const config = useRuntimeConfig();
	const headers = {
		"X-API-KEY": config.public.apiKey,
		"Content-Type": "application/json",
	};

	const { data, pending, error } = useFetch<T>(config.public.baseUrl + url, {
		headers,
		lazy: true,
	});

	return {
		data,
		pending,
		error,
	};
};
