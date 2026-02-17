"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { tabsQueryOptions } from "@/lib/queries/tabs";
import { cn } from "@/lib/utils";

export function TabBar() {
	const { data: tabs } = useSuspenseQuery(tabsQueryOptions());
	const [activeTabId, setActiveTabId] = useState<string | null>(
		() => tabs[0]?.id ?? null,
	);

	return (
		<div className="flex w-full items-center justify-between bg-[#E0F5F6] px-6 ">
			<div className="flex flex-1 items-center overflow-x-auto">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						className={cn(
							"flex h-[40px] gap-[8px] items-center justify-center p-4 cursor-pointer transition-colors",
							activeTabId === tab.id
								? "bg-white text-[var(--dnd-label-neutral)] font-semibold shadow-sm"
								: "text-[var(--dnd-label-alternative)] hover:text-[var(--dnd-label-neutral)] hover:bg-[#d0ecef]",
						)}
						onClick={() => setActiveTabId(tab.id)}
					>
						<span className="text-[14px] leading-[1.5] truncate max-w-[150px]">
							{tab.label}
						</span>
						<X className="size-5 text-[var(--dnd-label-neutral)] cursor-pointer" />
					</button>
				))}
			</div>
			<div className="flex h-[40px] items-center justify-center pl-4 ml-4">
				<Search className="size-5 text-[var(--dnd-label-neutral)] cursor-pointer hover:text-[var(--dnd-primary)] transition-colors" />
			</div>
		</div>
	);
}
