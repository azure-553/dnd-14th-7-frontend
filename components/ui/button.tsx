import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 select-none",
  {
    variants: {
      variant: {
        // 기존 shadcn 호환
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // DND Solid
        solid: "bg-dnd-primary text-dnd-static-white hover:bg-dnd-primary-strong active:bg-dnd-primary-heavy disabled:bg-dnd-interaction-disable disabled:text-dnd-label-disable",
        "solid-secondary": "bg-dnd-fill-strong text-dnd-label-normal hover:bg-dnd-fill-strong/80 active:bg-dnd-fill-strong/60",
        "solid-assistive": "bg-dnd-bg-normal text-dnd-label-normal border border-dnd-line-normal hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal",
        // DND Outlined
        outlined: "bg-transparent border border-dnd-primary text-dnd-primary hover:bg-dnd-primary/5 active:bg-dnd-primary/10",
        "outlined-secondary": "bg-transparent border border-dnd-line-normal text-dnd-label-normal hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal",
        "outlined-assistive": "bg-transparent border border-dnd-line-neutral text-dnd-label-alternative hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal",
        // DND Text
        text: "bg-transparent text-dnd-primary hover:bg-dnd-primary/5 active:bg-dnd-primary/10",
        "text-secondary": "bg-transparent text-dnd-label-normal hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal",
        "text-assistive": "bg-transparent text-dnd-label-alternative hover:bg-dnd-fill-alternative active:bg-dnd-fill-normal",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-xs": "h-6 w-6 [&_svg:not([class*='size-'])]:size-3.5",
        // DND sizes
        "dnd-small": "h-10 px-4 typo-label-1",
        "dnd-medium": "h-12 px-5 typo-body-2",
        "dnd-large": "h-14 px-6 typo-body-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
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
  const Comp = asChild ? Slot.Root : "button"

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
  )
}

export { Button, buttonVariants }
