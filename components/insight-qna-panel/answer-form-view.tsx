"use client";

import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { QuestionIcon } from "@/components/ui/icons/QuestionIcon";
import { Textarea } from "@/components/ui/textarea";
import {
	answerQuestionMutationOptions,
	type InsightQuestion,
	insightQuestionsQueryOptions,
} from "@/lib/queries/insight";
import { QuestionItem } from "./question-section";

interface AnswerFormViewProps {
	selectedQuestionId: number;
	onCancel: () => void;
	insightId: number;
}

export function AnswerFormView({
	selectedQuestionId,
	onCancel,
	insightId,
}: AnswerFormViewProps) {
	const { data } = useSuspenseQuery(insightQuestionsQueryOptions(insightId));

	return (
		<div className="flex flex-col gap-2 pb-8 h-max">
			{data.questions.map((question) =>
				selectedQuestionId === question.questionId ? (
					<AnswerForm
						key={question.questionId}
						question={question}
						insightId={insightId}
						onCancel={onCancel}
					/>
				) : (
					<QuestionItem
						key={question.questionId}
						question={question}
						disabled
					/>
				),
			)}
		</div>
	);
}

interface AnswerFormProps {
	question: InsightQuestion;
	insightId: number;
	onCancel: () => void;
}

function AnswerForm({ question, insightId, onCancel }: AnswerFormProps) {
	const [answerText, setAnswerText] = useState("");
	const queryClient = useQueryClient();

	const { mutate: submitAnswer, isPending } = useMutation({
		...answerQuestionMutationOptions(insightId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["insight-questions", insightId],
			});
			onCancel();
		},
	});

	return (
		<div className="bg-white rounded-[20px] p-5 flex flex-col gap-4 shadow-sm">
			<div className="flex gap-3 items-center">
				<div className="w-[34px] h-[34px] bg-[var(--dnd-bg-mint)] rounded-[8px] flex items-center justify-center shrink-0">
					<QuestionIcon />
				</div>
				<h3 className="typo-headline-1 font-bold text-[var(--dnd-label-normal)] py-1">
					{question.content}
				</h3>
			</div>

			<Textarea
				value={answerText}
				onChange={(e) => setAnswerText(e.target.value)}
				placeholder="답변을 입력해 주세요"
				maxLength={200}
				showCharacterCount
				resize="none"
			/>

			<div className="flex justify-end">
				<div className="flex gap-2">
					<button
						type="button"
						onClick={onCancel}
						disabled={isPending}
						className="px-4 py-2 rounded-[12px] typo-body-2 font-medium text-[var(--dnd-label-neutral)] hover:bg-gray-100 transition-colors"
					>
						취소
					</button>
					<button
						type="button"
						onClick={() =>
							submitAnswer({
								questionId: question.questionId,
								content: answerText,
							})
						}
						disabled={isPending || answerText.length === 0}
						className="px-4 py-2 rounded-[12px] bg-[var(--dnd-primary)] text-white typo-body-2 font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
					>
						{isPending ? "제출 중..." : "완료"}
					</button>
				</div>
			</div>
		</div>
	);
}
