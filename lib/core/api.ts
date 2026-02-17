type RequestOptions = Omit<RequestInit, "method" | "body">;

async function request<T>(path: string, init?: RequestInit): Promise<T> {
	const response = await fetch(path, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`);
	}

	return response.json();
}

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "GET" }),

	post: <T>(path: string, body: unknown, options?: RequestOptions) =>
		request<T>(path, {
			...options,
			method: "POST",
			body: JSON.stringify(body),
		}),

	put: <T>(path: string, body: unknown, options?: RequestOptions) =>
		request<T>(path, {
			...options,
			method: "PUT",
			body: JSON.stringify(body),
		}),

	patch: <T>(path: string, body: unknown, options?: RequestOptions) =>
		request<T>(path, {
			...options,
			method: "PATCH",
			body: JSON.stringify(body),
		}),

	delete: <T>(path: string, options?: RequestOptions) =>
		request<T>(path, { ...options, method: "DELETE" }),
};
