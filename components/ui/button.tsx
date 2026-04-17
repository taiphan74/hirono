import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:border-[#B3B3B3] disabled:bg-surface-disable-default disabled:text-[#B3B3B3] disabled:cursor-not-allowed disabled:shadow-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "rounded-full border-surface-primary-default bg-surface-primary-default text-white data-[size=sm]:text-[#F5F5F5] [&_svg]:text-[#F5F5F5] hover:border-surface-primary-hover hover:bg-surface-primary-hover hover:text-white/95 active:border-surface-primary-press active:bg-surface-primary-press active:text-white/90 data-[state=hover]:border-surface-primary-hover data-[state=hover]:bg-surface-primary-hover data-[state=hover]:text-white/95 data-[state=active]:border-surface-primary-press data-[state=active]:bg-surface-primary-press data-[state=active]:text-white/90 data-[size=sm]:hover:border-[#C6BDF9] data-[size=sm]:data-[state=hover]:border-[#C6BDF9]",
        secondary:
          "rounded-full border-surface-secondary-default bg-surface-secondary-default text-white hover:border-surface-secondary-hover hover:bg-surface-secondary-hover active:border-surface-secondary-press active:bg-surface-secondary-press data-[state=hover]:border-surface-secondary-hover data-[state=hover]:bg-surface-secondary-hover data-[state=active]:border-surface-secondary-press data-[state=active]:bg-surface-secondary-press",
        secondaryNeutral:
          "rounded-full border-[#444444] bg-[#E6E6E6] text-[#2C2C2C] [&_svg]:text-[#1E1E1E] hover:border-[#383838] hover:bg-[#D9D9D9] active:border-[#2C2C2C] active:bg-[#B3B3B3] data-[state=hover]:border-[#383838] data-[state=hover]:bg-[#D9D9D9] data-[state=active]:border-[#2C2C2C] data-[state=active]:bg-[#B3B3B3] disabled:[&_svg]:text-[#B3B3B3] disabled:text-[#B3B3B3]",
        secondarySubtle:
          "rounded-full border-transparent bg-white text-[#2C2C2C] [&_svg]:text-[#1E1E1E] hover:border-[#444444] hover:bg-white active:border-[#2C2C2C] active:bg-[#E6E6E6] data-[state=hover]:border-[#444444] data-[state=hover]:bg-white data-[state=active]:border-[#2C2C2C] data-[state=active]:bg-[#E6E6E6] disabled:[&_svg]:text-[#B3B3B3] disabled:text-[#B3B3B3]",
        neutral:
          "rounded-full border-surface-primary-secondary-hover bg-surface-primary-secondary text-[#1C1549] [&_svg]:text-[#312672] hover:border-surface-primary-hover hover:bg-surface-primary-secondary-hover hover:text-[#1C1549] active:border-surface-primary-hover active:bg-surface-primary-secondary-press active:text-[#1C1549] data-[state=hover]:border-surface-primary-hover data-[state=hover]:bg-surface-primary-secondary-hover data-[state=hover]:text-[#1C1549] data-[state=active]:border-surface-primary-hover data-[state=active]:bg-surface-primary-secondary-press data-[state=active]:text-[#1C1549] disabled:[&_svg]:text-[#B3B3B3] disabled:text-[#B3B3B3]",
        subtle:
          "rounded-full border-transparent bg-transparent text-[#1C1549] [&_svg]:text-[#1E1E1E] hover:border-surface-default-tertiary hover:bg-white hover:text-[#1C1549] active:border-surface-primary-default active:bg-surface-primary-tertiary active:text-[#1C1549] data-[state=hover]:border-surface-default-tertiary data-[state=hover]:bg-white data-[state=hover]:text-[#1C1549] data-[state=active]:border-surface-primary-default data-[state=active]:bg-surface-primary-tertiary data-[state=active]:text-[#1C1549] disabled:[&_svg]:text-[#B3B3B3] disabled:text-[#B3B3B3]",
        error:
          "rounded-full border-[#690807] bg-surface-error-default text-[#F5F5F5] leading-[1] data-[size=sm]:leading-[1.4] hover:border-[#C00F0C] hover:bg-surface-error-hover hover:text-white/95 active:border-[#690807] active:bg-surface-error-press active:text-white/90 data-[state=hover]:border-[#C00F0C] data-[state=hover]:bg-surface-error-hover data-[state=hover]:text-white/95 data-[state=active]:border-[#690807] data-[state=active]:bg-surface-error-press data-[state=active]:text-white/90",
        errorSubtle:
          "rounded-full border-transparent bg-transparent text-[#690807] leading-[1] data-[size=sm]:leading-[1.4] hover:border-[#F4776A] hover:bg-transparent active:border-[#EC221F] active:bg-transparent data-[state=hover]:border-[#F4776A] data-[state=hover]:data-[size=sm]:border-[#690807] data-[state=hover]:bg-transparent data-[state=active]:border-[#EC221F] data-[state=active]:bg-transparent"
      },
      size: {
        sm: "h-9 gap-2 px-3 text-sm has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-4",
        md: "h-10 gap-2 px-4 text-base has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps): React.JSX.Element {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
