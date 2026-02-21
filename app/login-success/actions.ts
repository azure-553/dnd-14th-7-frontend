"use server";

import { cookies } from "next/headers";
import {
	AUTH_COOKIE_KEYS,
	accessTokenCookieOptions,
	refreshTokenCookieOptions,
} from "@/lib/auth/cookies";

export async function saveAuthTokens(
	accessToken: string,
	refreshToken: string,
) {
	const cookieStore = await cookies();
	cookieStore.set(AUTH_COOKIE_KEYS.ACCESS_TOKEN, accessToken, accessTokenCookieOptions);
	cookieStore.set(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshToken, refreshTokenCookieOptions);
}
