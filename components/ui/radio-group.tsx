"use client"

import * as React from "react"
import { Circle } from "lucide-react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>): React.JSX.Element {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  fieldState?: "default" | "disabled"
}

function RadioGroupItem({ className, fieldState = "default", ...props }: RadioGroupItemProps): React.JSX.Element {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      data-field-state={fieldState}
      className={cn(
        "group/radio relative size-4 cursor-pointer rounded-full border border-[#1E1E1E] text-[#1E1E1E] outline-none",
        "disabled:cursor-not-allowed disabled:border-[#B3B3B3] disabled:text-[#B3B3B3]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
        <Circle className="size-[8px] fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
export type { RadioGroupItemProps }
