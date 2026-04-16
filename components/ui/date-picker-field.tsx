import * as React from "react"

import { DatePickerTrigger } from "@/components/ui/date-picker"
import { cn } from "@/lib/utils"

type DatePickerFieldState = "default" | "error"
type DatePickerFieldValueType = "default" | "placeholder"

type DatePickerFieldProps = {
  label?: string
  description?: string
  error?: string
  state?: DatePickerFieldState
  disabled?: boolean
  valueType?: DatePickerFieldValueType
  value?: string
  placeholder?: string
}

function DatePickerField({
  label = "Label",
  description = "Description",
  error = "Error",
  state = "default",
  disabled = false,
  valueType = "placeholder",
  value,
  placeholder = "Value",
}: DatePickerFieldProps): React.JSX.Element {
  return (
    <div className="flex min-w-[120px] flex-col items-start gap-2">
      <span className={cn("w-[120px] text-base leading-[1.4] text-[#1E1E1E]", disabled && "text-[#B3B3B3]")}>
        {label}
      </span>

      <span className={cn("w-[120px] text-base leading-[1.4] text-[#757575]", disabled && "text-[#B3B3B3]")}>
        {description}
      </span>

      <DatePickerTrigger
        state={state}
        disabled={disabled}
        valueType={valueType}
        value={value}
        placeholder={placeholder}
      />

      {state === "error" && (
        <span className="w-[120px] text-base leading-[1.4] text-[#900B09]">
          {error}
        </span>
      )}
    </div>
  )
}

export { DatePickerField }
export type { DatePickerFieldProps, DatePickerFieldState, DatePickerFieldValueType }
