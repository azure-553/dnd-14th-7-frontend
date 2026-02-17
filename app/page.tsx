import { Suspense } from "react";
import { TabBar } from "@/components/insight/tab-bar";

export default function Page() {
	return (
		<div className="flex flex-col w-full h-full bg-white">
			<Suspense fallback={<div className="h-[40px] w-full bg-[#E0F5F6]" />}>
				<TabBar />
			</Suspense>
			<div className="flex-1 p-6">
				<div className="flex h-full items-center justify-center text-[var(--dnd-label-assistive)]">
					Select a tab to view insights
				</div>
			</div>
		</div>
	);
}
