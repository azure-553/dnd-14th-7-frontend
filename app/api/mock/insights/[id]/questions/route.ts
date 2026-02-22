import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";
import { answerCards, convertedAnswerIds, questions } from "../state";

export const dynamic = "force-dynamic";

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

	return NextResponse.json(
		{
			questions,
			answerCards: answerCards?.map((card) => ({
				...card,
				isConverted: convertedAnswerIds.has(card.answerId),
			})),
		},
		{ status: 200 },
	);
}
