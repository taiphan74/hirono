"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  className?: string
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-end h-[64px] px-8 border-b border-[var(--color-gray-300)] bg-white",
        className
      )}
    >
      <Button data-icon="inline-end">
        Create new workspace
        <Plus />
      </Button>
    </header>
  )
}