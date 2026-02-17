import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function GET() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}
	return NextResponse.json({
		tags: [
			{ tagId: 1, tagName: "서버", count: 6 },
			{ tagId: 2, tagName: "로그", count: 3 },
			{ tagId: 3, tagName: "시스템", count: 2 },
			{ tagId: 4, tagName: "코드", count: 6 },
		],
	});
}
