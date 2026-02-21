"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DashboardTabBar } from "./_components/dashboard-tab-bar";
import { Sidebar } from "./_components/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-dnd-bg-normal">
			<ErrorBoundary fallback={<div />}>
				<Suspense>
					<Sidebar />
				</Suspense>
			</ErrorBoundary>
			<div className="ml-[260px] flex flex-1 flex-col">
				<ErrorBoundary fallback={<div />}>
					<Suspense>
						<DashboardTabBar />
					</Suspense>
				</ErrorBoundary>
				<main className="pt-[56px]">{children}</main>
			</div>
		</div>
	);
}
