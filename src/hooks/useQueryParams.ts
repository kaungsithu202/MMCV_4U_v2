import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const useQueryParams = () => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const urlSearchParams = new URLSearchParams(
		Array.from(searchParams.entries())
	);

	/**
	 * @param params => setQuery({ [key]: value })
	 */
	const setQuery = (params: any) => {
		Object.entries(params).forEach(([key, value]) => {
			urlSearchParams.set(key, String(value));
		});

		const search = urlSearchParams.toString();
		const query = search ? `?${search}` : '';

		router.push(`${pathname}${query}`);
	};

	/**
	 * @param newParams => updateQuery({ [key]: value })
	 * Firsly, create a new copy of the URLSearchParams object.
	 * Second, iterate over the new parameters and merge them into the updated URLSearchParams object.
	 * And get the query string from the updated URLSearchParams object.
	 * Then, create the final URL string and push the new URL to the browsers
	 */
	const updateQuery = (newParams: any, replace = true) => {
		const updatedParams = new URLSearchParams(urlSearchParams);

		for (const [key, value] of Object.entries(newParams)) {
			updatedParams.set(key, String(value));
		}

		const search = updatedParams.toString();
		const query = search ? `?${search}` : '';

		if (replace) {
			router.replace(`${pathname}${query}`, { scroll: false });
		} else {
			router.push(`${pathname}${query}`, { scroll: false });
		}
	};

	const deleteQuery = (params: string) => {
		urlSearchParams.delete(params);

		const search = urlSearchParams.toString();
		const query = search ? `?${search}` : '';

		router.push(`${pathname}${query}`);
	};

	// delete all queries
	const deleteQueries = () => {
		router.push(`${pathname}`);
	};

	return {
		urlSearchParams,
		setQuery,
		updateQuery,
		deleteQuery,
		deleteQueries,
	};
};

export default useQueryParams;
