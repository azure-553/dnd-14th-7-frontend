import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import {
	AUTH_COOKIE_KEYS,
	accessTokenCookieOptions,
	refreshTokenCookieOptions,
} from "@/lib/auth/cookies";

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const accessToken = searchParams.get("accessToken");
	const refreshToken = searchParams.get("refreshToken");

	if (!accessToken || !refreshToken) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const cookieStore = await cookies();

	cookieStore.set(
		AUTH_COOKIE_KEYS.ACCESS_TOKEN,
		accessToken,
		accessTokenCookieOptions,
	);
	cookieStore.set(
		AUTH_COOKIE_KEYS.REFRESH_TOKEN,
		refreshToken,
		refreshTokenCookieOptions,
	);

	return NextResponse.redirect(new URL("/login-success", request.url));
}
