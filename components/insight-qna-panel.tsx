"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronsUpDown, Sparkles } from "lucide-react";
import { useState } from "react";
import { HistoryIcon } from "@/components/ui/icons/HistoryIcon";
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
		<div className="w-[360px] h-[calc(100vh-100px)] sticky top-[80px] rounded-[32px] shadow-sm bg-[var(--dnd-bg-alternative)] flex flex-col overflow-hidden border border-[var(--dnd-line-normal)]">
			{/* Suggested Questions Section */}
			<div
				className={cn(
					"flex flex-col transition-all duration-300 ease-in-out",
					mode === "questions" ? "flex-1 min-h-0" : "flex-none",
				)}
			>
				{/* Header - Always visible, clickable to switch back if in answers mode */}
				<div
					className={cn(
						"px-[32px] py-[16px] flex justify-between items-center",
						mode === "answers" && "cursor-pointer",
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

				{/* Content - Visible only in 'questions' mode */}
				{mode === "questions" && (
					<div className="px-8 pb-8 flex-1 overflow-y-auto relative no-scrollbar">
						<div className="flex flex-col gap-4 pb-8">
							{data.questions.map((question) => (
								<QuestionItem key={question.questionId} question={question} />
							))}

							{/* Actions */}
							<div className="flex flex-col gap-4 pt-4 relative group">
								<button
									type="button"
									className="bg-white border border-[var(--dnd-line-strong)] rounded-lg py-2 px-3 flex items-center gap-1 shadow-sm hover:bg-gray-50 transition-colors"
								>
									<Sparkle />
									<span className="typo-caption-1 font-medium text-[var(--dnd-label-neutral)]">
										새로운 질문 받기
									</span>
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
				)}
			</div>

			{/* Answer Cards Section */}
			<div
				className={cn(
					"flex flex-col bg-white transition-all duration-300 ease-in-out",
					mode === "answers"
						? "flex-1 min-h-0 bg-[var(--dnd-bg-alternative)]" // Expanded style
						: "flex-none rounded-t-[32px] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]", // Collapsed style
				)}
			>
				{/* Header */}
				<div
					className="px-[32px] py-[16px] flex justify-between items-center border-b border-[var(--dnd-line-normal)] bg-white cursor-pointer rounded-t-[32px]"
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

				{/* Content - Visible only in 'answers' mode */}
				{mode === "answers" && (
					<div className="px-[32px] py-[16px] flex-1 overflow-y-auto bg-[var(--dnd-bg-normal-alternative)]">
						<div className="flex flex-col gap-6">
							{data.answerCards.map((card) => (
								<AnswerCardItem key={card.answerId} card={card} />
							))}
						</div>
					</div>
				)}
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
		<div className="bg-[var(--dnd-bg-mint-2)] rounded-[20px] p-5 flex flex-col gap-3">
			<div className="flex gap-3 items-start">
				<div className="w-[34px] h-[34px] bg-[var(--dnd-bg-mint)] rounded-[8px] flex items-center justify-center shrink-0 mt-0.5">
					<span className="font-['Pretendard'] font-bold text-[16px] text-[#51CCBD]">
						Q
					</span>
				</div>
				<h3 className="typo-headline-2 font-bold text-[var(--dnd-label-normal)] leading-[1.4] py-1">
					{card.questionContent}
				</h3>
			</div>

			<div className="bg-white rounded-[16px] p-5 flex flex-col gap-6">
				<p className="typo-body-1 text-[var(--dnd-label-normal)] whitespace-pre-wrap leading-[1.6]">
					{card.answerContent}
				</p>

				<div className="flex justify-between items-center">
					<span className="typo-caption-1 text-[var(--dnd-label-assistive)]">
						{dateStr}
					</span>

					{card.isSaved && (
						<div className="flex items-center gap-2">
							<span className="typo-caption-1 font-medium text-[var(--dnd-primary)]">
								인사이트 저장됨
							</span>
							<button type="button" className="p-0.5">
								<div className="w-6 h-6 bg-[#FEEAEB] rounded flex items-center justify-center gap-[2px]">
									<div className="w-[3px] h-[3px] rounded-full bg-[#FF5E67]" />
									<div className="w-[3px] h-[3px] rounded-full bg-[#FF5E67]" />
									<div className="w-[3px] h-[3px] rounded-full bg-[#FF5E67]" />
								</div>
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
