"use client"

import { cn } from "@/lib/utils"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Hand, Move, Scaling } from "lucide-react"
import { useDesignToolStore } from "@/stores/dialog-store"

type ToolId = "move" | "drag" | "scale"

const toolItems = [
  { id: "move" as ToolId, label: "Move", shortcut: "V", Icon: Move },
  { id: "drag" as ToolId, label: "Drag", shortcut: "H", Icon: Hand },
  { id: "scale" as ToolId, label: "Scale", shortcut: "K", Icon: Scaling },
]

export type { ToolId }
export { toolItems }

interface ToolbarContextMenuProps {
  children: React.ReactNode
}

export function ToolbarContextMenu({ children }: ToolbarContextMenuProps) {
  const activeTool = useDesignToolStore((s) => s.activeTool)
  const setActiveTool = useDesignToolStore((s) => s.setActiveTool)

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent
        className="max-w-[320px] rounded-2xl border-[#D5D8DD] bg-white px-2 py-1 shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05),0px_1px_4px_0px_rgba(12,12,13,0.1)]"
      >
        {toolItems.map((item) => {
          const isActive = activeTool === item.id
          return (
            <ContextMenuItem
              key={item.id}
              className="flex min-w-[140px] max-w-[300px] items-center gap-2 rounded-[4px] px-2 py-2 text-base leading-[1.4] hover:bg-[#F5F5F5]"
              onSelect={() => setActiveTool(item.id)}
            >
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full",
                  isActive ? "bg-[#5036ef]" : "bg-[#111316] opacity-0"
                )}
              />
              <item.Icon
                className={cn(
                  "size-5 shrink-0",
                  isActive ? "text-[#5036ef]" : "text-[#111316]"
                )}
              />
              <span
                className={cn(
                  "flex-1 text-base leading-[1.4]",
                  isActive ? "text-[#5036ef]" : "text-[#111316]"
                )}
              >
                {item.label}
              </span>
              <span className="shrink-0 text-base leading-none text-[#959CA6]">
                {item.shortcut}
              </span>
            </ContextMenuItem>
          )
        })}
      </ContextMenuContent>
    </ContextMenu>
  )
}