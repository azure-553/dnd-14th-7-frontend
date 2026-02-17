import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json([
		{
			id: "1",
			label: "서버로그의 중요성",
		},
		{
			id: "2",
			label: "프론트엔드에서 테스트 코드를 작성해야하는 이유",
		},
		{
			id: "3",
			label: "useEffect를 낭비하지 말것",
		},
	]);
}
