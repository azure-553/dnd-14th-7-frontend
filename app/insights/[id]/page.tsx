export default async function DashboardPage({
	params,
}: Readonly<{
	params: Promise<{ id: string }>;
}>) {
	const { id } = await params;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen gap-[40px] px-[240px]">
			<h1>{id} 페이지</h1>
		</div>
	);
}
