"use client"

import * as React from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

type RadioFieldState = "default" | "disabled"
type RadioFieldValueType = "default" | "placeholder"

type RadioGroupFieldProps = {
  label?: string
  description?: string
  state?: RadioFieldState
  valueType?: RadioFieldValueType
}

function RadioGroupField({
  label = "Label",
  description = "Description",
  state = "default",
  valueType = "default",
}: RadioGroupFieldProps): React.JSX.Element {
  const disabled = state === "disabled"

  return (
    <div className="flex min-w-[120px] flex-col items-start gap-2">
      <div className="flex min-w-[120px] items-center gap-3">
        <RadioGroup value={valueType === "default" ? "value" : undefined} disabled={disabled}>
          <RadioGroupItem value="value" fieldState={state} disabled={disabled} />
        </RadioGroup>
        <span className={cn("text-base leading-[1.4] text-[#1E1E1E]", disabled && "text-[#B3B3B3]")}>
          {label}
        </span>
      </div>

      <div className="flex min-w-[120px] items-center gap-3">
        <span className="size-4 shrink-0" />
        <span className={cn("text-base leading-[1.4] text-[#757575]", disabled && "text-[#B3B3B3]")}>
          {description}
        </span>
      </div>
    </div>
  )
}

export { RadioGroupField }
export type { RadioGroupFieldProps, RadioFieldState, RadioFieldValueType }
