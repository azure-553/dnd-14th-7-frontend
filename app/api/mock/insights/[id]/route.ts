import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const { id } = await params;

	if (id === "999") {
		return NextResponse.json(
			{
				error: "NOT_FOUND",
				message: "해당 인사이트를 찾을 수 없습니다",
			},
			{ status: 404 },
		);
	}

	return NextResponse.json(
		{
			insightId: Number(id),
			initialThought: "서버 로그의 중요성을 깨달음...",
			title: "서버 로그 관리",
			tags: [
				{ tagId: 1, tagName: "서버" },
				{ tagId: 2, tagName: "로그" },
			],
			createdDate: "2024-02-13T10:30:00Z",
			updatedDate: "2024-02-13T10:30:00Z",
		},
		{ status: 200 },
	);
}
