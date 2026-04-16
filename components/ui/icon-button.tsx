import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type IconButtonProps = Omit<React.ComponentProps<"button">, "children" | "aria-label"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode
    "aria-label": string
    asChild?: boolean
  }

function IconButton({
  className,
  size = "md",
  children,
  ...props
}: IconButtonProps): React.JSX.Element {
  const squareClass = size === "sm" ? "size-9 p-0" : "size-10 p-0"

  return (
    <Button
      size={size}
      className={cn(squareClass, className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export { IconButton }
export type { IconButtonProps }
