import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, ChevronDown } from "lucide-react"
import { Select as SelectPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const selectTriggerVariants = cva(
  "group/select flex h-10 min-w-[120px] cursor-pointer items-center justify-between gap-2 rounded-[16px] border bg-white py-3 pl-4 pr-3 text-base leading-[1] text-[#1E1E1E] outline-none transition-colors disabled:cursor-not-allowed disabled:border-[#B3B3B3] disabled:bg-[#D9D9D9] disabled:text-[#B3B3B3] data-[placeholder]:text-[#B3B3B3]",
  {
    variants: {
      state: {
        default: "border-[#D9D9D9]",
        error: "border-[#690807]",
      },
    },
    defaultVariants: {
      state: "default",
    },
  }
)

type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>): React.JSX.Element {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectValue({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Value>): React.JSX.Element {
  return <SelectPrimitive.Value data-slot="select-value" className={cn("line-clamp-1", className)} {...props} />
}

function SelectTrigger({ className, children, state, ...props }: SelectTriggerProps): React.JSX.Element {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-state={state}
      className={cn(selectTriggerVariants({ state, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="size-4 text-[#1E1E1E] group-disabled/select:text-[#B3B3B3]" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, position = "popper", ...props }: React.ComponentProps<typeof SelectPrimitive.Content>): React.JSX.Element {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "z-50 min-w-[105px] overflow-hidden rounded-[16px] border border-[#D9D9D9] bg-white text-[#1E1E1E] shadow-sm",
          position === "popper" && "translate-y-1",
          className
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="flex flex-col gap-2 p-2">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>): React.JSX.Element {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-md py-0 text-base leading-[1.4] text-[#1E1E1E] outline-none focus:bg-black/5 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-0 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
export type { SelectTriggerProps }
