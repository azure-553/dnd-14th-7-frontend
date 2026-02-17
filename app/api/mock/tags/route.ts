import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

const MOCK_AUTH_COOKIE = "mock-auth";

export async function GET() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	const isLoggedIn = cookieStore.get(MOCK_AUTH_COOKIE)?.value === "true";

	if (!isLoggedIn) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
