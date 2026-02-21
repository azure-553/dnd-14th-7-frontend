import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function POST(request: Request) {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const body = await request.json();
	const { memo } = body;

	if (!memo) {
		return NextResponse.json(
			{
				error: "BAD_REQUEST",
				message: "memo는 필수 입력값입니다",
			},
			{ status: 400 },
		);
	}

	return NextResponse.json(
		{
			insightId: 1,
		},
		{ status: 201 },
	);
}
