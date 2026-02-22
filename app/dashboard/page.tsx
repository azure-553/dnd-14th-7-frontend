"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InsightDetailSection } from "@/components/insight-detail";
import { InsightInput } from "@/components/insight-input";
import { useDashboardTabs } from "@/hooks/use-dashboard-tabs";

import { deserializeTab } from "@/lib/tabs/tab-utils";

function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-[40px] px-[240px]">
			<p className="text-dnd-label-alternative">홈 화면</p>
		</div>
	);
}

function NewInsightPage() {
	const { dispatch } = useDashboardTabs();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-[40px] px-[240px]">
			<InsightInput onSuccess={(id) => dispatch({ type: 'replace', targetTab: 'new', newTab: `insight:${id}` })} />
		</div>
	);
}

function DashboardContent() {
	const { state } = useDashboardTabs();
	const currentTabObj = deserializeTab(state.currentTab);

	switch (currentTabObj.type) {
		case "home":
			return <HomePage />;
		case "new":
			return <NewInsightPage />;
		case "insight":
			return <InsightDetailSection insightId={Number(currentTabObj.id)} />;
		case "trash":
			return <div className="p-4">휴지통 화면 (준비중)</div>;
		case "tag":
			return <div className="p-4">태그 {currentTabObj.name} 화면 (준비중)</div>;
		default:
			throw new Error(`유효하지 않은 탭 타입입니다.`);
	}
}

export default function DashboardPage() {
	return (
		<ErrorBoundary fallback={<div>잘못된 페이지입니다.</div>}>
			<Suspense>
				<DashboardContent />
			</Suspense>
		</ErrorBoundary>
	);
}
