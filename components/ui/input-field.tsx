import * as React from "react"

import { Input, type InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type FieldState = "default" | "error"
type ValueType = "default" | "placeholder"

type InputFieldProps = {
  label?: string
  description?: string
  error?: string
  state?: FieldState
  disabled?: boolean
  valueType?: ValueType
  inputProps?: Omit<InputProps, "state" | "disabled" | "defaultValue" | "placeholder">
}

function InputField({
  label = "Label",
  description = "Description",
  error = "Error",
  state = "default",
  disabled = false,
  valueType = "placeholder",
  inputProps,
}: InputFieldProps): React.JSX.Element {
  const valueProps =
    valueType === "default"
      ? { defaultValue: "Value" }
      : { placeholder: "Value" }

  return (
    <div className="flex min-w-[120px] flex-col items-start gap-2">
      <span className={cn("w-[120px] text-base leading-[1.4] text-[#1E1E1E]", disabled && "text-[#B3B3B3]")}>
        {label}
      </span>

      <span className="w-[120px] text-base leading-[1.4] text-[#757575]">
        {description}
      </span>

      <Input
        state={state}
        disabled={disabled}
        {...valueProps}
        {...inputProps}
      />

      <span className={cn("w-[120px] text-base leading-[1.4] text-[#1E1E1E]", state === "error" && "text-[#690807]")}>
        {error}
      </span>
    </div>
  )
}

export { InputField }
export type { InputFieldProps, FieldState, ValueType }
