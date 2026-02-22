"use client";

import { useQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useTabs } from "@/hooks/use-tabs";
import { insightDetailQueryOptions } from "@/lib/queries/insight";
import { Tab, serializeTab } from "@/lib/tabs/tab-utils";
import { cn } from "@/lib/utils";

function InsightTabLabel({ insightId }: { insightId: number }) {
	const { data, isLoading } = useQuery(insightDetailQueryOptions(insightId));
	return <span>{isLoading ? "불러오는 중..." : data?.title || "인사이트"}</span>;
}

function TabLabel({ tab }: { tab: Tab }) {
	if (tab.type === "home") return <span>전체 인사이트</span>;
	if (tab.type === "new") return <span>새 인사이트 작성</span>;
	if (tab.type === "tag") return <span>태그</span>;
	if (tab.type === "insight") return <InsightTabLabel insightId={Number(tab.id)} />;
	return null;
}

export function TabBar() {
	const { state, dispatch } = useTabs();
	const { openTabs, currentTab } = state;

	return (
		<div className="flex w-full items-center justify-between bg-[#E0F5F6] px-6 ">
			<div className="flex flex-1 items-center overflow-x-auto">
				{openTabs.map((tab) => {
					const tabKey = serializeTab(tab);
					const isActive = tabKey === serializeTab(currentTab);

					return (
						<button
							key={tabKey}
							type="button"
							className={cn(
								"flex h-[40px] gap-[8px] items-center justify-center p-4 cursor-pointer transition-colors",
								isActive
									? "bg-white text-[var(--dnd-label-neutral)] font-semibold shadow-sm"
									: "text-[var(--dnd-label-alternative)] hover:text-[var(--dnd-label-neutral)] hover:bg-[#d0ecef]",
							)}
							onClick={() => dispatch({ type: "activate", tab })}
						>
							<div className="text-[14px] leading-[1.5] truncate max-w-[150px]">
								<TabLabel tab={tab} />
							</div>
							<X
								className="size-5 text-[var(--dnd-label-neutral)] cursor-pointer"
								onClick={(e) => {
									e.stopPropagation();
									dispatch({ type: "remove", tab });
								}}
							/>
						</button>
					);
				})}
			</div>
			<div className="flex h-[40px] items-center justify-center pl-4 ml-4">
				<Search className="size-5 text-[var(--dnd-label-neutral)] cursor-pointer hover:text-[var(--dnd-primary)] transition-colors" />
			</div>
		</div>
	);
}
