import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function POST() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	cookieStore.set("accessToken", "mock-access-token", {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 30,
	});
	cookieStore.set("refreshToken", "mock-refresh-token", {
		path: "/",
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 7,
	});

	return NextResponse.json({ success: true });
}
