import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/core/api";

export interface TabItem {
	id: string;
	label: string;
}

export const tabKeys = {
	all: ["tabs"] as const,
	list: () => [...tabKeys.all, "list"] as const,
};

export const getTabs = () => api.get<TabItem[]>("/api/mock/tabs");

export const tabsQueryOptions = () =>
	queryOptions({
		queryKey: tabKeys.list(),
		queryFn: getTabs,
	});
