import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		nickname: "심미진",
		email: "mijin.sim@example.com",
	});
}
