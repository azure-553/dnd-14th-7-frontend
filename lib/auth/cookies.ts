import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const AUTH_COOKIE_KEYS = {
	ACCESS_TOKEN: "accessToken",
	REFRESH_TOKEN: "refreshToken",
} as const;

const ACCESS_TOKEN_MAX_AGE = 30 * 60; // 30분
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7일

const commonCookieOptions: Partial<ResponseCookie> = {
	path: "/",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax",
};

export const accessTokenCookieOptions: Partial<ResponseCookie> = {
	...commonCookieOptions,
	maxAge: ACCESS_TOKEN_MAX_AGE,
};

export const refreshTokenCookieOptions: Partial<ResponseCookie> = {
	...commonCookieOptions,
	maxAge: REFRESH_TOKEN_MAX_AGE,
};
