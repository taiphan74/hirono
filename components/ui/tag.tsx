import * as React from "react"
import { type VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TagScheme =
  | "primary"
  | "secondary"
  | "information"
  | "error"
  | "success"
  | "warning"
  | "neutral"
  | "disable"

type TagVariant = "primary" | "secondary"
type TagState = "default" | "hover"

type TagProps = Omit<React.ComponentProps<typeof Button>, "variant" | "children"> &
  VariantProps<typeof buttonVariants> & {
    scheme?: TagScheme
    tagVariant?: TagVariant
    state?: TagState
    children?: React.ReactNode
    icon?: React.ReactNode
  }

const tagClassMap: Record<TagVariant, Record<TagState, Record<TagScheme, string>>> = {
  primary: {
    default: {
      primary:
        "border-surface-primary-default bg-surface-primary-default text-white [&_svg]:text-white",
      secondary:
        "border-surface-secondary-default bg-surface-secondary-default text-white [&_svg]:text-white",
      information: "border-[#3F81EA] bg-[#3F81EA] text-white [&_svg]:text-white",
      error: "border-[#EC221F] bg-[#EC221F] text-[#F5F5F5] [&_svg]:text-[#F5F5F5]",
      success: "border-[#14AE5C] bg-[#14AE5C] text-white [&_svg]:text-white",
      warning: "border-[#E5A000] bg-[#E5A000] text-white [&_svg]:text-white",
      neutral: "border-[#D9D9D9] bg-[#F5F5F5] text-[#303030] [&_svg]:text-[#303030]",
      disable: "border-[#B3B3B3] bg-[#D9D9D9] text-[#B3B3B3] [&_svg]:text-[#B3B3B3]",
    },
    hover: {
      primary:
        "border-surface-primary-hover bg-surface-primary-hover text-white/95 [&_svg]:text-white/95",
      secondary:
        "border-surface-secondary-hover bg-surface-secondary-hover text-white/95 [&_svg]:text-white/95",
      information: "border-[#3271D7] bg-[#3271D7] text-white/95 [&_svg]:text-white/95",
      error: "border-[#C00F0C] bg-[#C00F0C] text-white/95 [&_svg]:text-white/95",
      success: "border-[#009951] bg-[#009951] text-white/95 [&_svg]:text-white/95",
      warning: "border-[#BF6A02] bg-[#BF6A02] text-white/95 [&_svg]:text-white/95",
      neutral: "border-[#757575] bg-[#E6E6E6] text-[#303030] [&_svg]:text-[#303030]",
      disable: "border-[#B3B3B3] bg-[#D9D9D9] text-[#B3B3B3] [&_svg]:text-[#B3B3B3]",
    },
  },
  secondary: {
    default: {
      primary:
        "border-transparent bg-[#E2DEFC] text-[#1C1549] [&_svg]:text-[#1C1549]",
      secondary:
        "border-transparent bg-[#E6E6E6] text-[#2C2C2C] [&_svg]:text-[#2C2C2C]",
      information: "border-transparent bg-[#E1EBFA] text-[#224A8A] [&_svg]:text-[#224A8A]",
      error: "border-transparent bg-[#FDD3D0] text-[#690807] [&_svg]:text-[#690807]",
      success: "border-transparent bg-[#CFF7D3] text-[#02542D] [&_svg]:text-[#02542D]",
      warning: "border-transparent bg-[#FFF1C2] text-[#682D03] [&_svg]:text-[#682D03]",
      neutral: "border-transparent bg-white text-[#303030] [&_svg]:text-[#303030]",
      disable: "border-[#B3B3B3] bg-[#D9D9D9] text-[#B3B3B3] [&_svg]:text-[#B3B3B3]",
    },
    hover: {
      primary: "border-[#C6BDF9] bg-[#C6BDF9] text-[#1C1549] [&_svg]:text-[#1C1549]",
      secondary: "border-[#757575] bg-[#D9D9D9] text-[#2C2C2C] [&_svg]:text-[#2C2C2C]",
      information: "border-[#C0D4F5] bg-[#C0D4F5] text-[#224A8A] [&_svg]:text-[#224A8A]",
      error: "border-[#FCB3AD] bg-[#FCB3AD] text-[#690807] [&_svg]:text-[#690807]",
      success: "border-[#AFF4C6] bg-[#AFF4C6] text-[#02542D] [&_svg]:text-[#02542D]",
      warning: "border-[#FFE8A3] bg-[#FFE8A3] text-[#682D03] [&_svg]:text-[#682D03]",
      neutral: "border-[#444444] bg-white text-[#303030] [&_svg]:text-[#303030]",
      disable: "border-[#B3B3B3] bg-[#D9D9D9] text-[#B3B3B3] [&_svg]:text-[#B3B3B3]",
    },
  },
}

function Tag({
  className,
  scheme = "primary",
  tagVariant = "primary",
  state = "default",
  size = "md",
  children = "Tag",
  icon,
  disabled,
  ...props
}: TagProps): React.JSX.Element {
  const resolvedScheme: TagScheme = disabled ? "disable" : scheme
  const variantClasses = tagClassMap[tagVariant][state][resolvedScheme]

  return (
    <Button
      variant="primary"
      size={size}
      disabled={disabled || resolvedScheme === "disable"}
      data-state={state === "hover" ? "hover" : undefined}
      className={cn("h-8 gap-2 rounded-2xl px-2 text-base leading-none", variantClasses, className)}
      {...props}
    >
      <span>{children}</span>
      {icon ? <span aria-hidden>{icon}</span> : null}
    </Button>
  )
}

export { Tag }
export type { TagProps, TagScheme, TagVariant, TagState }
