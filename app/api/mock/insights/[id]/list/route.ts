import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";
import { insightPieces } from "../state";

export const dynamic = "force-dynamic";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (isProduction()) {
		return new NextResponse(null, { status: 404 });
	}

	await params;

	return NextResponse.json({ insightPieces }, { status: 200 });
}
