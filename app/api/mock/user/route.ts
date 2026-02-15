import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		id: "mock-google-id-123",
		name: "심미진",
		email: "mijin.sim@example.com",
		picture: "", // Placeholder or actual URL if available
		provider: "google",
	});
}
