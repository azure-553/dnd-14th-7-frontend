"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const SEPARATOR = "|";
const BASE_PATH = "/dashboard";

function buildUrl(tab: string, tabs: string[]) {
	const params = new URLSearchParams();
	if (tabs.length > 0) params.set("tabs", tabs.join(SEPARATOR));
	if (tab !== "home") params.set("tab", tab);
	const query = params.toString();
	return `${BASE_PATH}${query ? `?${query}` : ""}`;
}

export function useDashboardTabs() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const activeTab = searchParams.get("tab") ?? "home";
	const openTabs = useMemo(() => {
		const raw = searchParams.get("tabs");
		return raw ? raw.split(SEPARATOR).filter(Boolean) : [];
	}, [searchParams]);

	const navigate = useCallback(
		(tab: string) => {
			router.push(buildUrl(tab, openTabs));
		},
		[router, openTabs],
	);

	const openTab = useCallback(
		(tabId: string) => {
			const newTabs = openTabs.includes(tabId)
				? openTabs
				: [...openTabs, tabId];
			router.push(buildUrl(tabId, newTabs));
		},
		[router, openTabs],
	);

	const closeTab = useCallback(
		(tabId: string) => {
			const newTabs = openTabs.filter((t) => t !== tabId);
			const newActive =
				activeTab === tabId
					? (newTabs[newTabs.length - 1] ?? "home")
					: activeTab;
			router.push(buildUrl(newActive, newTabs));
		},
		[router, openTabs, activeTab],
	);

	const replaceTab = useCallback(
		(oldTabId: string, newTabId: string) => {
			const newTabs = openTabs.map((t) => (t === oldTabId ? newTabId : t));
			if (!newTabs.includes(newTabId)) newTabs.push(newTabId);
			router.push(buildUrl(newTabId, newTabs));
		},
		[router, openTabs],
	);

	return { activeTab, openTabs, navigate, openTab, closeTab, replaceTab } as const;
}
