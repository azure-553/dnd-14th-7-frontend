import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const accessToken = searchParams.get("accessToken");
	const refreshToken = searchParams.get("refreshToken");

	if (!accessToken || !refreshToken) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const cookieStore = await cookies();

	cookieStore.set("accessToken", accessToken, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 30,
	});

	cookieStore.set("refreshToken", refreshToken, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		maxAge: 60 * 60 * 24 * 7,
	});

	return NextResponse.redirect(new URL("/login-success", request.url));
}
