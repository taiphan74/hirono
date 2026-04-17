"use client"

import * as React from "react"

import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type SwitchFieldState = "default" | "disabled"
type SwitchFieldValueType = "checked" | "unchecked"

type SwitchFieldProps = {
  label?: string
  description?: string
  state?: SwitchFieldState
  valueType?: SwitchFieldValueType
}

function SwitchField({
  label = "Label",
  description = "Description",
  state = "default",
  valueType = "unchecked",
}: SwitchFieldProps): React.JSX.Element {
  const disabled = state === "disabled"
  const [checked, setChecked] = React.useState(valueType === "checked")

  React.useEffect(() => {
    setChecked(valueType === "checked")
  }, [valueType])

  return (
    <div className="flex min-w-[120px] flex-col items-start">
      <div className="flex h-6 w-[120px] items-center gap-3">
        <span className={cn("flex-1 text-base leading-[1.4] text-[#1E1E1E]", disabled && "text-[#B3B3B3]")}>
          {label}
        </span>
        <Switch
          state={state}
          valueType={checked ? "checked" : "unchecked"}
          checked={checked}
          onCheckedChange={setChecked}
        />
      </div>
      <span className={cn("w-[120px] text-base leading-[1.4] text-[#757575]", disabled && "text-[#B3B3B3]")}>
        {description}
      </span>
    </div>
  )
}

export { SwitchField }
export type { SwitchFieldProps, SwitchFieldState, SwitchFieldValueType }
