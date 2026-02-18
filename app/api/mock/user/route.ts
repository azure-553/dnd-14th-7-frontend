import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function GET() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	const isLoggedIn = !!cookieStore.get("accessToken")?.value;

	if (!isLoggedIn) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json({
		nickname: "심미진",
		email: "mijin.sim@example.com",
	});
}
