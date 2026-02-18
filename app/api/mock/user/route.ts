import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isMockAuthBypass, isProduction } from "@/lib/core/env";

const _MOCK_AUTH_COOKIE = "mock-auth";

export async function GET() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	const isLoggedIn =
		isMockAuthBypass() || cookieStore.get(_MOCK_AUTH_COOKIE)?.value === "true";

	if (!isLoggedIn) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json({
		nickname: "심미진",
		email: "mijin.sim@example.com",
	});
}
