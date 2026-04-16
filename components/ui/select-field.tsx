import * as React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type SelectFieldState = "default" | "error"
type SelectFieldValueType = "default" | "placeholder"

type SelectFieldOption = {
  label: string
  value: string
  strong?: boolean
}

type SelectFieldProps = {
  label?: string
  description?: string
  error?: string
  state?: SelectFieldState
  disabled?: boolean
  valueType?: SelectFieldValueType
  value?: string
  onValueChange?: (value: string) => void
  options?: SelectFieldOption[]
}

const defaultOptions: SelectFieldOption[] = [
  { label: "Hello World", value: "hello-world", strong: true },
  { label: "Option 2", value: "option-2" },
  { label: "Option 3", value: "option-3" },
  { label: "Option 4", value: "option-4" },
  { label: "Option 5", value: "option-5" },
]

function SelectField({
  label = "Label",
  description = "Description",
  error = "Error",
  state = "default",
  disabled = false,
  valueType = "placeholder",
  value,
  onValueChange,
  options = defaultOptions,
}: SelectFieldProps): React.JSX.Element {
  const defaultValue = value ?? (valueType === "default" ? options[0]?.value : undefined)

  return (
    <div className="flex min-w-[120px] flex-col items-start gap-2">
      <span className={cn("w-[120px] text-base leading-[1.4] text-[#1E1E1E]", disabled && "text-[#B3B3B3]")}>
        {label}
      </span>

      <span className={cn("w-[120px] text-base leading-[1.4] text-[#757575]", disabled && "text-[#B3B3B3]")}>
        {description}
      </span>

      <Select
        disabled={disabled}
        value={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger state={state}>
          <SelectValue placeholder="Value" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} className={option.strong ? "font-semibold" : "font-normal"}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {state === "error" && (
        <span className="w-[120px] text-base leading-[1.4] text-[#900B09]">
          {error}
        </span>
      )}
    </div>
  )
}

export { SelectField }
export type { SelectFieldProps, SelectFieldState, SelectFieldValueType }
