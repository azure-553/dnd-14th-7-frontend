"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InsightInputProps {
	onSubmit: (memo: string) => void;
	isPending?: boolean;
}

export function InsightInput({ onSubmit, isPending = false }: InsightInputProps) {
	const [value, setValue] = useState("");

	const handleSubmit = () => {
		if (!value.trim()) return;
		onSubmit(value);
	};

	return (
		<section className="flex flex-col items-start gap-[32px] w-full max-w-[960px]">
			<h1 className="typo-title-2 font-medium text-dnd-label-strong">
				지금 막 떠오른 생각을 한 줄로 적어보세요.
			</h1>
			<Textarea
				placeholder="오늘 떠오른 생각을 자유롭게 적어보세요..."
				showCharacterCount
				maxLength={200}
				resize="none"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={isPending}
				trailingContent={
					<Button
						variant="solid"
						size="dnd-large"
						disabled={value.length === 0}
						onClick={handleSubmit}
					>
						{isPending ? "생성 중..." : "인사이트 생성"}
					</Button>
				}
			/>
		</section>
	);
}
