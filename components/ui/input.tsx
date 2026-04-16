import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 min-w-[120px] items-center rounded-[16px] border bg-white px-4 py-3 text-base leading-[1] text-[#1E1E1E] outline-none transition-colors placeholder:text-[#B3B3B3] focus-visible:border-[#B3B3B3] disabled:cursor-not-allowed disabled:border-[#B3B3B3] disabled:bg-[#D9D9D9] disabled:text-[#B3B3B3] disabled:placeholder:text-[#B3B3B3]",
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

type InputProps = Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", state, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        data-state={state}
        className={cn(inputVariants({ state, className }))}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
export type { InputProps }
