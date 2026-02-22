import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (isProduction()) {
		return new NextResponse(null, { status: 404 });
	}

	const { id } = await params;

	if (id === "999") {
		return NextResponse.json({ message: "Not Found" }, { status: 404 });
	}

	const body = await request.json();

	if (!body.content) {
		return NextResponse.json(
			{ message: "content is required" },
			{ status: 400 },
		);
	}

	return NextResponse.json({}, { status: 200 });
}
