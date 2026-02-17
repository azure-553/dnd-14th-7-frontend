import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

const MOCK_AUTH_COOKIE = "mock-auth";

export async function POST() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	cookieStore.set(MOCK_AUTH_COOKIE, "true", {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 60 * 24,
	});

	return NextResponse.json({ success: true });
}
