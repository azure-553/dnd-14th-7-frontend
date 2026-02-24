"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { LoginModal } from "@/components/login-modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { insightCreationMutationOptions } from "@/lib/queries/insight";
import { userQueryOptions } from "@/lib/queries/user";

function openLoginModal() {
	return overlay.open(({ isOpen, close }) => (
		<LoginModal isOpen={isOpen} onClose={close} />
	));
}

interface InsightInputProps {
	onSuccess?: (insightId: number) => void;
	titleClassName?: string;
}

export function InsightInput({ onSuccess, titleClassName }: InsightInputProps) {
	const { data: user, isError } = useQuery(userQueryOptions());
	const [value, setValue] = useState("");
	const { mutate: createInsight, isPending } = useMutation(
		insightCreationMutationOptions(),
	);

	const handleSubmit = () => {
		if (!value.trim()) return;

		createInsight(
			{ memo: value },
			{
				onSuccess: (data) => {
					setValue("");
					onSuccess?.(data.insightId);
				},
				onError: (error) => {
					console.error("Failed to create insight:", error);
				},
			},
		);
	};

	const handleButtonClick = () => {
		if (isError || !user) {
			openLoginModal();
			return;
		}

		handleSubmit();
	};

	return (
		<section className="flex flex-col items-start gap-[32px] w-full max-w-[960px]">
			<h1
				className={`typo-title-2 font-medium text-dnd-label-strong ${
					titleClassName || ""
				}`}
			>
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
						onClick={handleButtonClick}
					>
						{isPending ? "생성 중..." : "인사이트 생성"}
					</Button>
				}
			/>
		</section>
	);
}
