import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { Slot } from "radix-ui";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 select-none",
	{
		variants: {
			variant: {
				// 기존 shadcn 호환
				default:
					"bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50",
				ghost:
					"hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
				link: "text-primary underline-offset-4 hover:underline disabled:opacity-50",
				// DND Solid
				solid:
					"font-semibold bg-dnd-primary text-dnd-static-white hover:bg-dnd-primary-strong active:bg-dnd-primary-heavy disabled:bg-dnd-interaction-disable disabled:text-dnd-label-assistive",
				"solid-secondary":
					"font-semibold bg-dnd-bg-mint text-dnd-primary-strong hover:bg-dnd-bg-mint/80 active:bg-dnd-bg-mint/60 disabled:bg-dnd-interaction-disable disabled:text-dnd-label-assistive",
				"solid-assistive":
					"font-medium bg-dnd-bg-alternative text-dnd-label-neutral hover:bg-dnd-fill-normal active:bg-dnd-fill-strong disabled:bg-dnd-interaction-disable disabled:text-dnd-label-assistive",
				"solid-white":
					"font-medium bg-dnd-bg-normal text-dnd-label-neutral hover:bg-dnd-fill-normal active:bg-dnd-fill-strong disabled:bg-dnd-interaction-disable disabled:text-dnd-label-assistive",
				// DND Outlined
				outlined:
					"bg-transparent border border-dnd-primary text-dnd-primary hover:bg-dnd-primary/5 active:bg-dnd-primary/10 disabled:bg-transparent disabled:border-dnd-line-neutral disabled:text-dnd-label-disable",
				"outlined-secondary":
					"bg-transparent border border-dnd-line-normal text-dnd-label-normal hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal disabled:bg-transparent disabled:border-dnd-line-neutral disabled:text-dnd-label-disable",
				"outlined-assistive":
					"bg-transparent border border-dnd-line-neutral text-dnd-label-alternative hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal disabled:bg-transparent disabled:border-dnd-line-neutral disabled:text-dnd-label-disable",
				// DND Text
				text: "bg-transparent text-dnd-primary hover:bg-dnd-primary/5 active:bg-dnd-primary/10 disabled:bg-transparent disabled:text-dnd-label-disable",
				"text-secondary":
					"bg-transparent text-dnd-label-normal hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal disabled:bg-transparent disabled:text-dnd-label-disable",
				"text-assistive":
					"bg-transparent text-dnd-label-alternative hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal disabled:bg-transparent disabled:text-dnd-label-disable",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
				"icon-sm": "h-8 w-8",
				"icon-xs": "h-6 w-6 [&_svg:not([class*='size-'])]:size-3.5",
				// DND sizes
				"dnd-small": "h-8 px-3.5 rounded-lg gap-1 typo-label-2",
				"dnd-medium": "h-10 px-5 rounded-[10px] gap-[5px] typo-body-2",
				"dnd-large": "h-12 px-7 rounded-xl gap-1.5 typo-body-1",
				"dnd-xl": "h-[54px] px-9 rounded-xl gap-1.5 typo-headline-2",
				"dnd-xxl": "h-16 px-11 rounded-xl gap-1.5 typo-headline-1",
				"dnd-xxxl": "h-[72px] px-13 rounded-xl gap-1.5 typo-heading-2",
				// DND icon-only sizes
				"dnd-icon-small": "size-8 rounded-lg",
				"dnd-icon-medium": "size-10 rounded-[10px]",
				"dnd-icon-large": "size-12 rounded-xl",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ComponentProps<"button">,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
}

function Button({
	className,
	variant,
	size,
	asChild = false,
	loading = false,
	disabled,
	children,
	...props
}: ButtonProps) {
	const Comp = asChild ? Slot.Root : "button";

	return (
		<Comp
			data-slot="button"
			data-variant={variant}
			data-size={size}
			disabled={disabled || loading}
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		>
			{loading ? (
				<>
					<Loader2 className="animate-spin" />
					{children}
				</>
			) : (
				children
			)}
		</Comp>
	);
}

export { Button, buttonVariants };
