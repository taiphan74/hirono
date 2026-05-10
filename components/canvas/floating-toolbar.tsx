"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface FloatingToolbarProps {
  children: ReactNode
  className?: string
}

export function FloatingToolbar({ children, className }: FloatingToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-white px-2 py-1.5 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

interface FloatingToolbarGroupProps {
  children: ReactNode
  className?: string
}

export function FloatingToolbarGroup({ children, className }: FloatingToolbarGroupProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {children}
    </div>
  )
}

interface FloatingToolbarButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  isActive?: boolean
}

export function FloatingToolbarButton({
  children,
  className,
  onClick,
  isActive,
}: FloatingToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex size-7 items-center justify-center rounded-md p-1 transition-colors hover:bg-[#F5F5F5]",
        isActive && "bg-[#5036ef] text-white hover:bg-[#5036ef]",
        className
      )}
    >
      {children}
    </button>
  )
}

export function FloatingToolbarDivider() {
  return <div className="mx-1 h-5 w-px bg-[#E5E7EB]" />
}