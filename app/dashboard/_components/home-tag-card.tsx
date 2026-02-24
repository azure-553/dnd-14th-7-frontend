import { cn } from "@/lib/utils";

export interface HomeTagCardProps {
	id: number;
	name: string;
	insights: { id: number; title: string }[];
	totalCount: number;
	className?: string;
}

export function HomeTagCard({
	id,
	name,
	insights,
	totalCount,
	className,
}: HomeTagCardProps) {
	return (
		<div
			className={cn(
				"flex flex-col w-[calc(25%-18px)] p-[24px] bg-white rounded-[24px] border border-dnd-line-alternative shadow-dnd-normal shrink-0",
				className,
			)}
		>
			<h3 className="typo-headline-1 font-semibold text-dnd-label-strong mb-[20px] flex items-center gap-[4px]">
				<span className="text-dnd-primary">#</span>
				{name}
			</h3>

			<ul className="flex flex-col gap-[12px]">
				{insights.slice(0, 3).map((insight) => (
					<li
						key={insight.id}
						className="typo-body-2 text-dnd-label-neutral flex items-start gap-[8px]"
					>
						<span className="text-dnd-label-assistive leading-[22px]">•</span>
						<span className="line-clamp-1">{insight.title}</span>
					</li>
				))}
			</ul>

			<div className="flex justify-end mt-auto">
				<span className="typo-caption-1 text-dnd-label-alternative">
					{totalCount}개
				</span>
			</div>
		</div>
	);
}
