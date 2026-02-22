"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { KebabIcon } from "@/components/ui/icons/KebabIcon";
import { QuestionIcon } from "@/components/ui/icons/QuestionIcon";
import type { InsightAnswerCard } from "@/lib/queries/insight";
import { insightQuestionsQueryOptions } from "@/lib/queries/insight";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/date";
import type { QnAMode } from "./index";

interface AnswerCardsSectionProps {
	mode: QnAMode;
	onToggleMode: () => void;
	insightId: number;
}

export function AnswerCardsSection({
	mode,
	onToggleMode,
	insightId,
}: AnswerCardsSectionProps) {
	const { data } = useSuspenseQuery(insightQuestionsQueryOptions(insightId));
	const answerCards = data.answerCards;

	return (
		<div
			className={cn(
				"flex flex-col transition-all duration-300 ease-in-out rounded-t-[32px] overflow-hidden",
				mode === "answers"
					? "flex-1 min-h-0 bg-[var(--dnd-bg-alternative)]"
					: "flex-none shadow-[0_-4px_10px_rgba(0,0,0,0.05)] bg-white",
			)}
		>
			<button
				type="button"
				className={cn(
					"w-full px-[32px] py-[16px] flex justify-between items-center border-b border-[var(--dnd-line-normal)] cursor-pointer rounded-t-[32px]",
					mode === "questions" ? "bg-white" : "bg-[var(--dnd-bg-alternative)]",
				)}
				onClick={onToggleMode}
				aria-expanded={mode === "answers"}
			>
				<h2 className="typo-headline-2 font-medium text-[var(--dnd-label-normal)]">
					답변카드
				</h2>
				<ChevronsUpDown size={24} />
			</button>

			<div
				className={cn(
					"transition-all duration-300 ease-in-out bg-[var(--dnd-bg-alternative)]",
					mode === "answers"
						? "flex-1 overflow-y-auto px-[32px] py-[16px] opacity-100"
						: "flex-none overflow-hidden h-0 px-[32px] py-0 opacity-0 pointer-events-none",
				)}
			>
				<div className="flex flex-col gap-6 h-max">
					{answerCards.map((card) => (
						<AnswerCardItem key={card.answerId} card={card} />
					))}
				</div>
			</div>
		</div>
	);
}

interface AnswerCardItemProps {
	card: InsightAnswerCard;
}

function AnswerCardItem({ card }: AnswerCardItemProps) {
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
							<button type="button" className="p-0.5" aria-label="답변카드 메뉴">
								<KebabIcon />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
