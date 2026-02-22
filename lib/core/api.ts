import { HttpError } from "./error";

type RequestOptions = Omit<RequestInit, "method" | "body">;

function getBaseUrl() {
	if (typeof window !== "undefined") return "";
	return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";
}

async function getServerCookies(): Promise<string> {
	const { cookies } = await import("next/headers");
	const cookieStore = await cookies();
	return cookieStore.toString();
}

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
	if (refreshPromise) return refreshPromise;

	refreshPromise = fetch("/api/auth/refresh", { method: "POST" })
		.then((res) => res.ok)
		.finally(() => {
			refreshPromise = null;
		});

	return refreshPromise;
}

async function request(path: string, init?: RequestInit): Promise<Response> {
	const isServer = typeof window === "undefined";
	const cookieHeader = isServer ? await getServerCookies() : undefined;

	const response = await fetch(`${getBaseUrl()}${path}`, {
		...init,
		headers: {
			"Content-Type": "application/json",
			...(cookieHeader ? { Cookie: cookieHeader } : {}),
			...init?.headers,
		},
	});

	if (response.status === 401 && !isServer) {
		const refreshed = await refreshAccessToken();
		if (refreshed) {
			const retryResponse = await fetch(`${getBaseUrl()}${path}`, {
				...init,
				headers: {
					"Content-Type": "application/json",
					...init?.headers,
				},
			});

			if (!retryResponse.ok) {
				throw new HttpError(retryResponse.status, retryResponse.statusText);
			}

			return retryResponse;
		}
	}

	if (!response.ok) {
		throw new HttpError(response.status, response.statusText);
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
