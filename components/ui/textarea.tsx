"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "children"> {
  /** Label text */
  label?: string
  /** Helper/description text */
  description?: string
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
  /** Show character counter */
  showCharacterCount?: boolean
  /** Trailing button text */
  trailingButton?: string
  /** Trailing button click handler */
  onTrailingButtonClick?: () => void
  /** Resize behavior */
  resize?: "normal" | "vertical" | "none"
}

function Textarea({
  className,
  label,
  description,
  error,
  errorMessage,
  showCharacterCount,
  maxLength,
  trailingButton,
  onTrailingButtonClick,
  resize = "vertical",
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: TextareaProps) {
  const [internalValue, setInternalValue] = React.useState(
    defaultValue?.toString() || ""
  )
  const [isFocused, setIsFocused] = React.useState(false)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value?.toString() || "" : internalValue
  const characterCount = currentValue.length

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e)
  }

  const displayMessage = error ? errorMessage : description
  // error일 때 trailingButton 없으면 느낌표 아이콘 표시
  const showErrorIcon = error && !trailingButton && !disabled
  const showBottom = showCharacterCount || trailingButton || showErrorIcon

  const resizeClass = {
    normal: "resize",
    vertical: "resize-y",
    none: "resize-none",
  }[resize]

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Label */}
      {label && (
        <label className="font-semibold typo-label-1 text-dnd-label-neutral">
          {label}
        </label>
      )}

      {/* Textarea Container */}
      <div
        className={cn(
          "relative flex flex-col gap-3 p-3 rounded-[12px] transition-all overflow-hidden",
          "shadow-[0px_1px_2px_0px_rgba(0,0,0,0.03)]",
          // 항상 border 1px 유지
          "border",
          // Default border color
          !error && !disabled && "border-dnd-line-neutral",
          // Error border color
          error && !disabled && "border-dnd-status-negative",
          // Focus - ring으로 추가 border 효과
          !error && !disabled && isFocused && "ring-[1.5px] ring-dnd-primary/43",
          // Error + Focus - 빨간색 ring
          error && !disabled && isFocused && "ring-[1.5px] ring-dnd-status-negative",
          // Disabled
          disabled && "bg-dnd-interaction-disable border-dnd-line-alternative"
        )}
      >
        {/* Textarea */}
        <textarea
          data-slot="textarea"
          disabled={disabled}
          maxLength={maxLength}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "min-h-[80px] px-1 bg-transparent border-none outline-none",
            "typo-body-1-reading text-dnd-label-normal placeholder:text-dnd-label-assistive",
            resizeClass,
            disabled &&
              "text-dnd-label-disable placeholder:text-dnd-label-disable cursor-not-allowed resize-none"
          )}
          {...props}
        />

        {/* Bottom */}
        {showBottom && (
          <div className="flex items-center justify-between backdrop-blur-[32px]">
            {/* Character Counter */}
            <div className="flex-1">
              {showCharacterCount && (
                <span className="typo-label-2 text-dnd-label-alternative opacity-74">
                  {characterCount}
                  {maxLength && `/${maxLength}`}
                </span>
              )}
            </div>

            {/* Trailing Button */}
            {trailingButton && (
              <button
                type="button"
                onClick={onTrailingButtonClick}
                disabled={disabled}
                className={cn(
                  "font-semibold typo-body-1 text-dnd-primary px-1 py-1 transition-colors",
                  "hover:opacity-80",
                  disabled && "text-dnd-label-assistive cursor-not-allowed"
                )}
              >
                {trailingButton}
              </button>
            )}

            {/* Error Icon */}
            {showErrorIcon && (
              <div className="flex items-center justify-center size-6 rounded-full bg-dnd-status-negative">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Description/Error Message */}
      {displayMessage && (
        <p
          className={cn(
            "typo-caption-1",
            error && "text-dnd-status-negative",
            !error && "text-dnd-label-alternative"
          )}
        >
          {displayMessage}
        </p>
      )}
    </div>
  )
}

export { Textarea }
