"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Search, X } from "lucide-react"

import { cn } from "@/lib/utils"

const searchTriggerVariants = cva(
  "group/search flex h-10 min-w-[120px] items-center gap-2 rounded-full border bg-white px-4 py-3 text-base leading-[1] outline-none transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default: "border-[#D9D9D9] bg-white",
        disabled: "border-[#B3B3B3] bg-[#D9D9D9]",
      },
      valueType: {
        filled: "text-[#1E1E1E]",
        placeholder: "text-[#767676]",
      },
    },
    compoundVariants: [
      {
        state: "disabled",
        valueType: "filled",
        className: "text-[#B3B3B3]",
      },
      {
        state: "disabled",
        valueType: "placeholder",
        className: "text-[#B3B3B3]",
      },
    ],
    defaultVariants: {
      state: "default",
      valueType: "placeholder",
    },
  }
)

type SearchFieldState = "default" | "disabled"
type SearchFieldValueType = "filled" | "placeholder"

type SearchFieldProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof searchTriggerVariants> & {
    state?: SearchFieldState
    valueType?: SearchFieldValueType
  }

function SearchField({
  className,
  state = "default",
  valueType = "placeholder",
  disabled,
  ...props
}: SearchFieldProps): React.JSX.Element {
  const isDisabled = state === "disabled" || Boolean(disabled)

  return (
    <div
      data-slot="search-field"
      data-state={state}
      data-value-type={valueType}
      className={cn(searchTriggerVariants({ state, valueType, className }))}
    >
      <input
        type="search"
        disabled={isDisabled}
        className="flex-1 bg-transparent text-inherit outline-none placeholder:text-inherit"
        {...props}
      />
      {isDisabled && valueType === "filled" ? (
        <X className="size-4 shrink-0 text-[#B3B3B3]" />
      ) : (
        <Search className={cn("size-4 shrink-0", isDisabled ? "text-[#B3B3B3]" : "text-[#1E1E1E]")} />
      )}
    </div>
  )
}

export { SearchField, searchTriggerVariants }
export type { SearchFieldProps, SearchFieldState, SearchFieldValueType }
