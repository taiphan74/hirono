"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Send,
  StickyNote,
  Square,
  Type,
  ScanText,
  MessageCircle,
  Grid2x2Plus,
  Hand,
  Scaling,
} from "lucide-react"
import { useCallback, useEffect } from "react"
import { ToolbarContextMenu } from "@/features/design/components/toolbar-context-menu"
import { ShapeContextMenu, shapeItems } from "@/features/design/components/shape-context-menu"
import { useDesignToolStore } from "@/stores/dialog-store"

type ToolId = "move" | "drag" | "scale" | "section" | "shape" | "text" | "scan" | "comment" | "grid"

const toolIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  move: Send,
  drag: Hand,
  scale: Scaling,
  section: StickyNote,
  shape: Square,
  text: Type,
  scan: ScanText,
  comment: MessageCircle,
  grid: Grid2x2Plus,
}

const tools: { id: ToolId; icon: React.ComponentType<{ className?: string }>; variant: "primary" | "secondarySubtle" }[] = [
  { id: "move", icon: Send, variant: "primary" },
  { id: "section", icon: StickyNote, variant: "secondarySubtle" },
  { id: "shape", icon: Square, variant: "secondarySubtle" },
  { id: "text", icon: Type, variant: "secondarySubtle" },
  { id: "scan", icon: ScanText, variant: "secondarySubtle" },
  { id: "comment", icon: MessageCircle, variant: "secondarySubtle" },
  { id: "grid", icon: Grid2x2Plus, variant: "secondarySubtle" },
]

export function Toolbar({ className }: { className?: string }) {
  const activeTool = useDesignToolStore((s) => s.activeTool)
  const activeShape = useDesignToolStore((s) => s.activeShape)
  const setActiveTool = useDesignToolStore((s) => s.setActiveTool)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
    const keyMap: Record<string, ToolId> = { v: "move", h: "drag", k: "scale" }
    const tool = keyMap[e.key.toLowerCase()]
    if (tool) {
      e.preventDefault()
      setActiveTool(tool)
    }
  }, [setActiveTool])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const firstTool = tools[0]
  const restTools = tools.slice(1)

  const isContextTool = activeTool === "move" || activeTool === "drag" || activeTool === "scale"
  const isFirstActive = isContextTool
  const FirstIcon = isContextTool ? toolIconMap[activeTool] : firstTool.icon

  return (
    <div
      className={cn(
        "flex items-center gap-[10px]",
        "rounded-2xl bg-white px-8 py-4 shadow-xl",
        className
      )}
    >
      <ToolbarContextMenu>
        <Button
          variant={isFirstActive ? "primary" : "secondarySubtle"}
          size="sm"
          className="size-9 p-0"
        >
          <FirstIcon className="size-5" />
        </Button>
      </ToolbarContextMenu>
      {restTools.map((tool) => {
        const isActive = activeTool === tool.id
        const button = (
          <Button
            key={tool.id}
            variant={isActive ? "primary" : "secondarySubtle"}
            size="sm"
            className="size-9 p-0"
            onClick={() => setActiveTool(tool.id)}
          >
            <tool.icon className="size-5" />
          </Button>
        )

        if (tool.id === "shape") {
          const ShapeIcon = shapeItems.find((s) => s.id === activeShape)?.Icon ?? Square
          return (
            <ShapeContextMenu key={tool.id}>
              <Button
                variant={isActive ? "primary" : "secondarySubtle"}
                size="sm"
                className="size-9 p-0"
                onClick={() => setActiveTool("shape")}
              >
                <ShapeIcon className="size-5" />
              </Button>
            </ShapeContextMenu>
          )
        }

        return button
      })}
    </div>
  )
}