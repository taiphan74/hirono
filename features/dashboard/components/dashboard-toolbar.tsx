"use client"

import { cn } from "@/lib/utils"
import { Search, LayoutGrid, List } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { useToolbarStore } from "@/stores/dialog-store"

interface DashboardToolbarProps {
  className?: string
}

export function DashboardToolbar({ className }: DashboardToolbarProps) {
  const fileFilter = useToolbarStore((s) => s.fileFilter)
  const setFileFilter = useToolbarStore((s) => s.setFileFilter)
  const sortBy = useToolbarStore((s) => s.sortBy)
  const setSortBy = useToolbarStore((s) => s.setSortBy)

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
        <Select value={fileFilter} onValueChange={setFileFilter}>
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

        {/* Select: Sort with groups */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="rounded-[8px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="date-created">Date created</SelectItem>
              <SelectItem value="last-viewed">Last viewed</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Order</SelectLabel>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* View toggle */}
        <ToggleGroup
          type="single"
          value={useToolbarStore((s) => s.viewMode)}
          onValueChange={(v) => v && useToolbarStore.getState().setViewMode(v as "grid" | "list")}
          spacing={0}
          className={cn(
            "flex items-center gap-2 p-2 rounded-[8px]",
            "bg-[var(--surface-neutral-secondary)]"
          )}
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            className="flex items-center justify-center size-8 p-2 gap-2 rounded-[8px] data-[state=on]:bg-white data-[state=on]:text-[#1E1E1E] data-[state=on]:shadow-sm text-[var(--color-gray-500)] hover:bg-white/60 border-0"
          >
            <LayoutGrid className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="flex items-center justify-center size-8 p-2 gap-2 rounded-[8px] data-[state=on]:bg-white data-[state=on]:text-[#1E1E1E] data-[state=on]:shadow-sm text-[var(--color-gray-500)] hover:bg-white/60 border-0"
          >
            <List className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}