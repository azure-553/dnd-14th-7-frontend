import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";
import { addInsightPieceFromAnswer, convertedAnswerIds } from "../state";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (isProduction()) {
		return new NextResponse(null, { status: 404 });
	}

	const { id } = await params;
	const body = await request.json();

	if (!body.answerId) {
		return NextResponse.json(
			{ error: "BAD_REQUEST", message: "answerId는 필수입니다" },
			{ status: 400 },
		);
	}

	if (convertedAnswerIds.has(body.answerId)) {
		return NextResponse.json(
			{
				error: "BAD_REQUEST",
				message: "이미 인사이트 조각으로 변환된 답변입니다",
			},
			{ status: 400 },
		);
	}

	convertedAnswerIds.add(body.answerId);
	addInsightPieceFromAnswer(body.answerId);

	console.log(
		`[Mock] 인사이트 ${id}에 답변 ${body.answerId}를 인사이트 조각으로 변환`,
	);

	return NextResponse.json(null, { status: 201 });
}
