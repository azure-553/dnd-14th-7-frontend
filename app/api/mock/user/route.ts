import { NextResponse } from "next/server";
import { isProduction } from "@/lib/core/env";

export async function GET() {
	if (isProduction()) {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}
	return NextResponse.json({
		nickname: "심미진",
		email: "mijin.sim@example.com",
	});
}
