import { NextResponse } from "next/server";

export async function GET() {
	if (process.env.NODE_ENV === "production") {
		return NextResponse.json({ error: "Not found" }, { status: 404 });
	}
	return NextResponse.json([
		{ label: "로깅", count: 6 },
		{ label: "서버", count: 6 },
		{ label: "시스템", count: 6 },
		{ label: "코드", count: 6 },
	]);
}
