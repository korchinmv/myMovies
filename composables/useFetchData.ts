export function useFetchData(url: string, pick: string[]) {
	const headers = {
		"X-API-KEY": "80113534-05ee-4378-9bb1-c31ab3a6e063",
		"Content-Type": "application/json",
	};

	const { data, pending, error } = useFetch(url, {
		headers,
	});

	return {
		data,
		isLoading: pending,
		error,
	};
}
