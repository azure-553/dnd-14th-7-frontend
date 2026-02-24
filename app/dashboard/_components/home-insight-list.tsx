import Image from "next/image";
import { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

export interface HomeInsightListProps {
	header: ReactNode;
	children: ReactNode[];
	onMoreClick?: () => void;
	className?: string;
}

export function HomeInsightList({
	header,
	children,
	onMoreClick,
	className,
}: HomeInsightListProps) {
	const scrollRef = useRef<HTMLDivElement>(null);

	const handleNextClick = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
			onMoreClick?.();
		}
	};

	return (
		<section
			className={cn(
				"flex flex-col gap-[24px] w-full max-w-[1200px] relative",
				className,
			)}
		>
			<div className="flex items-center">{header}</div>
			<div className="flex items-center w-full">
				<div
					ref={scrollRef}
					className="flex gap-[24px] items-center overflow-x-auto w-full min-w-0 pb-[20px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory [&>*]:snap-start [&>*]:shrink-0"
				>
					{children}
				</div>

				<div className="flex-shrink-0 ml-[20px]">
					<button
						type="button"
						onClick={handleNextClick}
						aria-label="다음"
						className="flex items-center justify-center w-[48px] h-[48px] cursor-pointer rounded-full transition-colors"
					>
						<Image src="/right.svg" alt="다음" width={14} height={24} />
					</button>
				</div>
			</div>
		</section>
	);
}

export function HomeToggleHeader({
	isLatest,
	onToggle,
}: {
	isLatest: boolean;
	onToggle: (latest: boolean) => void;
}) {
	return (
		<div className="flex bg-dnd-bg-alternative rounded-[10px] p-[4px]">
			<button
				type="button"
				onClick={() => onToggle(true)}
				className={cn(
					"px-[12px] py-[6px] rounded-[8px] typo-label-1 font-semibold transition-all",
					isLatest
						? "bg-white text-dnd-label-strong shadow-sm"
						: "text-dnd-label-alternative hover:text-dnd-label-normal",
				)}
			>
				최신순
			</button>
			<button
				type="button"
				onClick={() => onToggle(false)}
				className={cn(
					"px-[12px] py-[6px] rounded-[8px] typo-label-1 font-semibold transition-all",
					!isLatest
						? "bg-white text-dnd-label-strong shadow-sm"
						: "text-dnd-label-alternative hover:text-dnd-label-normal",
				)}
			>
				많이 본 순
			</button>
		</div>
	);
}

export function HomeTitleHeader({
	title,
	icon,
}: {
	title: string;
	icon?: ReactNode;
}) {
	return (
		<h2 className="typo-title-2 font-bold text-dnd-label-strong flex items-center gap-[8px]">
			{icon && (
				<span className="flex items-center justify-center shrink-0 w-[40px] h-[40px] rounded-[8px] bg-dnd-bg-mint">
					<span className="flex items-center justify-center w-[24px] h-[24px] bg-[#F2F4F6]">
						{icon}
					</span>
				</span>
			)}
			{title}
		</h2>
	);
}
