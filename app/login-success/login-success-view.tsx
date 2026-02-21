"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const REDIRECT_DELAY_MS = 1000;

export function LoginSuccessView() {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace("/dashboard");
		}, REDIRECT_DELAY_MS);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-dnd-bg-normal">
			<div className="flex flex-col items-center gap-12">
				<div className="flex h-24 w-24 items-center justify-center">
					<Check className="h-24 w-24 text-dnd-primary" strokeWidth={2.5} />
				</div>
				<div className="flex flex-col items-center gap-4">
					<h1 className="typo-title-1 font-bold text-dnd-label-normal text-center">
						로그인 성공
					</h1>
					<p className="typo-title-3 font-medium text-dnd-label-neutral text-center">
						나만의 인사이트를 정리해보세요!
					</p>
				</div>
			</div>
		</div>
	);
}
