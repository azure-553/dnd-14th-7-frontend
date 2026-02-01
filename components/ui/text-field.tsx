"use client"

import { Check, X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextFieldProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  label?: string
  helperText?: string
  error?: boolean
  errorMessage?: string
  success?: boolean
  successMessage?: string
  onClear?: () => void
}

function TextField({
  className,
  label,
  helperText,
  error,
  errorMessage,
  success,
  successMessage,
  onClear,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: TextFieldProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue?.toString() || "")
  const [isFocused, setIsFocused] = React.useState(false)
  const isControlled = value !== undefined
  const currentValue = isControlled ? value?.toString() || "" : internalValue
  const hasValue = currentValue.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value)
    }
    onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("")
    }
    onClear?.()
  }

  const displayMessage = error ? errorMessage : success ? successMessage : helperText
  const showStatusIcon = error || success
  const showClearButton = hasValue && !disabled && !error && !success

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Label */}
      {label && (
        <label className="font-semibold typo-label-1 text-dnd-label-neutral">
          {label}
        </label>
      )}

      {/* Input Container */}
      <div
        className={cn(
          "relative flex items-center gap-3 p-3 rounded-[12px] transition-all",
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
        {/* Input */}
        <input
          data-slot="text-field-input"
          disabled={disabled}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "flex-1 min-h-[24px] px-1 bg-transparent border-none outline-none",
            "typo-body-1 text-dnd-label-normal placeholder:text-dnd-label-assistive",
            disabled && "text-dnd-label-disable placeholder:text-dnd-label-disable cursor-not-allowed"
          )}
          {...props}
        />

        {/* Clear Button */}
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center shrink-0 text-dnd-label-alternative hover:text-dnd-label-normal transition-colors"
            aria-label="입력 지우기"
          >
            <X className="size-6" />
          </button>
        )}

        {/* Status Icon */}
        {showStatusIcon && (
          <div className="flex items-center justify-center shrink-0">
            {error && (
              <div className="flex items-center justify-center size-6 rounded-full bg-dnd-status-negative">
                <span className="text-white text-xs font-bold">!</span>
              </div>
            )}
            {success && (
              <div className="flex items-center justify-center size-6 rounded-full bg-dnd-primary">
                <Check className="size-3.5 text-white" strokeWidth={3} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper/Error/Success Text */}
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

export { TextField }
