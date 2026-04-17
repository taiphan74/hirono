import * as React from "react"

import { cn } from "@/lib/utils"

type DateInputFieldState = "default" | "error"
type DateInputFieldValueType = "default" | "placeholder"

type DateInputFieldProps = {
  label?: string
  description?: string
  error?: string
  state?: DateInputFieldState
  disabled?: boolean
  valueType?: DateInputFieldValueType
  day?: string
  month?: string
  year?: string
}

function DateInputField({
  label = "Label",
  description = "Description",
  error = "Error",
  state = "default",
  disabled = false,
  valueType = "placeholder",
  day = "DD",
  month = "MM",
  year = "YYYY",
}: DateInputFieldProps): React.JSX.Element {
  const isError = state === "error"
  const isPlaceholder = valueType === "placeholder"
  const textColor = disabled ? "text-[#B3B3B3]" : "text-[#1E1E1E]"
  const boxClassName = cn(
    "flex h-10 min-w-0 flex-1 items-center rounded-[16px] border px-4 py-3",
    disabled
      ? "border-[#B3B3B3] bg-[#D9D9D9]"
      : isError
        ? "border-[#690807] bg-white"
        : "border-[#D9D9D9] bg-white"
  )
  const inputClassName = cn(
    "w-full bg-transparent text-base leading-none outline-none placeholder:text-[#B3B3B3]",
    textColor
  )

  const inputValue = (token: string): string | undefined => (isPlaceholder ? undefined : token)
  const inputPlaceholder = (token: string): string | undefined => (isPlaceholder ? token : undefined)

  const inputReadOnly = disabled
  const inputDisabled = disabled

  return (
    <div className="flex min-w-[240px] flex-col items-start gap-2">
      <span className={cn("w-full text-base leading-[1.4] text-[#1E1E1E]", disabled && "text-[#B3B3B3]")}>{label}</span>
      <span className={cn("w-full text-base leading-[1.4] text-[#757575]", disabled && "text-[#B3B3B3]")}>{description}</span>

      <div className="flex w-full min-w-[240px] items-start gap-2">
        <div className={boxClassName}>
          <input
            type="text"
            defaultValue={inputValue(day)}
            placeholder={inputPlaceholder(day)}
            readOnly={inputReadOnly}
            disabled={inputDisabled}
            className={inputClassName}
          />
        </div>
        <div className={boxClassName}>
          <input
            type="text"
            defaultValue={inputValue(month)}
            placeholder={inputPlaceholder(month)}
            readOnly={inputReadOnly}
            disabled={inputDisabled}
            className={inputClassName}
          />
        </div>
        <div className={boxClassName}>
          <input
            type="text"
            defaultValue={inputValue(year)}
            placeholder={inputPlaceholder(year)}
            readOnly={inputReadOnly}
            disabled={inputDisabled}
            className={inputClassName}
          />
        </div>
      </div>

      {isError && !disabled && <span className="w-full text-base leading-[1.4] text-[#900B09]">{error}</span>}
    </div>
  )
}

export { DateInputField }
export type { DateInputFieldProps, DateInputFieldState, DateInputFieldValueType }
