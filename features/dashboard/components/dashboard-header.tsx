"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { dashboardService } from "../services/dashboard.service"

interface DashboardHeaderProps {
  className?: string
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  const handleCreateWorkspace = async () => {
    try {
      const res = await dashboardService.createWorkspace({
        name: "New workspace",
      })
      if (res.status === "SUCCESS") {
        // dispatch event to refresh workspace list
        window.dispatchEvent(new CustomEvent("workspace-created"))
      }
    } catch (err) {
      console.error("Failed to create workspace", err)
    }
  }

  return (
    <header
      className={cn(
        "flex items-center justify-end h-[64px] px-8 border-b border-[var(--color-gray-300)] bg-white",
        className
      )}
    >
      <Button data-icon="inline-end" onClick={handleCreateWorkspace}>
        Create new workspace
        <Plus />
      </Button>
    </header>
  )
}
