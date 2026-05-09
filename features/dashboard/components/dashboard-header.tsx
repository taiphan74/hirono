"use client"

import { cn } from "@/lib/utils"
import { PenTool, FileText, Presentation } from "lucide-react"
import Link from "next/link"

interface HeaderAction {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href: string
}

interface DashboardHeaderProps {
  actions?: HeaderAction[]
  className?: string
}

const defaultActions: HeaderAction[] = [
  { icon: PenTool, label: "Design", href: "/home/design" },
  { icon: FileText, label: "Note", href: "/home/note" },
  { icon: Presentation, label: "Slide", href: "/home/slide" },
]

export function DashboardHeader({
  actions = defaultActions,
  className,
}: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-end h-[64px] px-8 border-b border-[var(--color-gray-300)] bg-white",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={cn(
              "flex items-center gap-1 h-[32px] px-2 py-1 rounded-[8px]",
              "border border-[var(--color-purple-500)] text-[var(--color-gray-1000)]",
              "hover:bg-[var(--surface-primary-secondary)] transition-colors"
            )}
          >
            <span className="shrink-0 flex items-center justify-center size-[18px]">
              <action.icon className="size-[18px]" />
            </span>
            <span className="text-[16px] leading-none font-normal">{action.label}</span>
          </Link>
        ))}
      </div>
    </header>
  )
}