"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { PenSquare, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
	type Tag,
	tagsQueryOptions,
	userQueryOptions,
} from "@/lib/queries/user";

function Sidebar() {
	return (
		<div className="fixed left-0 top-0 flex h-full w-[260px] flex-col gap-[32px] bg-dnd-bg-alternative p-[24px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08),0px_1px_2px_0px_rgba(0,0,0,0.12)]">
			<div className="flex w-full items-center justify-between">
				<ErrorBoundary fallback={<SidebarError />}>
					<Suspense fallback={<SidebarFallback />}>
						<SidebarUserProfile />
					</Suspense>
				</ErrorBoundary>
				<Button
					variant="ghost"
					size="icon"
					className="size-[32px] shrink-0 p-0 hover:bg-transparent"
				>
					<svg
						role="img"
						aria-label="사이드바 메뉴 아이콘"
						xmlns="http://www.w3.org/2000/svg"
						width="27"
						height="24"
						viewBox="0 0 27 24"
						fill="none"
					>
						<path
							d="M22.5342 0C24.5326 0.000159259 26.401 1.46991 26.4014 3.57031V20.1641C26.401 22.2645 24.5326 23.7342 22.5342 23.7344H3.86719C1.86865 23.7344 0.000342864 22.2646 0 20.1641V3.57031C0.000343021 1.46979 1.86865 5.6507e-08 3.86719 0H22.5342ZM10.4014 21.333H22.5342C23.4804 21.3329 23.9996 20.6813 24 20.1641V3.57031C23.9996 3.05305 23.4804 2.40152 22.5342 2.40137H10.4014V21.333ZM3.86719 2.40137C2.92075 2.40137 2.40176 3.05299 2.40137 3.57031V20.1641C2.40175 20.6814 2.92075 21.333 3.86719 21.333H8V2.40137H3.86719Z"
							fill="#2E2F33"
							fillOpacity="0.88"
						/>
					</svg>
				</Button>
			</div>

			<Button
				variant="text-secondary"
				className="w-full justify-start gap-[8px] px-[8px] py-[8px] h-auto"
			>
				<svg
					role="img"
					aria-label="홈 아이콘"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M14.7889 7.89022L8.35293 1.45897C8.30659 1.41254 8.25155 1.3757 8.19095 1.35057C8.13036 1.32544 8.0654 1.3125 7.9998 1.3125C7.93421 1.3125 7.86925 1.32544 7.80866 1.35057C7.74806 1.3757 7.69302 1.41254 7.64668 1.45897L1.21074 7.89022C1.02324 8.07772 0.916992 8.33241 0.916992 8.59803C0.916992 9.1496 1.36543 9.59803 1.91699 9.59803H2.59512V14.1871C2.59512 14.4637 2.81855 14.6871 3.09512 14.6871H6.9998V11.1871H8.7498V14.6871H12.9045C13.1811 14.6871 13.4045 14.4637 13.4045 14.1871V9.59803H14.0826C14.3482 9.59803 14.6029 9.49335 14.7904 9.30428C15.1795 8.91366 15.1795 8.28085 14.7889 7.89022Z"
						fill="#2E2F33"
						fillOpacity="0.88"
					/>
				</svg>
				<span className="font-[family-name:var(--font-pretendard)] text-[18px] font-semibold leading-[1.445] tracking-[-0.0036px] text-[var(--dnd-label-neutral)]">
					홈
				</span>
			</Button>

			<div className="flex w-full flex-col gap-[32px]">
				<Button
					className="h-auto w-full flex-row items-center justify-center gap-[4px] rounded-[8px] py-[8px] bg-white border border-[var(--dnd-line-normal)] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.08),0px_1px_2px_0px_rgba(0,0,0,0.12)] hover:bg-[var(--dnd-bg-alternative)]"
					variant="ghost"
				>
					<PenSquare className="size-[16px] text-[var(--dnd-label-neutral)]" />
					<span className="font-[family-name:var(--font-pretendard)] text-[14px] font-medium leading-[1.429] tracking-[0.0145em] text-[var(--dnd-label-neutral)]">
						새 페이지 만들기
					</span>
				</Button>

				<div className="flex w-full flex-col gap-[8px]">
					<p className="w-full overflow-hidden text-ellipsis whitespace-nowrap font-[family-name:var(--font-pretendard)] text-[12px] font-medium leading-[1.5] tracking-[0.0912px] text-[var(--dnd-label-alternative)]">
						태그
					</p>
					<ErrorBoundary fallback={<SidebarError />}>
						<Suspense fallback={<SidebarFallback />}>
							<SidebarTagList />
						</Suspense>
					</ErrorBoundary>
				</div>

				<Button
					variant="text-secondary"
					className="w-full justify-start gap-[8px] px-[8px] py-[8px] h-auto mt-auto"
				>
					<div className="flex h-[24px] w-[20px] items-center justify-center">
						<Trash2 className="size-[20px] text-[var(--dnd-label-neutral)]" />
					</div>
					<span className="font-[family-name:var(--font-pretendard)] text-[16px] font-medium leading-[1.5] text-[var(--dnd-label-neutral)]">
						휴지통
					</span>
				</Button>
			</div>
		</div>
	);
}

function SidebarUserProfile() {
	const { data: user } = useSuspenseQuery(userQueryOptions());

	return (
		<div className="flex flex-1 items-center gap-[8px]">
			<div className="flex size-[32px] shrink-0 items-center justify-center overflow-hidden rounded-[160px] bg-gray-200">
				<div className="size-full bg-gray-300" />
			</div>
			<p className="flex-1 whitespace-pre-wrap font-pretendard text-[18px] font-medium leading-[1.445] tracking-[-0.0036px] text-dnd-label-neutral">
				{user.nickname}
			</p>
		</div>
	);
}

function SidebarTagList() {
	const { data: tags } = useSuspenseQuery(tagsQueryOptions());

	return (
		<div className="flex w-full flex-col items-start gap-[2px]">
			{tags.map((tag) => (
				<SidebarTag key={tag.tagId} tag={tag} />
			))}
		</div>
	);
}

function SidebarTag({ tag }: { tag: Tag }) {
	return (
		<Button
			variant="text-secondary"
			className="w-full justify-start gap-[8px] px-[8px] py-[8px] h-auto"
		>
			<span className="text-[16px] text-dnd-label-alternative">#</span>
			<span className="font-[family-name:var(--font-pretendard)] text-[16px] font-medium leading-[1.5] text-[var(--dnd-label-neutral)]">
				{tag.tagName} ({tag.count})
			</span>
		</Button>
	);
}

function SidebarFallback() {
	return (
		<div className="flex-1 animate-pulse rounded bg-gray-200 h-[20px]" />
	);
}

function SidebarError() {
	return (
		<p className="text-[14px] text-dnd-label-alternative">
			불러오지 못했습니다
		</p>
	);
}

export { Sidebar, SidebarTag };
