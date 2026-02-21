import { InsightDetailSection } from "@/components/insight-detail";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function InsightDetailPage({ params }: PageProps) {
	const { id } = await params;
	const insightId = Number(id);

	return (
		<main className="min-h-screen bg-[var(--dnd-bg-normal)]">
			<InsightDetailSection insightId={insightId} />
		</main>
	);
}
