"use client";

import { useQuery } from "@tanstack/react-query";
import { Home, Search, X } from "lucide-react";
import { useTabs } from "@/hooks/use-tabs";
import { insightDetailQueryOptions } from "@/lib/queries/insight";
import { serializeTab } from "@/lib/tabs/tab-utils";
import type { Tab } from "@/lib/tabs/tab-utils";

function InsightTabLabel({ insightId }: { insightId: number }) {
	const { data, isLoading } = useQuery(insightDetailQueryOptions(insightId));
	return <>{isLoading ? "불러오는 중..." : data?.title || "인사이트"}</>;
}

export function DashboardTabBar() {
	const { state, dispatch } = useTabs();
	const currentTabKey = serializeTab(state.currentTab);

	return (
		<div className="fixed left-[260px] top-0 right-0 z-10 flex h-[56px] items-center border-b border-[#e1e2e4] bg-dnd-bg-mint">
			<button
				type="button"
				onClick={() => dispatch({ type: 'activate', tab: { type: 'home' } })}
				className={`flex h-full shrink-0 items-center justify-center border-r border-[#e1e2e4] px-[16px] transition-colors ${
					currentTabKey === "home" ? "bg-white" : "bg-dnd-bg-mint hover:bg-white/60"
				}`}
			>
				<Home className="size-[20px] text-dnd-primary" />
			</button>

			<div role="tablist" className="flex flex-1 items-stretch overflow-x-auto">
				{state.openTabs.map((tab: Tab) => {
					if (tab.type === 'home') return null; // Home is rendered outside
					const tabKey = serializeTab(tab);
					return (
						<TabItem
							key={tabKey}
							tab={tab}
							isActive={currentTabKey === tabKey}
							onNavigate={(t) => dispatch({ type: 'activate', tab: t })}
							onClose={(t) => dispatch({ type: 'remove', tab: t })}
						/>
					);
				})}
			</div>

			<button
				type="button"
				className="flex h-full shrink-0 items-center justify-center px-[16px] text-dnd-label-neutral hover:text-dnd-label-normal"
			>
				<Search className="size-[20px]" />
			</button>
		</div>
	);
}

interface TabItemProps {
	tab: Tab;
	isActive: boolean;
	onNavigate: (tab: Tab) => void;
	onClose: (tab: Tab) => void;
}

function TabItem({ tab, isActive, onNavigate, onClose }: TabItemProps) {
	return (
		<div
			role="tab"
			tabIndex={0}
			aria-selected={isActive}
			className={`flex h-[56px] w-[224px] shrink-0 cursor-pointer items-center gap-[8px] border-r border-[#e1e2e4] px-[16px] transition-colors ${
				isActive ? "bg-white" : "bg-dnd-bg-mint hover:bg-white/60"
			}`}
			onClick={() => onNavigate(tab)}
			onKeyDown={(e) => e.key === "Enter" && onNavigate(tab)}
		>
			<span className="min-w-0 flex-1 truncate text-[17px] font-medium leading-[1.41] text-dnd-label-neutral">
				{tab.type === "new" ? "새 페이지" : tab.type === "insight" ? <InsightTabLabel insightId={Number(tab.id)} /> : tab.type === "tag" ? `태그 ${tab.name}` : tab.type === "trash" ? "휴지통" : ''}
			</span>
			<button
				type="button"
				onClick={(e) => {
					e.stopPropagation();
					onClose(tab);
				}}
				className="shrink-0 rounded p-[2px] text-dnd-label-alternative hover:bg-black/10"
			>
				<X className="size-[14px]" />
			</button>
		</div>
	);
}
