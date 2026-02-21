"use client";

import { Home, Search, X } from "lucide-react";
import { useDashboardTabs } from "../_hooks/use-dashboard-tabs";

export function DashboardTabBar() {
	const { activeTab, openTabs, navigate, closeTab } = useDashboardTabs();

	return (
		<div className="fixed left-[260px] top-0 right-0 z-10 flex h-[56px] items-center border-b border-[#e1e2e4] bg-dnd-bg-mint">
			<button
				type="button"
				onClick={() => navigate("home")}
				className={`flex h-full shrink-0 items-center justify-center border-r border-[#e1e2e4] px-[16px] transition-colors ${
					activeTab === "home" ? "bg-white" : "bg-dnd-bg-mint hover:bg-white/60"
				}`}
			>
				<Home className="size-[20px] text-dnd-primary" />
			</button>

			<div className="flex flex-1 items-stretch overflow-x-auto">
				{openTabs.map((tabId) => (
					<div
						key={tabId}
						role="tab"
						tabIndex={0}
						aria-selected={activeTab === tabId}
						className={`flex h-[56px] w-[224px] shrink-0 cursor-pointer items-center gap-[8px] border-r border-[#e1e2e4] px-[16px] transition-colors ${
							activeTab === tabId
								? "bg-white"
								: "bg-dnd-bg-mint hover:bg-white/60"
						}`}
						onClick={() => navigate(tabId)}
						onKeyDown={(e) => e.key === "Enter" && navigate(tabId)}
					>
						<span className="min-w-0 flex-1 truncate text-[17px] font-medium leading-[1.41] text-dnd-label-neutral">
							{tabId === "new" ? "새 페이지" : `인사이트 ${tabId}`}
						</span>
						<button
							type="button"
							onClick={(e) => {
								e.stopPropagation();
								closeTab(tabId);
							}}
							className="shrink-0 rounded p-[2px] text-dnd-label-alternative hover:bg-black/10"
						>
							<X className="size-[14px]" />
						</button>
					</div>
				))}
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

