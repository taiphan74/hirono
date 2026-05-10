"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MousePointer2, Hand, Scaling, Check } from "lucide-react"
import { useDesignToolStore } from "@/stores/dialog-store"

type ToolId = "move" | "drag" | "scale"

const toolItems = [
  { id: "move" as ToolId, label: "Move", shortcut: "V", Icon: MousePointer2 },
  { id: "drag" as ToolId, label: "Hand", shortcut: "H", Icon: Hand },
  { id: "scale" as ToolId, label: "Scale", shortcut: "K", Icon: Scaling },
]

export type { ToolId }
export { toolItems }

interface ToolbarContextMenuProps {
  children: React.ReactNode
}

export function ToolbarContextMenu({ children }: ToolbarContextMenuProps) {
  const [open, setOpen] = useState(false)
  const activeTool = useDesignToolStore((s) => s.activeTool)
  const setActiveTool = useDesignToolStore((s) => s.setActiveTool)

  const currentItem = toolItems.find((item) => item.id === activeTool) || toolItems[0]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          onContextMenu={(e) => {
            e.preventDefault()
            setOpen(true)
          }}
        >
          {children}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-40 rounded-2xl border-[#D5D8DD] bg-white p-1 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]"
      >
        {toolItems.map((item) => {
          const isActive = activeTool === item.id
          return (
            <DropdownMenuItem
              key={item.id}
              onClick={() => setActiveTool(item.id)}
              className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <item.Icon
                  className={cn(
                    "size-4",
                    isActive ? "text-[#5036ef]" : "text-[#111316]"
                  )}
                />
                <span className={cn("text-sm", isActive ? "text-[#5036ef] font-medium" : "text-[#111316]")}>
                  {item.label}
                </span>
              </div>
              {isActive && <Check className="size-4 text-[#5036ef]" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}