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

	if (id === "999") {
		return NextResponse.json({ message: "Not Found" }, { status: 404 });
	}

	const questions = [
		{
			questionId: 12,
			content: "서버 로그를 분석할 때 가장 중요하게 보는 지표는 무엇인가요?",
			status: "WAITING",
			createdDate: "2024-02-13T10:35:00Z",
		},
		{
			questionId: 13,
			content: "로그 관리 시스템을 도입한 계기가 있나요?",
			status: "WAITING",
			createdDate: "2024-02-13T10:35:00Z",
		},
	];

	const answerCards = [
		{
			answerId: 1,
			questionId: 11,
			questionContent: "로그가 없어서 겪었던 실제 문제는?",
			answerContent:
				"서버에서 특정 요청이 간헐적으로 실패했는데, 관련 로그가 남아 있지 않아 어떤 조건에서 발생하는지 확인할 수 없었다.\n결국 동일한 상황을 로컬에서 재현하려고 여러 번 테스트했지만, 재현되지 않아 원인 파악에 하루 이상이 소요되었다.",
			createdDate: "2026-01-01T10:00:00Z",
			isSaved: false,
		},
		{
			answerId: 2,
			questionId: 12,
			questionContent: "로그가 없어서 겪었던 실제 문제는?",
			answerContent:
				"서버에서 특정 요청이 간헐적으로 실패했는데, 관련 로그가 남아 있지 않아 어떤 조건에서 발생하는지 확인할 수 없었다.\n결국 동일한 상황을 로컬에서 재현하려고 여러 번 테스트했지만, 재현되지 않아 원인 파악에 하루 이상이 소요되었다.",
			createdDate: "2026-01-01T12:00:00Z",
			isSaved: true,
		},
	];

	return NextResponse.json(
		{
			questions,
			answerCards,
		},
		{ status: 200 },
	);
}
