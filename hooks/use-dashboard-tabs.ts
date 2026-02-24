import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
	reduceTab,
	type TabAction,
	type TabState,
} from "@/lib/tabs/tab-reducer";

export function useDashboardTabs() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const state: TabState = useMemo(() => {
		const rawOpenTab = searchParams.get("openTab");
		const rawCurrentTab = searchParams.get("currentTab");

		const currentTab =
			rawCurrentTab === "home" || !rawCurrentTab ? null : rawCurrentTab;
		const openTabs = rawOpenTab
			? rawOpenTab.split("|").filter((t) => t !== "home" && t !== "")
			: [];

		return { openTabs, currentTab };
	}, [searchParams]);

	const dispatch = useCallback(
		(...actions: TabAction[]) => {
			const nextState = actions.reduce(reduceTab, state);

			const nextOpenTabStr = nextState.openTabs.join("|");
			const nextCurrentTabStr = nextState.currentTab || "home";

			const params = new URLSearchParams(searchParams.toString());
			if (nextOpenTabStr) {
				params.set("openTab", nextOpenTabStr);
			} else {
				params.delete("openTab");
			}
			params.set("currentTab", nextCurrentTabStr);

			router.push(`${pathname}?${params.toString()}`, { scroll: false });
		},
		[state, router, pathname, searchParams],
	);

	return {
		state,
		dispatch,
	};
}
