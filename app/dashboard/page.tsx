"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InsightDetailSection } from "@/components/insight-detail";
import { InsightInput } from "@/components/insight-input";
import { useTabs } from "@/hooks/use-tabs";

function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-[40px] px-[240px]">
			<p className="text-dnd-label-alternative">홈 화면</p>
		</div>
	);
}

function NewInsightPage() {
	const { dispatch } = useTabs();

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-[40px] px-[240px]">
			<InsightInput onSuccess={(id) => dispatch({ type: 'replace', targetTab: { type: 'new' }, newTab: { type: 'insight', id: String(id) } })} />
		</div>
	);
}

function DashboardContent() {
	const { state } = useTabs();

	switch (state.currentTab.type) {
		case "home":
			return <HomePage />;
		case "new":
			return <NewInsightPage />;
		case "insight":
			return <InsightDetailSection insightId={Number(state.currentTab.id)} />;
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
