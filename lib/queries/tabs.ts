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

export const getTabs = async (): Promise<TabItem[]> => {
	if (typeof window === "undefined") {
		return [
			{
				id: "1",
				label: "서버로그의 중요성",
			},
			{
				id: "2",
				label: "프론트엔드에서 테스트 코드를 작성해야하는 이유",
			},
			{
				id: "3",
				label: "useEffect를 낭비하지 말것",
			},
		];
	}
	return api.get<TabItem[]>("/api/mock/tabs");
};

export const tabsQueryOptions = () =>
	queryOptions({
		queryKey: tabKeys.list(),
		queryFn: getTabs,
	});
