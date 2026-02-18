import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (isProduction()) {
		return new NextResponse(null, { status: 404 });
	}

	const { id } = await params;

	const insightPieces = [
		{
			insightPieceId: 122,
			content: "첫 생각으로 만들어진 인사이트",
			createdType: "INIT",
			createdDate: "2024-02-13T10:30:00Z",
		},
		{
			insightPieceId: 123,
			content: "직접 입력한 인사이트",
			createdType: "SELF",
			createdDate: "2024-02-13T12:00:00Z",
		},
		{
			insightPieceId: 124,
			content: "답변으로부터 추가한 인사이트",
			createdType: "ANSWER",
			createdDate: "2024-02-14T09:15:00Z",
		},
	];

	return NextResponse.json(
		{
			insightPieces,
		},
		{ status: 200 },
	);
}
