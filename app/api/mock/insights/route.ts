import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
