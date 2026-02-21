"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { HistoryIcon } from "@/components/ui/icons/HistoryIcon";
import { KebabIcon } from "@/components/ui/icons/KebabIcon";
import { QuestionIcon } from "@/components/ui/icons/QuestionIcon";
import { Sparkle } from "@/components/ui/icons/Sparkle";
import {
	type InsightAnswerCard,
	type InsightQuestion,
	insightQuestionsQueryOptions,
} from "@/lib/queries/insight";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date";


interface InsightQnAPanelProps {
	insightId: number;
}

export function InsightQnAPanel({ insightId }: InsightQnAPanelProps) {
	const { data } = useSuspenseQuery(insightQuestionsQueryOptions(insightId));
	const [mode, setMode] = useState<"questions" | "answers">("questions");

	return (
		<div className="w-[360px] h-[calc(100vh-100px)] sticky top-[80px] rounded-[32px] shadow-sm bg-[var(--dnd-bg-question)] flex flex-col overflow-hidden border border-[var(--dnd-line-normal)]">
			<div
				className={cn(
					"flex flex-col transition-all duration-300 ease-in-out",
					mode === "questions" ? "flex-1 min-h-0" : "flex-none",
				)}
			>
				<div
					className={cn(
						"px-[32px] py-[16px] flex justify-between items-center bg-[var(--dnd-bg-question)] rounded-t-[32px]",
						mode === "answers" && "cursor-pointer transition-all",
					)}
					onClick={() => setMode("questions")}
					onKeyDown={(e) => e.key === "Enter" && setMode("questions")}
					tabIndex={mode === "answers" ? 0 : -1}
					role={mode === "answers" ? "button" : "presentation"}
				>
					<h2 className="typo-headline-1 font-medium text-[var(--dnd-label-normal)]">
						제안된 질문
					</h2>
					<HistoryIcon />
				</div>

				<div
					className={cn(
						"relative no-scrollbar transition-all duration-300 ease-in-out",
						mode === "questions"
							? "flex-1 overflow-y-auto p-6 opacity-100"
							: "flex-none h-0 overflow-hidden px-6 py-0 opacity-0 pointer-events-none"
					)}
				>
					<div className="flex flex-col gap-2 pb-8 h-max">
							{data.questions.map((question) => (
								<QuestionItem key={question.questionId} question={question} />
							))}

							<div className="flex flex-col gap-4 pt-4 relative group items-start">
								<button
									type="button"
									className="bg-white border border-[var(--dnd-line-strong)] rounded-lg py-2 px-3 shadow-sm hover:bg-gray-50 transition-colors"
								>
									<div className="flex items-center justify-center gap-1">
										<Sparkle />
										<span className="typo-caption-1 font-medium text-[var(--dnd-label-neutral)]">
											새로운 질문 받기
										</span>
									</div>
								</button>

								<div className="absolute top-full mt-2 left-0 right-0 z-10 bg-[var(--dnd-label-normal)] backdrop-blur-md rounded-lg p-2.5 text-[var(--dnd-bg-normal)] typo-body-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
									<div className="absolute top-[-6px] left-4 w-3 h-3 bg-[var(--dnd-label-normal)] rotate-45 transform" />
									<div className="text-center">
										이전 답변은 히스토리에서 다시 볼 수 있어요
									</div>
								</div>
							</div>
						</div>
					</div>
			</div>

			<div
				className={cn(
					"flex flex-col transition-all duration-300 ease-in-out rounded-t-[32px] overflow-hidden",
					mode === "answers"
						? "flex-1 min-h-0 bg-[var(--dnd-bg-alternative)]" // Expanded style
						: "flex-none shadow-[0_-4px_10px_rgba(0,0,0,0.05)] bg-white", // Collapsed style
				)}
			>
				<div
					className={cn(
						"px-[32px] py-[16px] flex justify-between items-center border-b border-[var(--dnd-line-normal)] cursor-pointer rounded-t-[32px]",
						mode === "questions" ? "bg-white" : "bg-[var(--dnd-bg-alternative)]"
					)}
					onClick={() =>
						setMode(mode === "questions" ? "answers" : "questions")
					}
					onKeyDown={(e) =>
						e.key === "Enter" &&
						setMode(mode === "questions" ? "answers" : "questions")
					}
					tabIndex={0}
					role="button"
				>
					<h2 className="typo-headline-2 font-medium text-[var(--dnd-label-normal)]">
						답변카드
					</h2>
					<ChevronsUpDown size={24} />
				</div>

				<div
					className={cn(
						"transition-all duration-300 ease-in-out bg-[var(--dnd-bg-alternative)]",
						mode === "answers"
							? "flex-1 overflow-y-auto px-[32px] py-[16px] opacity-100"
							: "flex-none overflow-hidden h-0 px-[32px] py-0 opacity-0 pointer-events-none"
					)}
				>
					<div className="flex flex-col gap-6 h-max">
						{data.answerCards.map((card) => (
							<AnswerCardItem key={card.answerId} card={card} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function QuestionItem({ question }: { question: InsightQuestion }) {
	return (
		<button
			type="button"
			className="bg-white rounded-[32px] px-4 py-2 text-left hover:bg-gray-50 transition-colors shadow-sm"
		>
			<span className="typo-headline-1 font-semibold text-[var(--dnd-label-normal)] text-[18px]">
				{question.content}
			</span>
		</button>
	);
}

function AnswerCardItem({ card }: { card: InsightAnswerCard }) {
	const { year, month, day, weekday } = formatDate(card.createdDate);
	const dateStr = `${year}.${month}.${day} ${weekday}`;

	return (
		<div
			className={cn(
				"rounded-[20px] p-6 flex flex-col gap-4 shadow-sm",
				card.isSaved ? "bg-[var(--dnd-bg-mint)]" : "bg-[var(--dnd-bg-normal)]",
			)}
		>
			<div className="flex gap-3 items-center">
				<div className="w-[34px] h-[34px] bg-[var(--dnd-bg-mint)] rounded-[8px] flex items-center justify-center shrink-0">
					<QuestionIcon />

				</div>
				<h3 className="typo-headline-1 font-bold text-[var(--dnd-label-normal)] py-1">
					{card.questionContent}
				</h3>
			</div>

			<div className="bg-[var(--dnd-bg-alternative)] rounded-[16px] p-4 flex flex-col gap-6">
				<p className="typo-body-1 text-[var(--dnd-label-normal)] whitespace-pre-wrap leading-[1.6]">
					{card.answerContent}
				</p>

				<div className="flex justify-between items-center gap-[8px]">
					<span className="typo-label-1 font-normal text-[var(--dnd-label-alternative)]">
						{dateStr}
					</span>

					{card.isSaved && (
						<div className="flex items-center gap-[8px]">
							<span className="typo-caption-1 font-medium text-[var(--dnd-primary)]">
								인사이트 저장됨
							</span>
							<button type="button" className="p-0.5">
								<KebabIcon />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export function InsightQnAPanelSkeleton() {
	return (
		<div className="w-[360px] h-[calc(100vh-100px)] sticky top-[80px] rounded-[32px] shadow-sm bg-[var(--dnd-bg-question)] flex flex-col overflow-hidden border border-[var(--dnd-line-normal)]">
			<div className="flex-1 flex flex-col">
				<div className="px-[32px] py-[16px] flex justify-between items-center rounded-t-[32px]">
					<div className="h-6 w-24 bg-[var(--dnd-fill-strong)] rounded-md" />
					<div className="w-6 h-6 bg-[var(--dnd-fill-normal)] rounded-full" />
				</div>
				<div className="p-6 flex-1 flex flex-col gap-2">
					<div className="h-10 w-full bg-white rounded-full" />
					<div className="h-10 w-3/4 bg-white rounded-full" />
					<div className="h-10 w-5/6 bg-white rounded-full" />
					<div className="mt-4 h-10 w-[140px] bg-white rounded-lg border border-[var(--dnd-line-strong)]" />
				</div>
			</div>
			<div className="h-[60px] bg-white rounded-t-[32px] border-b border-[var(--dnd-line-normal)] shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-between px-[32px]">
				<div className="h-6 w-20 bg-[var(--dnd-fill-strong)] rounded-md" />
				<div className="w-6 h-6 bg-[var(--dnd-fill-normal)] rounded-md" />
			</div>
		</div>
	);
}
