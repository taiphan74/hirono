import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type ComboboxVisualState = "unselected" | "active" | "selected" | "disabled" | "invalid"

type ComboboxFieldProps = {
  state?: ComboboxVisualState
  disabled?: boolean
  leadingIcon?: React.ReactNode
  content: React.ReactNode
  trailingIcon?: React.ReactNode
  className?: string
}

function ComboboxField({
  state = "unselected",
  disabled = false,
  leadingIcon,
  content,
  trailingIcon,
  className,
}: ComboboxFieldProps): React.JSX.Element {
  const isDisabled = disabled || state === "disabled"

  return (
    <div
      data-slot="combobox-field"
      data-state={state}
      className={cn(
        "flex h-12 w-[320px] items-center gap-2 rounded-[16px] border px-4 py-2",
        state === "active" && "border-[#757575] shadow-[0_1px_4px_rgba(12,12,13,0.05)]",
        state === "invalid" && "border-[#690807]",
        state !== "active" && state !== "invalid" && "border-[#D9D9D9]",
        isDisabled ? "bg-[#E6E6E6]" : "bg-white",
        className
      )}
    >
      {leadingIcon ? <span className={cn("size-5", isDisabled && "text-[#757575]")}>{leadingIcon}</span> : null}
      <div className={cn("min-w-0 flex-1 text-base leading-[1.4]", isDisabled ? "text-[#757575]" : "text-[#1E1E1E]")}>{content}</div>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full",
          isDisabled ? "bg-[#E6E6E6] text-[#757575]" : "bg-white text-[#1E1E1E]"
        )}
      >
        {trailingIcon ?? <ChevronsUpDown className="size-4" />}
      </span>
    </div>
  )
}

export { ComboboxField }
export type { ComboboxFieldProps }
