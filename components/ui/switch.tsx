"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const switchVariants = cva(
  "peer inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors outline-none disabled:cursor-not-allowed",
  {
    variants: {
      state: {
        default: "",
        disabled: "border-[#B3B3B3] bg-[#D9D9D9]",
      },
      valueType: {
        checked: "",
        unchecked: "",
      },
    },
    compoundVariants: [
      {
        state: "default",
        valueType: "checked",
        className: "border-[#705BEF] bg-[#705BEF]",
      },
      {
        state: "default",
        valueType: "unchecked",
        className: "border-white bg-white",
      },
      {
        state: "disabled",
        valueType: "checked",
        className: "border-[#B3B3B3] bg-[#D9D9D9]",
      },
      {
        state: "disabled",
        valueType: "unchecked",
        className: "border-[#B3B3B3] bg-[#D9D9D9]",
      },
    ],
    defaultVariants: {
      state: "default",
      valueType: "unchecked",
    },
  }
)

const switchThumbVariants = cva(
  "pointer-events-none block size-[18px] rounded-full transition-transform data-[state=checked]:translate-x-[17px] data-[state=unchecked]:translate-x-[1px]",
  {
    variants: {
      state: {
        default: "",
        disabled: "bg-[#B3B3B3]",
      },
      valueType: {
        checked: "",
        unchecked: "",
      },
    },
    compoundVariants: [
      {
        state: "default",
        valueType: "checked",
        className: "bg-white",
      },
      {
        state: "default",
        valueType: "unchecked",
        className: "bg-[#705BEF]",
      },
      {
        state: "disabled",
        valueType: "checked",
        className: "bg-[#B3B3B3]",
      },
      {
        state: "disabled",
        valueType: "unchecked",
        className: "bg-[#B3B3B3]",
      },
    ],
    defaultVariants: {
      state: "default",
      valueType: "unchecked",
    },
  }
)

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> &
  VariantProps<typeof switchVariants>

function Switch({
  className,
  state = "default",
  valueType = "unchecked",
  checked,
  defaultChecked,
  disabled,
  ...props
}: SwitchProps): React.JSX.Element {
  const resolvedChecked = checked ?? defaultChecked ?? valueType === "checked"
  const resolvedValueType = resolvedChecked ? "checked" : "unchecked"
  const isDisabled = disabled || state === "disabled"

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ state, valueType: resolvedValueType, className }))}
      checked={resolvedChecked}
      disabled={isDisabled}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ state, valueType: resolvedValueType }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchVariants, switchThumbVariants }
export type { SwitchProps }
