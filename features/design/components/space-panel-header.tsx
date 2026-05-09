"use client"

import { cn } from "@/lib/utils"
import { Play } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"

export function SpacePanelHeader() {
  return (
    <aside
      className={cn(
        "fixed right-0 top-0 bottom-0 z-50 flex w-36 flex-col overflow-hidden",
        "border-l bg-background/95 text-foreground shadow-xl backdrop-blur"
      )}
    >
      <div className="flex h-12 items-center gap-2 border-b px-3">
        <Avatar size="sm" type="initial" />

        <button className="ml-auto flex size-8 items-center justify-center rounded-md hover:bg-muted">
          <Play className="size-6 text-[#171042]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Space</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-4 rounded bg-muted" />
            <span className="text-sm text-muted-foreground">0000</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
