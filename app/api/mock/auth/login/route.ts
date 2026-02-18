import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
	AUTH_COOKIE_KEYS,
	accessTokenCookieOptions,
	refreshTokenCookieOptions,
} from "@/lib/auth/cookies";
import { isProduction } from "@/lib/core/env";

export async function POST() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	cookieStore.set(
		AUTH_COOKIE_KEYS.ACCESS_TOKEN,
		"mock-access-token",
		accessTokenCookieOptions,
	);
	cookieStore.set(
		AUTH_COOKIE_KEYS.REFRESH_TOKEN,
		"mock-refresh-token",
		refreshTokenCookieOptions,
	);

	return NextResponse.json({ success: true });
}
