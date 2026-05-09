"use client"

import { cn } from "@/lib/utils"
import { Search, LayoutGrid, List } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DashboardToolbarProps {
  className?: string
}

export function DashboardToolbar({ className }: DashboardToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3 px-8 bg-white",
        className
      )}
    >
      {/* Search */}
      <div
        className={cn(
          "flex items-center gap-2 w-[391px] h-[40px]",
          "px-4 py-3 rounded-[8px]",
          "border border-[var(--color-gray-300)] bg-white",
          "text-[var(--color-gray-500)]"
        )}
      >
        <Search className="shrink-0 size-4" />
        <span className="text-[16px] leading-none">Search file</span>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Select: All files */}
        <Select defaultValue="all">
          <SelectTrigger className="rounded-[8px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All files</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="note">Note</SelectItem>
            <SelectItem value="slide">Slide</SelectItem>
          </SelectContent>
        </Select>

        {/* Select: Last updated */}
        <Select defaultValue="updated">
          <SelectTrigger className="rounded-[8px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last updated</SelectItem>
            <SelectItem value="created">Date created</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>

        {/* View toggle */}
        <div
          className={cn(
            "flex items-center gap-1 p-1 rounded-[8px]",
            "bg-[var(--surface-neutral-secondary)]"
          )}
        >
          <button
            className={cn(
              "flex items-center justify-center size-8 rounded-[8px]",
              "bg-white text-[var(--color-gray-900)]",
              "shadow-sm"
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            className={cn(
              "flex items-center justify-center size-8 rounded-[8px]",
              "text-[var(--color-gray-500)]",
              "hover:bg-white/60 transition-colors"
            )}
            aria-label="List view"
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </div>
  )
}