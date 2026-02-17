import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json({
		tags: [
			{ tagId: 1, tagName: "서버", count: 6 },
			{ tagId: 2, tagName: "로그", count: 3 },
			{ tagId: 3, tagName: "시스템", count: 2 },
			{ tagId: 4, tagName: "코드", count: 6 },
		],
	});
}
