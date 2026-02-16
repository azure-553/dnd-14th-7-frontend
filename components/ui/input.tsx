import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
	[
		"flex w-full bg-transparent text-dnd-label-normal transition-all",
		"file:border-0 file:bg-transparent file:text-sm file:font-medium",
		"placeholder:text-dnd-label-assistive",
		"focus:outline-none",
		"disabled:pointer-events-none disabled:cursor-not-allowed",
	].join(" "),
	{
		variants: {
			variant: {
				// shadcn 호환
				default: [
					"rounded-md border border-input shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]",
					"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
					"aria-invalid:ring-destructive/20 aria-invalid:border-destructive aria-invalid:ring-[3px]",
				].join(" "),
				// DND outlined (피그마 기준)
				// border 1px neutral → focus 시 ring으로 2px border 효과 (레이아웃 시프트 방지)
				outlined: [
					"rounded-[12px] border border-dnd-line-neutral shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]",
					"focus:border-transparent focus:ring-2 focus:ring-dnd-primary/43",
					"aria-invalid:border-dnd-status-negative aria-invalid:focus:ring-dnd-status-negative",
					"disabled:bg-dnd-interaction-disable disabled:border-dnd-line-alternative disabled:text-dnd-label-disable disabled:placeholder:text-dnd-label-disable",
				].join(" "),
				// DND filled
				filled: [
					"rounded-[12px] border border-transparent bg-dnd-fill-normal shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]",
					"focus:bg-dnd-fill-alternative focus:ring-2 focus:ring-dnd-primary/43",
					"aria-invalid:bg-dnd-status-negative/10 aria-invalid:focus:ring-dnd-status-negative",
					"disabled:bg-dnd-interaction-disable disabled:text-dnd-label-disable",
				].join(" "),
				// DND underlined
				underlined: [
					"rounded-none border-0 border-b-2 border-dnd-line-neutral",
					"focus:border-dnd-primary",
					"aria-invalid:border-dnd-status-negative",
					"disabled:text-dnd-label-disable",
				].join(" "),
			},
			inputSize: {
				default: "h-9 px-3 py-2 text-sm",
				sm: "h-8 px-2.5 py-1.5 text-sm",
				lg: "h-11 px-4 py-3 text-base",
				// DND sizes (피그마 기준: padding 12px, min-height 48px)
				"dnd-medium": "min-h-12 px-4 py-3 typo-body-1",
			},
		},
		defaultVariants: {
			variant: "default",
			inputSize: "default",
		},
	},
);

export interface InputProps
	extends Omit<React.ComponentProps<"input">, "size">,
		VariantProps<typeof inputVariants> {}

function Input({ className, type, variant, inputSize, ...props }: InputProps) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(inputVariants({ variant, inputSize, className }))}
			{...props}
		/>
	);
}

export { Input, inputVariants };
