import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen bg-dnd-bg-normal">
			<Sidebar />
			<main className="flex-1 ml-[260px]">{children}</main>
		</div>
	);
}
