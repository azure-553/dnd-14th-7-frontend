import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/core/api";

export type Position = "DEV" | "DESIGN" | "PROMOTER" | "OTHER";

export interface User {
	nickname: string;
	email: string;
	position: Position | "NONE";
}

export interface Tag {
	tagId: number;
	tagName: string;
	insightCount: number;
}

interface TagsResponse {
	tags: Tag[];
}

export const userKeys = {
	all: ["user"] as const,
	profile: () => [...userKeys.all, "profile"] as const,
	tags: () => [...userKeys.all, "tags"] as const,
};

export const getUser = async () => {
	if (typeof window === "undefined") {
		return {
			nickname: "심미진",
			email: "mijin.sim@example.com",
			position: "NONE",
		};
	}
	return api.get<User>("/api/mock/user");
};

export const getTags = async (): Promise<Tag[]> => {
	const data = await api.get<TagsResponse>("/api/mock/tags");
	return data.tags;
};

export const userQueryOptions = () =>
	queryOptions({
		queryKey: userKeys.profile(),
		queryFn: getUser,
		retry: false,
	});

export const tagsQueryOptions = () =>
	queryOptions({
		queryKey: userKeys.tags(),
		queryFn: getTags,
		retry: false,
	});

const postUserPosition = (position: Position) =>
	api.post("/api/v1/users/position", { position });

export const updatePositionMutationOptions = () =>
	mutationOptions({ mutationFn: postUserPosition });

const postLogout = () => api.post("/api/mock/auth/logout", {});

export function redirectToGoogleLogin() {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	if (!backendUrl) {
		throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
	}
	const url = new URL("/oauth2/authorization/google", backendUrl);
	url.searchParams.set("redirectUri", window.location.origin);
	window.location.href = url.href;
}

export const logoutMutationOptions = () =>
	mutationOptions({
		mutationFn: postLogout,
		onSuccess: () => window.location.reload(),
	});
