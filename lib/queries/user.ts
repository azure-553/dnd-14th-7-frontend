import { type MutationOptions, queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/core/api";

export interface User {
	nickname: string;
	email: string;
}

export interface Tag {
	tagId: number;
	tagName: string;
	count: number;
}

interface TagsResponse {
	tags: Tag[];
}

export const userKeys = {
	all: ["user"] as const,
	profile: () => [...userKeys.all, "profile"] as const,
	tags: () => [...userKeys.all, "tags"] as const,
};

export const getUser = () => api.get<User>("/api/mock/user");

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

const postLogin = () => api.post("/api/mock/auth/login", {});
const postLogout = () => api.post("/api/mock/auth/logout", {});

export const loginMutationOptions = (): MutationOptions => ({
	mutationFn: postLogin,
	onSuccess: () => window.location.reload(),
});

export const logoutMutationOptions = (): MutationOptions => ({
	mutationFn: postLogout,
	onSuccess: () => window.location.reload(),
});
