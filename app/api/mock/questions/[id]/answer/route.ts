import { NextResponse } from "next/server";
import { answerQuestion } from "@/app/api/mock/insights/[id]/state";
import { isProduction } from "@/lib/core/env";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (isProduction()) {
		return new NextResponse(null, { status: 404 });
	}

	const { id } = await params;
	const questionId = Number(id);

	if (questionId === 999) {
		return NextResponse.json({ message: "Not Found" }, { status: 404 });
	}

	const body = await request.json();

	if (!body.content) {
		return NextResponse.json(
			{ message: "content is required" },
			{ status: 400 },
		);
	}

	answerQuestion(questionId, body.content);

	console.log(
		`[Mock] 질문 ${questionId}에 답변 등록: ${body.content.slice(0, 30)}...`,
	);

	return NextResponse.json(null, { status: 200 });
}
