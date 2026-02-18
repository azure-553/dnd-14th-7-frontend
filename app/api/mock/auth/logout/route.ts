import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEYS } from "@/lib/auth/cookies";
import { isProduction } from "@/lib/core/env";

export async function POST() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	cookieStore.delete(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
	cookieStore.delete(AUTH_COOKIE_KEYS.REFRESH_TOKEN);

	return NextResponse.json({ success: true });
}
