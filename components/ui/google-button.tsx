import * as React from "react"
import { cn } from "@/lib/utils"

const googleButtonSizeVariants = {
  xs: "h-8 gap-2 px-3 text-xs",
  sm: "h-9 gap-2 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-base",
  lg: "h-12 gap-2 px-6 text-base",
} as const

type GoogleButtonProps = React.ComponentProps<"button"> & {
  size?: keyof typeof googleButtonSizeVariants
}

const GoogleButton = React.forwardRef<HTMLButtonElement, GoogleButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => (
    <button
      ref={ref}
      data-slot="google-button"
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#5036EF] bg-white text-[#100B30] transition-all hover:bg-[#F5F3FF] active:bg-[#EBE6FF]",
        googleButtonSizeVariants[size],
        className
      )}
      {...props}
    >
      <img src="/gg-logo.svg" alt="" aria-hidden className="size-4 shrink-0" />
      {children ?? "Log in with Google"}
    </button>
  )
)

GoogleButton.displayName = "GoogleButton"

export { GoogleButton, googleButtonSizeVariants }