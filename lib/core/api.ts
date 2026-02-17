type RequestOptions = Omit<RequestInit, "method" | "body">;

function getBaseUrl() {
	if (typeof window !== "undefined") return "";
	return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
}

async function request(path: string, init?: RequestInit): Promise<Response> {
	const response = await fetch(`${getBaseUrl()}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...init?.headers,
		},
	});

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`);
	}

	return response;
}

export const api = {
	get: <T>(path: string, options?: RequestOptions) =>
		request(path, { ...options, method: "GET" }).then((r) => r.json() as T),

	post: <T>(path: string, body: unknown, options?: RequestOptions) =>
		request(path, {
			...options,
			method: "POST",
			body: JSON.stringify(body),
		}).then((r) => r.json() as T),

	put: <T>(path: string, body: unknown, options?: RequestOptions) =>
		request(path, {
			...options,
			method: "PUT",
			body: JSON.stringify(body),
		}).then((r) => r.json() as T),

	patch: <T>(path: string, body: unknown, options?: RequestOptions) =>
		request(path, {
			...options,
			method: "PATCH",
			body: JSON.stringify(body),
		}).then((r) => r.json() as T),

	delete: (path: string, options?: RequestOptions) =>
		request(path, { ...options, method: "DELETE" }).then(() => {}),
};
