import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function POST() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}

	const cookieStore = await cookies();
	cookieStore.delete("accessToken");
	cookieStore.delete("refreshToken");

	return NextResponse.json({ success: true });
}
