import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

const _MOCK_AUTH_COOKIE = "mock-auth";

export async function GET() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const _cookieStore = await cookies();
	// const isLoggedIn = cookieStore.get(MOCK_AUTH_COOKIE)?.value === "true";
	const isLoggedIn = true;

	if (!isLoggedIn) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json({
		tags: [
			{ tagId: 1, tagName: "서버", insightCount: 6 },
			{ tagId: 2, tagName: "로그", insightCount: 3 },
			{ tagId: 3, tagName: "시스템", insightCount: 2 },
			{ tagId: 4, tagName: "코드", insightCount: 6 },
		],
	});
}
