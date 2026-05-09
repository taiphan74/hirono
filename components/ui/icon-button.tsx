import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "medium" | "small" | "xs"
  variant?: "primary" | "secondary" | "ghost"
}

const sizeClasses = {
  medium: "w-9 h-9 p-2 gap-2", // 36px, padding 8px
  small: "w-8 h-8 p-2 gap-2",  // 32px, padding 8px
  xs: "w-[22px] h-[22px] p-2 gap-2", // 22px, padding 8px
}

const variantClasses = {
  primary:
    "bg-[#5036EF] border-[#5036EF] text-white hover:bg-[#3E2BCC] hover:border-[#3E2BCC] active:bg-[#2E1FA8] active:border-[#2E1FA8]",
  secondary:
    "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 active:bg-gray-300",
  ghost:
    "bg-transparent border-transparent hover:bg-gray-100 active:bg-gray-200",
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "medium", variant = "primary", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          sizeClasses[size],
          variantClasses[variant],
          // Icon size adjustments (medium: 16px, small: 12px, xs: 8px)
          size === "medium" && "[&_svg]:size-4",
          size === "small" && "[&_svg]:size-3",
          size === "xs" && "[&_svg]:size-2",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

IconButton.displayName = "IconButton"

export { IconButton }
