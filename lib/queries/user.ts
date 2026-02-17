import { queryOptions } from "@tanstack/react-query";
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

export const getUser = async () => {
	if (typeof window === "undefined") {
		return {
			nickname: "심미진",
			email: "mijin.sim@example.com",
		};
	}
	return api.get<User>("/api/mock/user");
};

export const getTags = async (): Promise<Tag[]> => {
	if (typeof window === "undefined") {
		return [
			{ tagId: 1, tagName: "서버", count: 6 },
			{ tagId: 2, tagName: "로그", count: 3 },
			{ tagId: 3, tagName: "시스템", count: 2 },
			{ tagId: 4, tagName: "코드", count: 6 },
		];
	}
	const data = await api.get<TagsResponse>("/api/mock/tags");
	return data.tags;
};

export const userQueryOptions = () =>
	queryOptions({
		queryKey: userKeys.profile(),
		queryFn: getUser,
	});

export const tagsQueryOptions = () =>
	queryOptions({
		queryKey: userKeys.tags(),
		queryFn: getTags,
	});
