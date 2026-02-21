"use client";

import { useMutation } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { InsightDetailSection } from "@/components/insight-detail";
import { InsightInput } from "@/components/insight-input";
import { LoginModal } from "@/components/login-modal";
import { insightCreationMutationOptions } from "@/lib/queries/insight";
import { useDashboardTabs } from "./_hooks/use-dashboard-tabs";

function HomePage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-[40px] px-[240px]">
			<p className="text-dnd-label-alternative">홈 화면</p>
		</div>
	);
}

function NewInsightPage() {
	const { replaceTab } = useDashboardTabs();
	const { mutate: createInsight, isPending } = useMutation({
		...insightCreationMutationOptions(),
		onSuccess: (data) => {
			replaceTab("new", String(data.insightId));
		},
		onError: (error) => {
			const isUnauthorized =
				error instanceof Error && error.message.startsWith("401");
			if (isUnauthorized) {
				overlay.open(({ isOpen, close }) => (
					<LoginModal isOpen={isOpen} onClose={close} />
				));
				return;
			}
			console.error("Failed to create insight:", error);
		},
	});

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-[40px] px-[240px]">
			<InsightInput
				onSubmit={(memo) => createInsight({ memo })}
				isPending={isPending}
			/>
		</div>
	);
}

function DashboardContent() {
	const { activeTab } = useDashboardTabs();

	switch (activeTab) {
		case "home":
			return <HomePage />;
		case "new":
			return <NewInsightPage />;
		default: {
			const insightId = Number(activeTab);
			if (Number.isNaN(insightId)) {
				throw new Error(`유효하지 않은 탭: ${activeTab}`);
			}
			return <InsightDetailSection insightId={insightId} />;
		}
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
