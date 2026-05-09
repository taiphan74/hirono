"use client"

import { cn } from "@/lib/utils"

interface SidebarNavItemProps {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  isActive?: boolean
  className?: string
}

export function SidebarNavItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  className,
}: SidebarNavItemProps) {
  const inner = (
    <>
      {Icon && (
        <span className="shrink-0 size-5 flex items-center justify-center">
          <Icon className="size-5" />
        </span>
      )}
      <span className="truncate leading-[1.4] text-[16px]">{label}</span>
    </>
  )

  return (
    <li>
      {href ? (
        <a
          href={href}
          data-active={isActive || undefined}
          className={cn(
            "flex items-center gap-1 h-[38px] rounded-[8px] px-2 py-2 w-full transition-colors",
            isActive
              ? "bg-[var(--surface-primary-secondary)] text-[var(--color-gray-1000)]"
              : "text-[var(--color-gray-1000)] hover:bg-[var(--surface-default-default-hover)]"
          , className)}
        >
          {inner}
        </a>
      ) : (
        <span
          data-active={isActive || undefined}
          className={cn(
            "flex items-center gap-1 h-[38px] rounded-[8px] px-2 py-2 w-full cursor-default",
            isActive
              ? "bg-[var(--surface-primary-secondary)] text-[var(--color-gray-1000)]"
              : "text-[var(--color-gray-1000)]"
          , className)}
        >
          {inner}
        </span>
      )}
    </li>
  )
}